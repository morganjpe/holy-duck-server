// libs
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');

const {attachRoutes} = require('./src/routes');

// create app
const app = express();
const PORT = 3001;
const router = express.Router();

// middleware
app.use(cors({
    origin: process.env.ORIGIN
}))

app.use(bodyparser.json());

app.use(router)



// routing 
attachRoutes(router);


// serve application 
app.listen(PORT, () => {
    console.log(`listening on port http://localhost:${PORT}`)
})




