import Employee from '../models/Employee.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import exceljs from 'exceljs';

export const getEmployees = async (req, res) => {
  try {
    const { enterprise } = req.query;
    const query = { isDeleted: false }; 
    if (enterprise) query.enterprise = enterprise;
    const employees = await Employee.find(query).populate('enterprise facility');
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createEmployee = async (req, res) => {
  try {
    const { employeeId, firstName, lastName, email, enterprise, facility, isUser = false, username, password, enterpriseRoles = [] } = req.body;

    const employee = new Employee({ employeeId, firstName, lastName, email, enterprise, facility });
    await employee.save();

    if (isUser) {
      // If isUser is true, create a corresponding User
      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required to create a user' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        employee: employee._id,
        username,
        password: hashedPassword,
        enterpriseRoles,
      });
      await user.save();
      res.status(201).json({ employee, user: { id: user._id, username, enterpriseRoles } });
    } else {
      res.status(201).json(employee);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { employeeId, firstName, lastName, email, enterprise, facility } = req.body;
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    employee.employeeId = employeeId || employee.employeeId;
    employee.firstName = firstName || employee.firstName;
    employee.lastName = lastName || employee.lastName;
    employee.email = email || employee.email;
    employee.enterprise = enterprise || employee.enterprise;
    employee.facility = facility || employee.facility;
    await employee.save();
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
  const { id } = req.params;
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    employee.isDeleted = true;
    
    await employee.save();

    // Soft delete associated User if exists
    const user = await User.findOne({ employee: id });
    if (user) {
      user.isDeleted = true;
      
      await user.save();
    }

    res.json({ message: 'Employee soft deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const importEmployees = async (req, res) => {
  try {
    const workbook = new exceljs.Workbook();
    await workbook.xlsx.load(req.file.buffer);
    const worksheet = workbook.getWorksheet(1);
    const employees = [];

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) {
        employees.push({
          employeeId: row.getCell(1).value,
          firstName: row.getCell(2).value,
          lastName: row.getCell(3).value,
          email: row.getCell(4).value,
          enterprise: row.getCell(5).value,
          facility: row.getCell(6).value || null,
        });
      }
    });

    await Employee.insertMany(employees);
    res.status(200).json({ message: 'Employees imported successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const downloadSampleExcel = async (req, res) => {
  try {
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('Employees');

    // Add headers
    worksheet.addRow(['employeeId', 'firstName', 'lastName', 'email', 'enterprise', 'facility']);

    // Add sample row
    worksheet.addRow(['EMP001', 'John', 'Doe', 'john.doe@example.com', 'EnterpriseIDExample', 'FacilityIDExample']);

    // Set response headers for download
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=sample_employees.xlsx');

    // Write the workbook to the response
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};