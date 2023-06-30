const database = require('../database/database');
const path = require('path')

const inventoryControllers = {
    showInventory: (req, res) => {
        if (req.session.loggedUser !== undefined) {
            const { username } = req.session.loggedUser[0];
            const { action } = req.params
            const email  = req.cookies.userLogin
            database.query('SELECT i.id, i.id_user, i.item_name, i.item_price, i.item_description, i.item_image FROM inventory as i JOIN users ON i.id_user = users.id WHERE users.email = ?', [email], (error, data) => {
                if (error) {
                    console.log(error);
                } else {
                    req.session.data = data;
                    const usernameToUppercase = username.charAt(0).toUpperCase() + username.slice(1)
                    return res.render('inventory', {
                        username: usernameToUppercase,
                        data: data,
                        action: action
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
            let sampleFile;
            let uploadPath;
            sampleFile = req.files.item_image 
            uploadPath = uploadPath = path.join(__dirname, '..', '/public/images/') + sampleFile.name;
            sampleFile.mv(uploadPath, (err) => {
                if(err){
                    console.log(err)
                }
                console.log(sampleFile.name)
            })
            database.query(
                'INSERT INTO inventory SET?',
                {
                    id_user: id,
                    item_name: item_name,
                    item_price: item_price,
                    item_description: item_description,
                    item_image: sampleFile.name
                },
                (error, data) => {
                    if (error) {
                        console.log(error);
                    } else {
                        res.redirect('/inventory/addItem/add');
                    }
                }
            );
        }
    },
    removeItemFromInventory: (req, res) => {
        const email = req.cookies.userLogin
        database.query('SELECT inventory.id_user FROM users JOIN inventory ON users.id = inventory.id_user WHERE users.email = ?', [email], (error, response) => {
            if(error){
                console.log(error)
            } else {
                const { item_id } = req.body
                console.log(req.body)
                const id_user = response[0].id_user
                database.query(
                    'DELETE FROM inventory WHERE id = ? && id_user = ?',
                    [item_id, id_user],
                    (error, data) => {
                        if (error) {
                            console.log(error);
                        } else {
                            res.redirect('/inventory/removeItem/delete');
                        }
                    }
                );
            }
        })
        
    },
    removeItemWithId: (req, res) => {
        const { itemId } = req.params
        database.query('DELETE FROM inventory WHERE id = ?', [itemId], (error, data) => {
            if(error){
                console.log(error)
            } else {
                res.redirect('/inventory/allItems')
            }
        })
    },
    updateItemFromInventory: (req, res) => {
        const {
            list_id,
            actualized_item_name,
            actualized_item_price,
            actualized_item_description
        } = req.body;
        if (actualized_item_price === '' || !parseInt(actualized_item_price)) {
            res.redirect('/inventory');
        }
        const query = `UPDATE inventory SET item_name = "${actualized_item_name}", item_price = ${actualized_item_price}, item_description = "${actualized_item_description}" WHERE id = ${list_id}`;
        database.query(query, (error, data) => {
            if (error) {
                console.log(error);
            } else {
                res.redirect('/inventory/actualizeItem/update');
            }
        });
    },
    showAllItems: (req, res) => {
        const email  = req.cookies.userLogin
        database.query('SELECT i.id, i.id_user, i.item_name, i.item_price, i.item_description, i.item_image FROM inventory AS i JOIN users ON i.id_user = users.id WHERE users.email = ?', [email], (error, data) => {
            if (error) {
                console.log(error);
            } else {
                res.render('inventoryList', { data: data });
            }
        });
    }
};

module.exports = inventoryControllers;
