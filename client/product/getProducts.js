const client = require('./client')

client.getProducts({}, (error, products) => {
    if(!error){
        console.log('Get all products');
        console.log(products);
    }
    else{
        console.error(error);
    }
});

