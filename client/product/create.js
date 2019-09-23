const client = require("./client");

let newProduct = {
    "price_in_cents": 1000,
    "title": "a new product",
    "description": "expensive",
    "pct": 0.01,
};

client.create(newProduct,(error, product) => {
    if(!error){
        console.log('The product was created successfully', product);
    }
    else{
        console.error(error);
    }
})