const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Order = sequelize.define('Order', {
    customerDetails: {
        type: DataTypes.JSON,
        allowNull: false,
        
    },
    orderStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    orderDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    bills: {
        type: DataTypes.JSON,
        allowNull: false
    },
    items: {
        type: DataTypes.JSON,
        allowNull: false
    }
}, {
    timestamps: true
});

module.exports = Order;
