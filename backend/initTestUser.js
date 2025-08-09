import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Role from './models/Admin/Role.js';
import Module from './models/Admin/Module.js';
import Employee from './models/Admin/Employee.js';
import User from './models/Admin/User.js';
import Enterprise from './models/Admin/Enterprise.js';

// Load environment variables
dotenv.config({ path: './.env' });

const addTestData = async () => {
  try {
    // Verify MONGO_URI
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in .env file');
    }

    // Connect to MongoDB
    await connectDB();

    // Clear existing data to avoid duplicates (optional, remove if not desired)
   // await Role.deleteMany({ isDeleted: false });
   // await Module.deleteMany({ isDeleted: false });
    await Employee.deleteMany({ isDeleted: false });
    await User.deleteMany({ isDeleted: false });
    console.log('Cleared existing Role, Module, Employee, and User data');

    // Verify an Enterprise exists (replace with your actual Enterprise _id)
    const enterpriseId = '689760017d2eaaf5d8612c1e'; // Replace with a valid Enterprise _id (e.g., from insertSampleData.js)
    const enterprise = await Enterprise.findById(enterpriseId);
    if (!enterprise) {
      throw new Error('Enterprise not found. Please provide a valid enterpriseId or run insertSampleData.js first.');
    }
 await Module.deleteMany({});
    await Role.deleteMany({});
    // Create Role
    const role = new Role({
      role: 'SuperAdmin',
      description: 'Super administrator with full access',
      isActive: true,
      isDeleted: false,
    });
    await role.save();
    console.log('Role created:', { _id: role._id, role: role.role });

    // Create Module
    const module = new Module({
      name: 'EHS',
      description: 'Environment, Health, and Safety module',
      isActive: true,
      isDeleted: false,
    });
    await module.save();
    console.log('Module created:', { _id: module._id, name: module.name });

    // Create Employee
    const employee = new Employee({
      employeeCode: 'TEST001',
      firstName: 'Test',
      lastName: 'User',
      email: 'testuser@example.com',
      enterprise: enterpriseId,
      isDeleted: false,
    });
    await employee.save();
    console.log('Employee created:', { _id: employee._id, employeeId: employee.employeeId });

    // Create User linked to Employee
    const hashedPassword = await bcrypt.hash('testpassword123', 10);
    const user = new User({
      employee: employee._id,
      username: 'testuser',
      password: hashedPassword,
      enterpriseRoles: [
        {
          enterprise: enterpriseId,
          roles: [role._id],
          modules: [module._id],
        },
      ],
      isDeleted: false,
    });
    await user.save();
    console.log('User created:', {
      _id: user._id,
      username: user.username,
      enterpriseRoles: user.enterpriseRoles.map(er => ({
        enterprise: er.enterprise,
        roles: er.roles,
        modules: er.modules,
      })),
    });

    console.log('Test data added successfully. Login with username: testuser, password: testpassword123');
  } catch (error) {
    console.error('Error adding test data:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
    process.exit();
  }
};

addTestData();