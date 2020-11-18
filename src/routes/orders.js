const {
  getAllOrders,
  getOrderByRef,
  updateOrderByRef,
  deleteOrderById,
  createOrder,
  deleteAllOrders,
} = require("../queries");

const orderRoutes = (router, event) => {
  // get orders
  router.get("/orders", getAllOrders);
  router.get("./orders:id", getOrderByRef);

  // // create order
  router.post("/orders", (req, res) => {
    createOrder(req, res).then((ref) => {
      event.emit("message", ref);
    });
  });

  // update orders
  router.put("/orders:id", updateOrderByRef);

  // // delete orders
  router.delete("/orders:id", deleteOrderById);

  // delete all orders
  router.delete("/orders", deleteAllOrders);
};

module.exports = orderRoutes;
