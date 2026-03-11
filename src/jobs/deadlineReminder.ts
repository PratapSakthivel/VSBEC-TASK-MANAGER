import cron from 'node-cron';
import mongoose from 'mongoose';
import { sendDeadlineReminderEmail } from '../utils/emailService.js';

export const startDeadlineReminderJob = () => {
    // Run every hour at minute 0
    cron.schedule('0 * * * *', async () => {
        console.log('[CRON] Running deadline reminder check...');
        try {
            const now = new Date();
            const in48h = new Date(now.getTime() + 48 * 60 * 60 * 1000);

            // Access models through mongoose connection
            const Task = mongoose.model('Task');
            const TaskSubmission = mongoose.model('TaskSubmission');
            const User = mongoose.model('User');

            // Find tasks due within the next 48 hours that haven't been reminder-sent yet
            const upcomingTasks: any[] = await Task.find({
                deadline: { $gte: now, $lte: in48h },
                status: 'OPEN',
                reminderSent: { $ne: true },
            });

            if (upcomingTasks.length === 0) {
                console.log('[CRON] No tasks requiring reminder emails.');
                return;
            }

            console.log(`[CRON] Found ${upcomingTasks.length} task(s) near deadline.`);

            for (const task of upcomingTasks) {
                try {
                    // Get all students who are in the targeted classes/department but haven't submitted
                    let studentQuery: any = { role: 'STUDENT', is_active: { $ne: false } };

                    if (task.class_ids && task.class_ids.length > 0) {
                        studentQuery.class_id = { $in: task.class_ids };
                    } else if (task.department_id) {
                        studentQuery.department_id = task.department_id;
                    }

                    const students: any[] = await User.find(studentQuery);

                    // Filter to only students who haven't submitted or been verified yet
                    const submittedUserIds = await TaskSubmission.distinct('user_id', {
                        task_id: task._id,
                        status: { $in: ['SUBMITTED', 'VERIFIED'] },
                    });

                    const submittedSet = new Set(submittedUserIds.map((id: any) => id.toString()));

                    const pendingStudents = students.filter(
                        (s: any) => !submittedSet.has(s._id.toString()) && s.email
                    );

                    const hoursLeft = (task.deadline.getTime() - now.getTime()) / (1000 * 60 * 60);

                    // Send reminder to each pending student
                    for (const student of pendingStudents) {
                        await sendDeadlineReminderEmail(
                            student.email,
                            student.full_name || student.username,
                            task.title,
                            task.deadline.toISOString(),
                            hoursLeft
                        );
                    }

                    // Mark this task as reminder sent so we don't double-send
                    await Task.findByIdAndUpdate(task._id, { reminderSent: true });
                    console.log(`[CRON] ✅ Sent reminders for task "${task.title}" to ${pendingStudents.length} student(s).`);
                } catch (taskErr: any) {
                    console.error(`[CRON] ❌ Error processing task ${task._id}: ${taskErr.message}`);
                }
            }
        } catch (err: any) {
            console.error('[CRON] ❌ Deadline reminder job failed:', err.message);
        }
    });

    console.log('[CRON] ✅ Deadline reminder job scheduled (runs every hour).');
};
