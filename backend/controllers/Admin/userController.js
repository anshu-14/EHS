import bcrypt from 'bcryptjs';
import User from '../../models/Admin/User.js';
import Employee from '../../models/Admin/Employee.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate('employee enterpriseRoles.enterprise enterpriseRoles.roles enterpriseRoles.modules');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { employee, username, password, enterpriseRoles } = req.body;

    // Verify the employee exists
    const existingEmployee = await Employee.findById(employee);
    if (!existingEmployee) {
      return res.status(400).json({ message: 'Employee not found. Users must be linked to an existing employee' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      employee,
      username,
      password: hashedPassword,
      enterpriseRoles,
    });
    await user.save();
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { employee, username, password, enterpriseRoles } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify the new employee exists if updating
    if (employee) {
      const existingEmployee = await Employee.findById(employee);
      if (!existingEmployee) {
        return res.status(400).json({ message: 'Employee not found' });
      }
      user.employee = employee;
    }

    user.username = username || user.username;
    if (password) user.password = await bcrypt.hash(password, 10);
    user.enterpriseRoles = enterpriseRoles || user.enterpriseRoles;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.isDeleted = true;
      
      await user.save();
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};