const client = require('../client');

let product = {
    "id": "d544a8f0-d9f50be459c8",
    "price_in_cents": 700,
    "title": "a product",
    "description": "cheaper than before",
    "discount": {
        "pct": 0.01,
        "value_in_cents": 7,
    }
};

client.update(product, (error, updated) => {
    if(!error){
        console.log('The product is updated successfully', updated)
    }
    else{
        console.error(error)
    }
})