const express = require('express');
const router = express.Router();
const { addOrder,getOrderById,getOrders,updateOrder } = require("../controllers/orderController");
const {isAuthenticated} = require('../middlewares/auth');

router.route('/').post(isAuthenticated, addOrder)// POST a new order
router.route('/:id').get(isAuthenticated, getOrderById)// GET a single order by ID
router.route('/').get(isAuthenticated, getOrders)// GET all orders
router.route('/:id').put(isAuthenticated, updateOrder)// PUT an order update by ID

module.exports = router;

