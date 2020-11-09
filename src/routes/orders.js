const {
    getAllOrders,
    getOrderByRef,
    updateOrderByRef,
    deleteOrderById,
    createOrder
} = require('../queries');

const orderRoutes = (router, ws) => {

    // get orders
    router.get('/orders', getAllOrders)
    router.get('./orders:id', getOrderByRef)

    // // create order
    router.post('/orders',(req, res) => {
        createOrder(req, res)
    })
    
    // update orders
    router.put('/orders:id', updateOrderByRef)

    // // delete orders 
    router.delete('/orders:id', deleteOrderById);

}

module.exports = orderRoutes;