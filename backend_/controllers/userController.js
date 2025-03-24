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

module.exports = { register, login, logout };
