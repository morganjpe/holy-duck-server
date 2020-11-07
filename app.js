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
    updateProductStock
} = require('./src/queries')

// middleware
app.use(cors({
    origin: 'http://localhost:3000'
}))

app.use(bodyparser.json());

// routing 

app.get('/', (req, res) => res.send({holyduck: 'QUAAAAACCKK'}));
app.get('/menu_items', queryAllProducts)
app.get('/menu_items:id', queryProductById)

app.post('/menu_items', createProduct)

app.put('/update_stock:id', updateProductStock)


// serve application 
app.listen(PORT, () => {
    console.log(`listening on port http://localhost:${PORT}`)
})
