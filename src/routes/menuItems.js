// database queries
const {
  queryAllProducts,
  queryProductById,
  createProduct,
  updateProductStock,
  deleteProductById,
} = require("../queries");

const { jwtAuthorisationMiddleware } = require("../middleware");

const menuItemRoutes = (router) => {
  // get - read
  router.get("/menu_items", queryAllProducts);
  router.get("/menu_items:id", queryProductById);

  // post - create
  router.post("/menu_items", jwtAuthorisationMiddleware, createProduct);

  // put - update
  router.put(
    "/update_stock:id",
    jwtAuthorisationMiddleware,
    updateProductStock
  );

  // delete
  router.delete(
    "/menu_items:id",
    jwtAuthorisationMiddleware,
    deleteProductById
  );
};

module.exports = menuItemRoutes;
