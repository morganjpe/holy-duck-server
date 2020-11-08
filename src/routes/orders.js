const {
    getAllOrders,
    getOrderByRef,
    updateOrderByRef
} = require('../queries');

const orderRoutes = (app, io) => {

    // get orders
    app.get('/orders', getAllOrders)
    app.get('./orders:id', getOrderByRef)

    // // create order
    // app.post('/orders')
    
    // update orders
    app.put('/orders:id', updateOrderByRef)

    // // delete orders 
    // app.delete('/orders:id');

}

module.exports = orderRoutes;