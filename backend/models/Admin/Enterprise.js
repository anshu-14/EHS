import mongoose from 'mongoose';

const enterpriseSchema = new mongoose.Schema({
  type: { type: mongoose.Schema.Types.ObjectId, ref: 'EnterpriseStructure', required: true },
  name: { type: String, required: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Enterprise' }, 
  isActive: { type: Boolean, default: true }, 
  createdAt: { type: Date, default: Date.now },
});

// Ensure unique names within the same parent and type
enterpriseSchema.index({ name: 1, parent: 1, type: 1 }, { unique: true });

export default mongoose.model('Enterprise', enterpriseSchema);