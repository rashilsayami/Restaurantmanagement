const Inventory = require('../models/inventoryModel');
const AppError = require('../utils/appError');

// Add new inventory item
//   POST /api/inventory
const addInventory = async (req, res, next) => {
  try {
    const { name, category, quantity, minStock, unit } = req.body;
    
    if (!name || !category || !quantity || !minStock || !unit) {
      return next(new AppError('Please provide all required fields', 400));
    }

    if (quantity <= 0 || minStock <= 0) {
      return next(new AppError('Quantity and Min Stock must be greater than 0', 400));
    }

    const existingItem = await Inventory.findOne({ where: { name } });
    if (existingItem) {
      return next(new AppError('Inventory item already exists', 400));
    }

    const newItem = await Inventory.create({
      name,
      category,
      quantity,
      minStock,
      unit
    });

    if (newItem.quantity <= newItem.minStock && newItem.quantity > 0) {
      newItem.status = 'low-stock';
    } else if (newItem.quantity === 0) {
      newItem.status = 'out-of-stock';
    } else {
      newItem.status = 'in-stock';
    }

    res.status(201).json({
      status: 'success',
      data: newItem
    });

  } catch (err) {
    next(err);
  }
};

//  Get all inventory items
//  GET /api/inventory
const getInventory = async (req, res, next) => {
  try {
    const items = await Inventory.findAll();
    
    res.status(200).json({
      status: 'success',
      results: items.length,
      data: items
    });

  } catch (err) {
    next(err);
  }
};

//Get single inventory item
// GET /api/inventory/:id
const getInventorys = async (req, res, next) => {
  try {
    const item = await Inventory.findByPk(req.params.id);
    
    if (!item) {
      return next(new AppError('No inventory item found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: item
    });

  } catch (err) {
    next(err);
  }
};

// Update inventory item
// PUT /api/inventory/:id
const updateInventory = async (req, res, next) => {
  try {
    const { name, category, quantity, minStock } = req.body;
    
    const item = await Inventory.findByPk(req.params.id);
    if (!item) {
      return next(new AppError('No inventory item found with that ID', 404));
    }

    // Update fields if they exist in request body
    if (name) item.name = name;
    if (category) item.category = category;
    if (quantity) item.quantity = quantity;
    if (minStock) item.minStock = minStock;

    await item.save();

    res.status(200).json({
      status: 'success',
      data: item
    });

  } catch (err) {
    next(err);
  }
};

module.exports = {
  addInventory,
  getInventory,
  getInventorys,
  updateInventory
};