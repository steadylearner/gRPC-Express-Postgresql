const client = require('./client');

client.getProduct({ id: "expensive" }, (error, product) => {
    if (!error) {
        console.log('Get product', product);
    }
    else {
        console.error(error);
    }
});