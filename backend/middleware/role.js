import Role from '../models/Admin/Role.js';

const roleMiddleware = (allowedRoles) => async (req, res, next) => {
  try {
    const user = req.user; // Set by auth middleware
    const enterpriseId = req.body.enterprise || req.params.enterpriseId || req.query.enterprise;

    // Find user's roles for the specified enterprise
    const enterpriseRole = user.enterpriseRoles.find(er => er.enterprise.toString() === enterpriseId);
    if (!enterpriseRole) {
      return res.status(403).json({ message: 'User not authorized for this enterprise' });
    }

    // Fetch role documents to get role names
    const roleIds = enterpriseRole.roles.map(id => id.toString());
    const roles = await Role.find({ _id: { $in: roleIds } });
    const roleNames = roles.map(r => r.role);

    // Check if user has any of the allowed roles
    if (!allowedRoles.some(role => roleNames.includes(role))) {
      return res.status(403).json({ message: 'Access denied: insufficient role permissions' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error in role middleware' });
  }
};

export default roleMiddleware;