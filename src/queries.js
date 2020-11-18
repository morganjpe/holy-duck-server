const bcrypt = require("bcrypt");

const { createDatabaseConnection } = require("./databaseConnection");
const jwtGenerator = require("./utils/jwtGenerator");

const client = createDatabaseConnection();

client.connect();

/*
 * QUERYING MENU ITEMS
 */

const queryAllProducts = (req, res) =>
  client.query("SELECT * FROM menu_items", (error, response) => {
    if (error) {
      console.log(error);
    } else {
      res.send(response.rows);
    }
  });

const queryProductById = (req, res) => {
  const id = req.params.id;
  client.query(
    "SELECT * FROM menu_items WHERE id = $1",
    [id],
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        res.send(response.rows[0]);
      }
    }
  );
};

const createProduct = (req, res) => {
  const vals = Object.keys(req.body).map((key) => req.body[key]);

  client.query(
    'INSERT INTO menu_items (allergens, name, "desc", price, stock, img, "group") VALUES ($1, $2, $3, $4, $5, $6, $7)',
    vals,
    (error, response) => {
      error ? console.log(error) : console.log(response);
      res.send({ updated: true });
    }
  );
};

const updateProductStock = (req, res) => {
  const quantity = req.body.stock;
  const id = req.params.id;

  client.query(
    "UPDATE menu_items SET stock = $1 WHERE id = $2",
    [quantity, id],
    (error, response) => {
      error ? console.log(error) : console.log(response);
      res.send({ stockUpdated: quantity });
    }
  );
};

const deleteProductById = (req, res) => {
  const id = req.params.id;

  client.query(
    "DELETE FROM menu_items WHERE id = $1",
    [id],
    (error, response) => {
      error ? console.log(error) : console.log(response);
      res.send({ deleted: id });
    }
  );
};

/*
 * QUERYING ORDERS
 */
const getAllOrders = (req, res) => {
  client.query("SELECT * FROM orders", (error, response) => {
    if (error) {
      console.log(error);
    } else {
      res.send(response.rows);
    }
  });
};

const getOrderByRef = (req, res) => {
  const ref = req.params.id;

  client.query(
    "SELECT * FROM orders WHERE reference = $1",
    [ref],
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        res.send(response[row][0]);
      }
    }
  );
};

const updateOrderByRef = (req, res) => {
  const ref = req.params.id;
  const { status } = req.body;
  client.query(
    "UPDATE orders SET status = $1 WHERE reference = $2",
    [status, ref],
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        res.send({ updated: ref });
      }
    }
  );
};

const deleteOrderById = (req, res) => {
  const ref = req.params.id;
  client.query("DELETE FROM orders WHERE reference = $1", [ref], (error) => {
    if (error) {
      console.log(error);
    } else {
      res.send({ deleted: ref });
    }
  });
};

const deleteAllOrders = (req, res) => {
  client.query("DELETE * FROM orders", (error) => {
    error ? console.log(error) : res.send({ deleted: true });
  });
};

const createOrder = (req, res) => {
  return new Promise((resolve, reject) => {
    const { reference, order, address, status } = req.body;

    client.query(
      `INSERT INTO orders (reference, \"order\", address, status) VALUES ( $1, $2, $3, $4)`,
      [reference, order, address, status],
      (error) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          res.send({ ref: reference });
          resolve(reference);
        }
      }
    );
  });
};

const authenticateUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await client.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res
        .status(401)
        .send({ error: "the email or password is incorrect" });
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      console.log(validPassword, password);
      return res
        .status(401)
        .send({ error: "the email or password is incorrect" });
    }

    const token = jwtGenerator(user.rows[0].id);
    res.send({ token });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  // menu_items
  queryAllProducts,
  queryProductById,
  createProduct,
  updateProductStock,
  deleteProductById,
  // orders
  getAllOrders,
  getOrderByRef,
  updateOrderByRef,
  deleteOrderById,
  createOrder,
  deleteAllOrders,
  // authenticate
  authenticateUser,
};
