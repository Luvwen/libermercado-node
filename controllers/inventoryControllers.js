const database = require('../database/database');

const inventoryControllers = {
    showInventory: (req, res) => {
        if (req.session.loggedUser !== undefined) {
            const { username } = req.session.loggedUser[0];
            database.query('SELECT * FROM inventory', (error, data) => {
                if (error) {
                    console.log(error);
                } else {
                    req.session.data = data;
                    return res.render('inventory', {
                        username: username,
                        data: data
                    });
                }
            });
        } else {
            res.redirect('/auth/login');
        }
    },
    addItemToInventory: (req, res) => {
        const { item_name, item_price, item_description } = req.body;
        const { id, username } = req.session.loggedUser[0];
        if (!parseInt(item_price) || item_price === '') {
            return res.render('inventory', {
                data: req.session.data,
                username: username
            });
        } else {
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
                        res.redirect('/inventory');
                    }
                }
            );
        }
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
        if (actualized_item_price === '' || !parseInt(actualized_item_price)) {
            res.redirect('/inventory');
        }
        const query = `UPDATE inventory SET item_name = "${actualized_item_name}", item_price = ${actualized_item_price}, item_description = "${actualized_item_description}" WHERE id = ${item_id}`;
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
