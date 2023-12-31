const database = require('../database/database');
const path = require('path');
const { isEmpty } = require('../utils/validation');

const inventoryControllers = {
    showInventory: (req, res) => {
        try {
            if (
                req.session.loggedUser !== undefined ||
                req.cookies.userLogin !== undefined
            ) {
                req.session.loggedUser = req.cookies.userLogin;
                const { username } = req.session.loggedUser;
                const { action } = req.params;
                const { email } = req.cookies.userLogin;
                database.query(
                    'SELECT i.id, i.id_user, i.item_name, i.item_price, i.item_description, i.item_image FROM inventory as i JOIN users ON i.id_user = users.id WHERE users.email = ?',
                    [email],
                    (error, data) => {
                        if (error) {
                            console.log(error);
                        } else {
                            req.session.data = data;
                            const usernameToUppercase =
                                username.charAt(0).toUpperCase() +
                                username.slice(1);
                            return res.render('inventory', {
                                username: usernameToUppercase,
                                data: data,
                                action: action,
                            });
                        }
                    }
                );
            } else {
                res.redirect('/auth/login');
            }
        } catch (error) {
            res.render('error', {
                errorNumber: 500,
                errorType: 'Error interno',
                errorDescription: 'Intente nuevamente dentro de unos minutos',
            });
        }
    },
    addItemToInventory: (req, res) => {
        try {
            const { item_name, item_price, item_description } = req.body;
            const { id } = req.session.loggedUser;

            let sampleFile;
            let uploadPath;
            sampleFile = req.files.item_image;
            uploadPath = uploadPath =
                path.join(__dirname, '..', '/public/images/') + sampleFile.name;
            sampleFile.mv(uploadPath, (error) => {
                if (error) {
                    console.log(error);
                }
                console.log(sampleFile.name);
            });
            database.query(
                'INSERT INTO inventory SET?',
                {
                    id_user: id,
                    item_name: item_name,
                    item_price: item_price,
                    item_description: item_description,
                    item_image: sampleFile.name,
                },
                (error, data) => {
                    if (error) {
                        console.log(error);
                    } else {
                        res.redirect('/inventory/addItem/add');
                    }
                }
            );
        } catch (error) {
            res.render('error', {
                errorNumber: 500,
                errorType: 'Error interno',
                errorDescription: 'Intente nuevamente dentro de unos minutos',
            });
        }
    },
    removeItemFromInventory: (req, res) => {
        try {
            const { email } = req.cookies.userLogin;
            database.query(
                'SELECT inventory.id_user FROM users JOIN inventory ON users.id = inventory.id_user WHERE users.email = ?',
                [email],
                (error, response) => {
                    if (error) {
                        console.log(error);
                    } else {
                        const { item_id } = req.body;
                        const id_user = response[0].id_user;
                        database.query(
                            'DELETE FROM inventory WHERE id = ? && id_user = ?',
                            [item_id, id_user],
                            (error, data) => {
                                if (error) {
                                    console.log(error);
                                } else {
                                    res.redirect(
                                        '/inventory/removeItem/delete'
                                    );
                                }
                            }
                        );
                    }
                }
            );
        } catch (error) {
            res.render('error', {
                errorNumber: 500,
                errorType: 'Error interno',
                errorDescription: 'Intente nuevamente dentro de unos minutos',
            });
        }
    },
    removeItemWithId: (req, res) => {
        try {
            const { itemId } = req.params;
            database.query(
                'DELETE FROM inventory WHERE id = ?',
                [itemId],
                (error, data) => {
                    if (error) {
                        console.log(error);
                    } else {
                        res.redirect('/inventory/allItems');
                    }
                }
            );
        } catch (error) {
            res.render('error', {
                errorNumber: 500,
                errorType: 'Error interno',
                errorDescription: 'Intente nuevamente dentro de unos minutos',
            });
        }
    },
    updateItemFromInventory: (req, res) => {
        try {
            const {
                list_id,
                actualized_item_name,
                actualized_item_price,
                actualized_item_description,
                actualized_item_image,
            } = req.body;

            const query = `UPDATE inventory SET item_name = "${actualized_item_name}", item_price = ${actualized_item_price}, item_description = "${actualized_item_description}", item_image = "${actualized_item_image}" WHERE id = ${list_id}`;
            database.query(query, (error, data) => {
                if (error) {
                    console.log(error);
                } else {
                    res.redirect('/inventory/actualizeItem/update');
                }
            });
        } catch (error) {
            res.render('error', {
                errorNumber: 500,
                errorType: 'Error interno',
                errorDescription: 'Intente nuevamente dentro de unos minutos',
            });
        }
    },
    showAllItems: (req, res) => {
        try {
            const { email } = req.cookies.userLogin;
            database.query(
                'SELECT i.id, i.id_user, i.item_name, i.item_price, i.item_description, i.item_image FROM inventory AS i JOIN users ON i.id_user = users.id WHERE users.email = ?',
                [email],
                (error, data) => {
                    if (error) {
                        console.log(error);
                    } else {
                        res.render('inventoryList', { data: data });
                    }
                }
            );
        } catch (error) {
            res.render('error', {
                errorNumber: 500,
                errorType: 'Error interno',
                errorDescription: 'Intente nuevamente dentro de unos minutos',
            });
        }
    },
};

module.exports = inventoryControllers;
