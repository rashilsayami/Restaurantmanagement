const  Order  = require('../models/orderModel'); // Ensure Order model is imported
const createHttpError = require("http-errors");


const addOrder = async (req, res, next) => {
    try {
        const { customerDetails, orderStatus, orderDate, bills, items } = req.body;
        const order = await Order.create({ customerDetails, orderStatus, orderDate, bills, items });
        res.status(201).json({
            status: 'success',
            data: order
        });
    } catch (error) {
        next(error);
    }
};

const getOrderById = async (req, res, next) => {
    try {
        const order = await Order.findOne({ where: { id: req.params.id } });
        if (!order) {
            return next(createHttpError(404, "Order not found"));
        }
        res.status(200).json({
            status: 'success',
            data: order
        });
    } catch (error) {
        next(error);
    }
};


const getOrders = async (req, res, next) => {
    try {
        const orders = await Order.findAll();
        res.status(200).json({
            status: 'success',
            data: orders
        });
    } catch (error) {
        next(error);
    }
};

const updateOrder = async (req, res, next) => {
    try {
        const order = await Order.findOne({ where: { id: req.params.id } });
        if (!order) {
            return res.status(404).json({
                status: 'error',
                message: 'Order not found'
            });
        }
        await order.update(req.body);
        res.status(200).json({
            status: 'success',
            data: order
        });
    } catch (error) {
        next(error);
    }
};


module.exports = { addOrder, getOrderById, getOrders, updateOrder };
