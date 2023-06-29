const express = require('express');
const router = express.Router();

const {
    showInventory,
    addItemToInventory,
    removeItemFromInventory,
    removeItemWithId,
    showAllItems,
    updateItemFromInventory
} = require('../controllers/inventoryControllers');

router.get('/', showInventory);

router.get('/allItems', showAllItems);

router.post('/addItem', addItemToInventory);

router.put('/actualizeItem', updateItemFromInventory);

router.delete('/removeItem', removeItemFromInventory);

router.get('/removeItem/:itemId', removeItemWithId)

module.exports = router;
