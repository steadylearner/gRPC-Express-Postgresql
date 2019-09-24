const client = require('./client');

let product = {
    "id": "expensive",
    "price_in_cents": 700,
    "title": "a product",
    "description": "cheaper than before",
    "pct": 0.01,
};

client.update(product, (error, updated) => {
    if(!error){
        console.log('The product is updated successfully', updated)
    }
    else{
        console.error(error)
    }
})