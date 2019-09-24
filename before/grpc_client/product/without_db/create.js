const client = require("../client");

let newProduct = {
    "price_in_cents": 1000,
    "title": "a product",
    "description": "expensive",
    "discount": {
        "pct": 0.01,
        "value_in_cents": 10,
    }
};

client.create(newProduct,(error, product) => {
    if(!error){
        console.log('The product was created successfully', product);
    }
    else{
        console.error(error);
    }
})