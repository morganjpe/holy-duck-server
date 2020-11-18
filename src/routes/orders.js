const {
  getAllOrders,
  getOrderByRef,
  updateOrderByRef,
  deleteOrderById,
  createOrder,
  deleteAllOrders,
} = require("../queries");

const { jwtAuthorisationMiddleware } = require("../middleware");

const orderRoutes = (router, event) => {
  // get orders
  router.get("/orders", jwtAuthorisationMiddleware, getAllOrders);
  router.get("./orders:id", jwtAuthorisationMiddleware, getOrderByRef);

  // create order
  router.post("/orders", jwtAuthorisationMiddleware, (req, res) => {
    createOrder(req, res).then((ref) => {
      event.emit("message", ref);
    });
  });

  // update orders
  router.put("/orders:id", jwtAuthorisationMiddleware, updateOrderByRef);

  // delete orders
  router.delete("/orders:id", jwtAuthorisationMiddleware, deleteOrderById);

  // delete all orders
  router.delete("/orders", jwtAuthorisationMiddleware, deleteAllOrders);
};

module.exports = orderRoutes;
