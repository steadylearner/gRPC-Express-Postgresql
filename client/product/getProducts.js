const client = require('./client')

client.getProducts({}, (error, response) => {
    if(!error){
        console.log('Get all products');
        const { products } = response;
        console.log(products);
    }
    else{
        console.error(error);
    }
});

