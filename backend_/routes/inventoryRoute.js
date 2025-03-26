const express = require('express');
const router = express.Router();
const { addInventory, getInventory, getInventorys, updateInventory } = require("../controllers/inventoryController");
const {isAuthenticated} = require('../middlewares/auth');

router.route('/').post(isAuthenticated, addInventory);
router.route('/').get(isAuthenticated, getInventory)
router.route('/:id').get(isAuthenticated, getInventorys)
router.route('/:id').put(isAuthenticated, updateInventory)

module.exports = router;