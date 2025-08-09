import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  role: { type: String, required: true, unique: true },
  isActive : { type: Boolean, default: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Role', roleSchema);