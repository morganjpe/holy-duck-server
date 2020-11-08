const menuItemRoutes = require('./menuItems');
const orderRoutes = require('./orders');

const attachRoutes = (app, io) => {

    menuItemRoutes(app, io);
    orderRoutes(app, io)
}

module.exports = {
    attachRoutes
}   