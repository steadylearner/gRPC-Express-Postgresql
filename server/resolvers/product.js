const grpc = require('grpc');
const db = require('../db');
const {
    GetProduct,
    // UpdateProduct
} = require("../classes/Product");

// https://stackoverflow.com/questions/51429679/working-with-a-message-having-repeated-field
// always have to return object

const getProducts = async (_, callback) => {
    const sql = 'SELECT * FROM products';
    const query = {
        text: sql,
    };

    try {
        const { rows } = await db.query(query);

        if (rows.length !== 0) {
            console.log("\n[GET] Products\n");
            console.log(rows);
            const products = rows.map(product => {
                const { id, ...rest } = product;
                return new GetProduct(id, rest);
            });
            console.log(products);
            callback(null, { products }); // callback(null, products) won't work and will always show {} in client
        }
        else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Not Found"
            })
        }
    } catch(e) {
        console.log(e);
    }
};

// const getProduct = async ({ request }, callback) => {
//     const { id } = request;

//     const sql = 'SELECT * FROM products WHERE id = $1';
//     const query = {
//         text: sql,
//         values: [id],
//     };

//     try {
//         const { rows } = await db.query(query);

//         if (rows.length !== 0) {
//             console.log("\n[GET] Product\n")
//             const product = rows[0]
//             console.log(product)
//             const payload = new GetProduct(id, product);

//             callback(null, payload ); // callback(null, products) won't work and will always show {} in client
//         }
//         else {
//             callback({
//                 code: grpc.status.NOT_FOUND,
//                 details: "Not Found"
//             })
//         }
//     } catch (e) {
//         console.log(e);
//     }
// };

module.exports = {
    getProducts,
    // getProduct,
}