import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../../models/Admin/User.js';
import { validationResult } from 'express-validator';

 const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    const user = await User.findOne({ username }).populate('employee');
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role, enterprises: user.enterprises, modules: user.modules },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ token, user: { id: user._id, username, role: user.role, enterprises: user.enterprises, modules: user.modules } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default login;