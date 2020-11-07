const {createDatabaseConnection} = require('./databaseConnection');

const client = createDatabaseConnection()

client.connect();

// const sendResponse = (error, response) => {
//     if(error) {
//         console.log(error);
//     } else {
//         res.send(response.rows)
//     }
// }

const queryAllProducts = (req, res) => client.query("SELECT * FROM menu_items", (error, response) => {
    if(error) {
        console.log(error);
    } else {
        res.send(response.rows)
    }
})

const queryProductById = (req, res) => {
    const id = req.params.id
    client.query("SELECT * FROM menu_items WHERE id = $1", [id], (error, response) => {
        if(error) {
            console.log(error);
        } else {
            res.send(response.rows[0])
        }
    })
}

const createProduct = (req, res) => {

    // const {
    //     name,
    //     price,
    //     desc,
    //     price,
    //     stock,
    //     group,
    //     img,
    //     allergens,
    // } = req.body;

    const keys = Object.keys(
        req.body
    ).map(key => req.body[key])

    client.query("INSERT INTO menu_items (name) VALUES ($1)", keys, (error, response) => {
        error ? console.log(error) : console.log(response);
        res.send({updated: true})
    })

    console.log(keys);
    res.send({connected: 'true'})

}

const updateProductStock = (req, res) => {

    const quantity = req.body.quantity;
    const id = req.params.id;

    client.query("UPDATE menu_items SET stock = $1 WHERE id = $2", [quantity, id], (error, response) => {
        error ? console.log(error) : console.log(response);
        res.send({stockUpdated: quantity});
    })
}

const deleteProductById = (req, res) => {
    const id = req.params.id;

    client.query("DELETE FROM menu_items WHERE id = $1", [id], (error, response) => {
        error ? console.log(error) : console.log(response);
        res.send({deleted: id});
    })

}

module.exports = {
    queryAllProducts,
    queryProductById,
    createProduct,
    updateProductStock,
    deleteProductById
}