// libs
const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');

// create app
const app = express();
const PORT = 3001;

// database queries
const {
    queryAllProducts,
    queryProductById,
    createProduct,
    updateProductStock,
    deleteProductById
} = require('./src/queries')

// middleware
app.use(cors({
    origin: 'http://localhost:3000'
}))

app.use(bodyparser.json());

// routing 

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

// serve application 
app.listen(PORT, () => {
    console.log(`listening on port http://localhost:${PORT}`)
})
