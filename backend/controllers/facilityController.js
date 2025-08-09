import Facility from '../models/Facility.js';
import FacilityStructure from '../models/FacilityStructure.js';
import Enterprise from '../models/Enterprise.js';

export const getFacilities = async (req, res) => {
  try {
    const { structure, enterprise, parent } = req.query;
    const query = {};
    if (structure) query.structure = structure;
    if (enterprise) query.enterprise = enterprise;
    if (parent) query.parent = parent;
    const facilities = await Facility.find(query).populate('enterprise parent structure');
    res.json(facilities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createFacility = async (req, res) => {
  try {
    const { name, structure, enterprise, parent } = req.body;

    const enterpriseEntity = await Enterprise.findById(enterprise);
    if (!enterpriseEntity) {
      return res.status(400).json({ message: 'Invalid enterprise ID' });
    }

    const structureType = await FacilityStructure.findById(structure);
    if (!structureType) {
      return res.status(400).json({ message: 'Invalid facility structure' });
    }

    if (parent) {
      const parentEntity = await Facility.findById(parent).populate('structure');
      if (!parentEntity) {
        return res.status(400).json({ message: 'Invalid parent ID' });
      }
      if (structureType.name !== 'Function' && !structureType.allowedParents.includes(parentEntity.structure.name)) {
        return res.status(400).json({ message: `A ${structureType.name} must have one of ${structureType.allowedParents.join(' or ')} as parent` });
      }
    } else if (structureType.name !== 'Function') {
      return res.status(400).json({ message: 'Parent is required for non-Function structures' });
    }

    const facility = new Facility({ name, structure, enterprise, parent });
    await facility.save();
    res.status(201).json(facility);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateFacility = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, parent } = req.body;
    const facility = await Facility.findById(id).populate('structure');
    if (!facility) {
      return res.status(404).json({ message: 'Facility not found' });
    }

    if (parent) {
      const parentEntity = await Facility.findById(parent).populate('structure');
      if (!parentEntity) {
        return res.status(400).json({ message: 'Invalid parent ID' });
      }
      const structureType = await FacilityStructure.findById(facility.structure._id);
      if (structureType.name !== 'Function' && !structureType.allowedParents.includes(parentEntity.structure.name)) {
        return res.status(400).json({ message: `A ${structureType.name} must have one of ${structureType.allowedParents.join(' or ')} as parent` });
      }
    }

    facility.name = name || facility.name;
    facility.parent = parent || facility.parent;
    await facility.save();
    res.json(facility);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteFacility = async (req, res) => {
  try {
    const { id } = req.params;
    const facility = await Facility.findById(id);
    if (!facility) {
      return res.status(404).json({ message: 'Facility not found' });
    }
    const children = await Facility.find({ parent: id });
    if (children.length > 0) {
      return res.status(400).json({ message: 'Cannot delete facility with child entities' });
    }
    await facility.remove();
    res.json({ message: 'Facility deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};