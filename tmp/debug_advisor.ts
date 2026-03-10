import mongoose, { Schema } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const userSchema = new Schema({
    username: String,
    register_number: String,
    password: { type: String, select: true },
    role: String,
    is_coordinator: Boolean,
    must_change_password: Boolean
});
const User = mongoose.model('User', userSchema);

async function debug() {
    await mongoose.connect(process.env.MONGODB_URI || '');
    const target = 'it_3c_adv';
    console.log(`Searching for: [${target}]`);

    const users = await User.find({
        $or: [
            { username: target },
            { username: { $regex: target, $options: 'i' } },
            { username: target.replace(/_/g, ' ') },
            { username: target.replace(/_/g, '') }
        ]
    });

    if (users.length === 0) {
        console.log("No user found with that ID.");
        // Try finding all advisors to see naming convention
        const advisors = await User.find({ role: 'CLASS_ADVISOR' }).limit(5);
        console.log("Found other advisors:", advisors.map(a => a.username));
    } else {
        users.forEach(u => {
            console.log("--- User Found ---");
            console.log(`ID: ${u._id}`);
            console.log(`Username: [${u.username}] (Len: ${u.username?.length})`);
            console.log(`RegNo: [${u.register_number}]`);
            console.log(`Role: ${u.role}`);
            console.log(`Must Change Password: ${u.must_change_password}`);
            console.log(`Password Hash exists: ${!!u.password}`);
        });
    }
    process.exit(0);
}
debug();
