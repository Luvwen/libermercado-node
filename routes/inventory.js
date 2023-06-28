const express = require('express');
const router = express.Router();

const {
    showInventory,
    addItemToInventory,
    removeItemFromInventory,
    showAllItems,
    updateItemFromInventory
} = require('../controllers/inventoryControllers');

router.get('/', showInventory);

router.get('/allItems', showAllItems);

router.post('/addItem', addItemToInventory);

router.put('/actualizeItem', updateItemFromInventory);

router.delete('/removeItem', removeItemFromInventory);
module.exports = router;
