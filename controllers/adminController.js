const User = require('../models/User');

// Professors/Admins can create new student accounts
const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Prevent professors from creating other professors/admins
    if (role !== 'student') {
      return res.status(403).json({ message: 'You can only create student accounts' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, password, role });

    res.status(201).json({
      message: 'Student account created successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createUser };
