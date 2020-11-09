const menuItemRoutes = require('./menuItems');
const orderRoutes = require('./orders');

const WebSocket = require('ws');

const attachRoutes = (router) => {


    menuItemRoutes(router);
    orderRoutes(router)
}

module.exports = {
    attachRoutes
}   