const createHttpError = require("http-errors");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
  try {
    const { name, phone, email, password, role } = req.body;

    if (!name || !phone || !email || !password) {
      const error = createHttpError(400, "Please provide all the fields!");
      return next(error);
    }

    const isUserPresent = await User.findOne({ where: { email } });
    if (isUserPresent) {
      const error = createHttpError(400, "User already exists!");
      return next(error);
    }

    const newUser = await User.create({ name, phone, email, password, role });

    // Remove password from response
    const { password: _, ...userData } = newUser.toJSON();

    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      data: userData
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email?.trim() || !password?.trim()) {
      throw createHttpError(400, "Please provide email and password!");
    }

    // Find user and include only necessary fields
    const user = await User.findOne({ 
      where: { email },
      attributes: ['id', 'email', 'password', 'role', 'name'] 
    });

    // Use a generic error message for security
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw createHttpError(401, "Invalid email or password!");
    }

    // Set session with minimal required data
    req.session.user = {
      id: user.id,
      email: user.email,
      role: user.role
    };

    // Save session explicitly
    await req.session.save();

    // Remove sensitive data from response
    const { password: _, ...userData } = user.toJSON();

    // Add session ID to response for client reference
    res.status(200).json({
      success: true,
      message: "Login successful!",
      data: userData,
      sessionId: req.session.id
    });
  } catch (error) {
    next(error);
  }
};

// Add logout functionality
const logout = async (req, res, next) => {
  try {
    await req.session.destroy();
    res.clearCookie('connect.sid'); // Clear session cookie
    res.status(200).json({
      success: true,
      message: "Logged out successfully!"
    });
  } catch (error) {
    next(error);
  }
};

// Get current logged-in user data
const getCurrentUser = async (req, res, next) => {
  try {
    if (!req.session.user) {
      throw createHttpError(401, "Please login to access this resource");
    }

    const user = await User.findOne({
      where: { id: req.session.user.id },
      attributes: ['id', 'name', 'email', 'phone', 'role', 'createdAt', 'updatedAt']
    });

    if (!user) {
      throw createHttpError(404, "User not found");
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// Get user by ID (Admin only)
const getUserById = async (req, res, next) => {
  try {
    // Check if requester is admin
    if (req.session.user?.role !== 'admin') {
      throw createHttpError(403, "Access denied. Admin only resource");
    }

    const { userId } = req.params;

    const user = await User.findOne({
      where: { id: userId },
      attributes: ['id', 'name', 'email', 'phone', 'role', 'createdAt', 'updatedAt']
    });

    if (!user) {
      throw createHttpError(404, "User not found");
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// Get all users (Admin only)
const getAllUsers = async (req, res, next) => {
  try {
    // Check if requester is admin
    if (req.session.user?.role !== 'admin') {
      throw createHttpError(403, "Access denied. Admin only resource");
    }

    // Add pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const users = await User.findAndCountAll({
      attributes: ['id', 'name', 'email', 'phone', 'role', 'createdAt', 'updatedAt'],
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      data: {
        users: users.rows,
        pagination: {
          total: users.count,
          pages: Math.ceil(users.count / limit),
          currentPage: page,
          perPage: limit
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { 
  register, 
  login, 
  logout, 
  getCurrentUser, 
  getUserById, 
  getAllUsers 
};
