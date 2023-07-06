const express = require('express');
const router = express.Router();

const {
    showInventory,
    addItemToInventory,
    removeItemFromInventory,
    removeItemWithId,
    showAllItems,
    updateItemFromInventory,
} = require('../controllers/inventoryControllers');

router.get('/', showInventory);

router.get('/allItems', showAllItems);

router.get('/addItem/:action', showInventory);
router.post('/addItem', addItemToInventory);

router.get('/actualizeItem/:action', showInventory);
router.put('/actualizeItem', updateItemFromInventory);

router.get('/removeItem/:action', showInventory);
router.delete('/removeItem', removeItemFromInventory);

router.get('/deleteItem/:itemId', removeItemWithId);

module.exports = router;
