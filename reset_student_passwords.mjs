import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Error: MONGODB_URI is not defined in the environment variables.');
  process.exit(1);
}

// Minimal User Schema
const userSchema = new mongoose.Schema({
  username: String,
  password: { type: String, required: true },
  role: String,
  register_number: String,
  is_coordinator: Boolean,
  must_change_password: Boolean
});

// Avoid pre-save middleware issues by updating directly or hashing manually here
// Since we want to update many, and triggers might not fire correctly on bulk updates, we'll iterate and save.

const User = mongoose.model('User', userSchema);

async function resetPasswords() {
  try {
    const dns = await import('node:dns');
    dns.setServers(['8.8.8.8', '8.8.4.4']);

    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB.');

    // Find all STUDENTS and STUDENT COORDINATORS
    // A student coordinator is just a STUDENT with is_coordinator = true
    const targetUsers = await User.find({ role: 'STUDENT' });
    
    console.log(`Found ${targetUsers.length} students/coordinators to process.`);

    let updatedCount = 0;
    
    for (const user of targetUsers) {
      // Default password logic from system: register_number or username
      const plainPassword = user.register_number || user.username;
      
      if (!plainPassword) {
         console.warn(`User ID ${user._id} has no username or register number. Skipping.`);
         continue;
      }
      
      const hashedPassword = await bcrypt.hash(plainPassword, 10);
      
      // Update the user
      user.password = hashedPassword;
      user.must_change_password = true; // Force them to change it on next login
      await user.save();
      
      updatedCount++;
      
      if (updatedCount % 50 === 0) {
        console.log(`Processed ${updatedCount}/${targetUsers.length} users...`);
      }
    }

    console.log(`\nPassword reset completed successfully!`);
    console.log(`Total users updated: ${updatedCount}`);

  } catch (error) {
    console.error('An error occurred during password reset:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

resetPasswords();
