const menuItemRoutes = require('./menuItems');
const orderRoutes = require('./orders');

const attachRoutes = (router, event) => {

    console.log(event, "***");;

    menuItemRoutes(router);
    orderRoutes(router, event)
}

module.exports = {
    attachRoutes
}   