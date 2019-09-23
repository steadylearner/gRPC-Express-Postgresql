const client = require('../client');

client.getProduct({ id: "d544a8f0-d9f50be459c8" }, (error, product) => {
    if (!error) {
        console.log('Get product', product);
    }
    else {
        console.error(error);
    }
})