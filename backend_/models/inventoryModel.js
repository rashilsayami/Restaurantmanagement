const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Inventory = sequelize.define('Inventory', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    quantity: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: 0
        }
    },
    unit: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'kg' // or 'L' etc.
    },
    minStock: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: 0
        }
    },
    // for tracking
    lastUpdated: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    status: {
        type: DataTypes.ENUM('in-stock', 'low-stock', 'out-of-stock'),
        defaultValue: 'in-stock'
    }
}, {
    timestamps: true,
    // Additional model options
});

module.exports = Inventory;