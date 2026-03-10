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
    const target = '922523205128';
    console.log(`Searching for: [${target}]`);

    const users = await User.find({
        $or: [
            { username: target },
            { register_number: target },
            { username: { $regex: target, $options: 'i' } },
            { register_number: { $regex: target, $options: 'i' } }
        ]
    });

    if (users.length === 0) {
        console.log("No user found with that ID.");
    } else {
        users.forEach(u => {
            console.log("--- User Found ---");
            console.log(`ID: ${u._id}`);
            console.log(`Username: [${u.username}] (Len: ${u.username?.length})`);
            console.log(`RegNo: [${u.register_number}] (Len: ${u.register_number?.length})`);
            console.log(`Role: ${u.role}`);
            console.log(`Is Coordinator: ${u.is_coordinator}`);
            console.log(`Must Change Password: ${u.must_change_password}`);
            console.log(`Password Hash exists: ${!!u.password}`);
            if (u.password) console.log(`Hash starts with: ${u.password.substring(0, 10)}...`);
        });
    }
    process.exit(0);
}
debug();
