import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  employeeCode: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  enterprise: { type: mongoose.Schema.Types.ObjectId, ref: 'Enterprise', required: true },
  facility: { type: mongoose.Schema.Types.ObjectId, ref: 'Facility' }, 
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
});

export default mongoose.model('Employee', employeeSchema);