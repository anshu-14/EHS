import mongoose from 'mongoose';

const facilitySchema = new mongoose.Schema({
  type: { type: mongoose.Schema.Types.ObjectId, ref: 'FacilityStructure', required: true },
  name: { type: String, required: true },
  enterprise: { type: mongoose.Schema.Types.ObjectId, ref: 'Enterprise', required: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Facility' }, 
  isActive: { type: Boolean, default: true }, 
  createdAt: { type: Date, default: Date.now },
});

// Ensure unique names within the same parent and type
facilitySchema.index({ name: 1, parent: 1, type: 1 }, { unique: true });

export default mongoose.model('Facility', facilitySchema);