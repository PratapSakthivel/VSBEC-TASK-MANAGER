import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const { Schema } = mongoose;

// Define schemas
const classSchema = new Schema({
  name: { type: String, required: true },
  department_id: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
  year: { type: Number },
  batch: { type: String },
}, { timestamps: true });

const Class = mongoose.model('Class', classSchema);

async function fixClassYearData() {
  try {
    // Connect to database
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/vsbec-task-mgmt';
    await mongoose.connect(mongoUri);
    console.log('Connected to database');

    // Query classes with missing year field
    const classesWithoutYear = await Class.find({ 
      $or: [{ year: null }, { year: { $exists: false } }]
    });

    console.log(`Found ${classesWithoutYear.length} classes without year field`);

    if (classesWithoutYear.length === 0) {
      console.log('No classes need updating. All classes have year field populated.');
      await mongoose.disconnect();
      return;
    }

    // Update each class with extracted year value
    let updatedCount = 0;
    let failedCount = 0;

    for (const cls of classesWithoutYear) {
      // Extract year from class name using regex
      // Matches: "1", "2", "3", "4" or Roman numerals "I", "II", "III", "IV"
      const yearMatch = cls.name.match(/\b([1-4]|I{1,4})\b/);
      
      if (yearMatch) {
        let year: number;
        const matched = yearMatch[1];
        
        // Convert Roman numerals to numbers
        if (matched.match(/^I+$/)) {
          year = matched.length; // I=1, II=2, III=3, IV=4
        } else {
          year = parseInt(matched);
        }

        // Update the class
        await Class.findByIdAndUpdate(cls._id, { year });
        console.log(`✓ Updated "${cls.name}" (ID: ${cls._id}) with year ${year}`);
        updatedCount++;
      } else {
        console.warn(`✗ Could not extract year from class name: "${cls.name}" (ID: ${cls._id})`);
        failedCount++;
      }
    }

    console.log('\n=== Migration Summary ===');
    console.log(`Total classes without year: ${classesWithoutYear.length}`);
    console.log(`Successfully updated: ${updatedCount}`);
    console.log(`Failed to extract year: ${failedCount}`);

    // Verify all classes now have year field
    const remainingWithoutYear = await Class.find({ 
      $or: [{ year: null }, { year: { $exists: false } }]
    });

    console.log(`\nClasses still without year field: ${remainingWithoutYear.length}`);
    if (remainingWithoutYear.length > 0) {
      console.log('Classes that still need manual intervention:');
      remainingWithoutYear.forEach(cls => {
        console.log(`  - "${cls.name}" (ID: ${cls._id})`);
      });
    }

    await mongoose.disconnect();
    console.log('\nDatabase connection closed');
  } catch (error) {
    console.error('Error during migration:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

// Run the migration
fixClassYearData();
