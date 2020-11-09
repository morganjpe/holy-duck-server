// database queries
const {
    queryAllProducts,
    queryProductById,
    createProduct,
    updateProductStock,
    deleteProductById
} = require('../queries');

const menuItemRoutes = (router) => {

    // get - read
    router.get('/', (req, res) => res.send({holyduck: 'QUAAAAACCKK'}));
    router.get('/menu_items', queryAllProducts)
    router.get('/menu_items:id', queryProductById)

    // post - create
    router.post('/menu_items', createProduct)

    // put - update
    router.put('/update_stock:id', updateProductStock)

    // delete 
    router.delete('/menu_items:id', deleteProductById)
}

module.exports = menuItemRoutes;