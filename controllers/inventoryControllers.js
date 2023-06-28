const database = require('../database/database');

const inventoryControllers = {
    showInventory: (req, res) => {
        if (req.session.loggedUser !== undefined) {
            const { username } = req.session.loggedUser[0];
            return res.render('inventory', { username: username });
        }
        res.redirect('/auth/login');
    },
    addItemToInventory: (req, res) => {
        const { item_name, item_price, item_description } = req.body;
        const { id } = req.session.loggedUser[0];
        database.query(
            'INSERT INTO inventory SET?',
            {
                id_user: id,
                item_name: item_name,
                item_price: item_price,
                item_description: item_description
            },
            (error, data) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(data);
                    res.redirect('/inventory');
                }
            }
        );
    },
    removeItemFromInventory: (req, res) => {
        const { item_id } = req.body;
        database.query(
            'DELETE FROM inventory WHERE id = ?',
            [item_id],
            (error, data) => {
                if (error) {
                    console.log(error);
                } else {
                    res.redirect('/inventory');
                }
            }
        );
    },
    updateItemFromInventory: (req, res) => {
        const {
            item_id,
            actualized_item_name,
            actualized_item_price,
            actualized_item_description
        } = req.body;

        const query = `UPDATE inventory SET item_name = "${actualized_item_name}", item_price = ${actualized_item_price}, item_description = "${actualized_item_description}" WHERE id = ${item_id}`;
        console.log(query);
        database.query(query, (error, data) => {
            if (error) {
                console.log(error);
            } else {
                res.redirect('/inventory');
            }
        });
    },
    showAllItems: (req, res) => {
        database.query('SELECT * FROM inventory', (error, data) => {
            if (error) {
                console.log(error);
            } else {
                res.render('inventoryList', { data: data });
            }
        });
    }
};

module.exports = inventoryControllers;
