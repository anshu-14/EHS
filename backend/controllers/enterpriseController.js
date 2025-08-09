import Enterprise from '../models/Enterprise.js';
import EnterpriseStructure from '../models/EnterpriseStructure.js';

export const getEnterprises = async (req, res) => {
  try {
    const { structure, parent } = req.query;
    const query = {};
    if (structure) query.structure = structure;
    if (parent) query.parent = parent;
    const enterprises = await Enterprise.find(query).populate('parent structure');
    res.json(enterprises);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createEnterprise = async (req, res) => {
  try {
    const { name, structure, parent } = req.body;

    const structureType = await EnterpriseStructure.findById(structure);
    if (!structureType) {
      return res.status(400).json({ message: 'Invalid enterprise structure' });
    }

    if (parent) {
      const parentEntity = await Enterprise.findById(parent).populate('structure');
      if (!parentEntity) {
        return res.status(400).json({ message: 'Invalid parent ID' });
      }
      if (structureType.name !== 'Enterprise' && !structureType.allowedParents.includes(parentEntity.structure.name)) {
        return res.status(400).json({ message: `A ${structureType.name} must have one of ${structureType.allowedParents.join(' or ')} as parent` });
      }
    } else if (structureType.name !== 'Enterprise') {
      return res.status(400).json({ message: 'Parent is required for non-Enterprise structures' });
    }

    const enterprise = new Enterprise({ name, structure, parent });
    await enterprise.save();
    res.status(201).json(enterprise);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEnterprise = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, parent } = req.body;
    const enterprise = await Enterprise.findById(id).populate('structure');
    if (!enterprise) {
      return res.status(404).json({ message: 'Enterprise not found' });
    }

    if (parent) {
      const parentEntity = await Enterprise.findById(parent).populate('structure');
      if (!parentEntity) {
        return res.status(400).json({ message: 'Invalid parent ID' });
      }
      const structureType = await EnterpriseStructure.findById(enterprise.structure._id);
      if (structureType.name !== 'Enterprise' && !structureType.allowedParents.includes(parentEntity.structure.name)) {
        return res.status(400).json({ message: `A ${structureType.name} must have one of ${structureType.allowedParents.join(' or ')} as parent` });
      }
    }

    enterprise.name = name || enterprise.name;
    enterprise.parent = parent || enterprise.parent;
    await enterprise.save();
    res.json(enterprise);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteEnterprise = async (req, res) => {
  try {
    const { id } = req.params;
    const enterprise = await Enterprise.findById(id);
    if (!enterprise) {
      return res.status(404).json({ message: 'Enterprise not found' });
    }
    const children = await Enterprise.find({ parent: id });
    if (children.length > 0) {
      return res.status(400).json({ message: 'Cannot delete entity with child entities' });
    }
    await enterprise.remove();
    res.json({ message: 'Enterprise deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const disableEnterprise = async (req, res) => {
  try {
    const { id } = req.params;
    const enterprise = await Enterprise.findById(id);
    if (!enterprise) {
      return res.status(404).json({ message: 'Enterprise not found' });
    }
    enterprise.isActive = !enterprise.isActive;
    await enterprise.save();
    res.json({ message: `Enterprise ${enterprise.isActive ? 'enabled' : 'disabled'}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
