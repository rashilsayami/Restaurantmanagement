const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: {
        args: /^\d{10}$/,
        msg: "Phone number must be exactly 10 digits."
      }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    }
  },
password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: {
        args: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        msg: "Password must be strong."
      }
    }
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "user"
  }
}, {
  timestamps: true
});

module.exports = User;
