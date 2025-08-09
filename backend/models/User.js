import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  enterpriseRoles: [
    {
      enterprise: { type: mongoose.Schema.Types.ObjectId, ref: 'Enterprise', required: true },
      roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true }],
      modules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Module' }],
    },
  ],
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
});

export default mongoose.model('User', userSchema);