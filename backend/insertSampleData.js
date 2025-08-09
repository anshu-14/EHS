import mongoose from 'mongoose';
import connectDB from './config/db.js';
import Enterprise from './models/Admin/Enterprise.js';
import Facility from './models/Admin/Facility.js';
import EnterpriseStructure from './models/Admin/EnterpriseStructure.js';
import FacilityStructure from './models/Admin/FacilityStructure.js';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
const insertSampleData = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Clear existing Enterprise and Facility data
    await Enterprise.deleteMany({});
    await Facility.deleteMany({});
    console.log('Cleared existing Enterprise and Facility data');

    // Fetch EnterpriseStructure IDs
    const enterpriseStruct = await EnterpriseStructure.findOne({ name: 'Enterprise' });
    const divisionStruct = await EnterpriseStructure.findOne({ name: 'Division' });
    const unitStruct = await EnterpriseStructure.findOne({ name: 'Unit' });

    if (!enterpriseStruct || !divisionStruct || !unitStruct) {
      console.error('Required EnterpriseStructure entries not found. Run initStructures.js first.');
      process.exit(1);
    }

    // Insert Enterprises
    const enterprise = new Enterprise({
      type: enterpriseStruct._id,
      name: 'Daimler Truck',
      isActive: true,
    });
    await enterprise.save();

    const division = new Enterprise({
      type: divisionStruct._id,
      name: 'North America Division',
      parent: enterprise._id,
      isActive: true,
    });
    await division.save();

    const unit = new Enterprise({
      type: unitStruct._id,
      name: 'Manufacturing Unit',
      parent: division._id,
      isActive: true,
    });
    await unit.save();

    console.log('Inserted Enterprises:', { enterprise, division, unit });

    // Fetch FacilityStructure IDs
    const functionStruct = await FacilityStructure.findOne({ name: 'Function' });
    const departmentStruct = await FacilityStructure.findOne({ name: 'Department' });

    if (!functionStruct || !departmentStruct) {
      console.error('Required FacilityStructure entries not found. Run initStructures.js first.');
      process.exit(1);
    }

    // Insert Facilities
    const facility = new Facility({
      type: functionStruct._id,
      name: 'Production Function',
      enterprise: enterprise._id,
    });
    await facility.save();

    const department = new Facility({
      type: departmentStruct._id,
      name: 'Assembly Department',
      enterprise: enterprise._id,
      parent: facility._id,
    });
    await department.save();

    console.log('Inserted Facilities:', { facility, department });

    console.log('Sample data inserted successfully');
  } catch (error) {
    console.error('Error inserting sample data:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
    process.exit();
  }
};

insertSampleData();