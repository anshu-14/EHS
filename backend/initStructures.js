import mongoose from 'mongoose';
import connectDB from './config/db.js';
import EnterpriseStructure from './models/Admin/EnterpriseStructure.js';
import FacilityStructure from './models/Admin/FacilityStructure.js';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
const initStructures = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Clear existing structure data
    await EnterpriseStructure.deleteMany({});
    await FacilityStructure.deleteMany({});
    console.log('Cleared existing EnterpriseStructure and FacilityStructure data');

    // Insert EnterpriseStructure data
    const enterpriseStructures = [
      { name: 'Enterprise'},
      { name: 'Division' },
      { name: 'Unit' }
    ];

    const insertedEnterpriseStructures = await EnterpriseStructure.insertMany(enterpriseStructures);
    console.log('Inserted EnterpriseStructures:', insertedEnterpriseStructures.map(s => ({
      _id: s._id,
      name: s.name,
      allowedParents: s.allowedParents,
    })));

    // Insert FacilityStructure data
    const facilityStructures = [
      { name: 'Function' },
      { name: 'Department' },
      { name: 'Section' },
      { name: 'Zone' },
    ];

    const insertedFacilityStructures = await FacilityStructure.insertMany(facilityStructures);
    console.log('Inserted FacilityStructures:', insertedFacilityStructures.map(s => ({
      _id: s._id,
      name: s.name,
      allowedParents: s.allowedParents,
    })));

    console.log('Structures initialized successfully');
  } catch (error) {
    console.error('Error initializing structures:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
    process.exit();
  }
};

initStructures();