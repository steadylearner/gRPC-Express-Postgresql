const grpc = require('grpc');

// Refer to product_graphq

let products = [
    {
        "id": "d544a8f0",
        "price_in_cents": 1000,
        "title": "a product",
        "description": "expensive",
        "discount": {
            "pct": 0.01,
            "value_in_cents": 10,
        }
    },
    {
        "id": "d544a8f0-d9f50be459c8",
        "price_in_cents": 800,
        "title": "another product",
        "description": "cheap",
        "discount": {
            "pct": 0.05,
            "value_in_cents": 40,
        }
    }
];

// https://stackoverflow.com/questions/51429679/working-with-a-message-having-repeated-field
// always have to return object

const getProducts = (_, callback) => {
    if (products) {
        callback(null, { products }); // callback(null, products) won't work and will always show {} in client
    }
    else {
        callback({
            code: grpc.status.NOT_FOUND,
            details: "Not Found"
        })
    }
};

const create = ({ request }, callback) => {
    let product = request;
    const id = require('crypto').randomBytes(10).toString('hex');
    product.id = id;
    products.push(product)

    callback(null, product) // null means there was no error
};

const getProduct = ({ request }, callback) => {
    let product = products.find((t) => t.id === request.id);
    if (product) {
        callback(null, product)
    }
    else {
        callback({
            code: grpc.status.NOT_FOUND,
            details: "Not Found"
        })

    }
};

const update = ({ request }, callback) => {
    let product = products.find((t) => t.id === request.id);
    if (product) {

        product.price_in_cents = request.price_in_cents;
        product.title = request.title;
        product.description = request.description;
        product.discount = request.discount;

        callback(null, product)
    }
    else {

        callback({
            code: grpc.status.NOT_FOUND,
            details: "Not Found"
        })

    }
};

const deleteProduct = ({ request }, callback) => {
    let productDelete = products.find((n) => n.id === request.id);
    if (productDelete != -1) {

        products.splice(productDelete, 1)
        callback(null, {})

    }
    else {
        callback({
            code: grpc.status.NOT_FOUND,
            details: "Not Found"
        })
    }
};

const deleteProducts = (_, callback) => {
    if (products) {
        products = [];
        callback(null, {})
    }
    else {
        callback({
            code: grpc.status.NOT_FOUND,
            details: "Not Found"
        })
    }
};

module.exports = {
    getProducts,
    getProduct,
    create,
    update,
    deleteProduct,
    deleteProducts,
}