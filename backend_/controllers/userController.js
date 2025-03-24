const createHttpError = require("http-errors");
const User = require("../models/userModel");

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

    res.status(201).json({
      success: true,
      message: "User created successfully!",
      data: newUser
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  // Implement login logic with Sequelize
};

module.exports = { register, login };
