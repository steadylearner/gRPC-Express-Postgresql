const client = require('./client')

client.getProducts({}, (error, response) => {
    if (!error) {
        console.log('Get all products');
        const { products } = response;
        console.log(products);
    }
    else {
        // 1. error.details: 'failed to connect to all addresses' // server fail
        // 2. error.datails: 'Not Found' // No record in database yet
        console.error(error);
    }
});

