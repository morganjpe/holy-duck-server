// database queries
const {
    queryAllProducts,
    queryProductById,
    createProduct,
    updateProductStock,
    deleteProductById
} = require('../queries');

const menuItemRoutes = (app, io) => {
    // get - read
    app.get('/', (req, res) => res.send({holyduck: 'QUAAAAACCKK'}));
    app.get('/menu_items', queryAllProducts)
    app.get('/menu_items:id', queryProductById)

    // post - create
    app.post('/menu_items', createProduct)

    // put - update
    app.put('/update_stock:id', updateProductStock)

    // delete 
    app.delete('/menu_items:id', deleteProductById)
}

module.exports = menuItemRoutes;