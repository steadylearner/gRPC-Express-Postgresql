const grpc = require('grpc');

const db = require('../db')
const User = require("../classes/User")

const getUser = async ({ request }, callback) => {
    const { id } = request;
    const sql = 'SELECT * FROM users WHERE id = $1';
    const query = {
        text: sql,
        values: [id],
    };

    try {
        const { rows } = await db.query(query);

        if (rows.length !== 0) {
            console.log("\n[GET] User\n")
            const payload = rows[0]
            const user = new User(id, payload); // This is already object {}
            console.log(user)

            callback(null, user); // callback(null, products) won't work and will always show {} in client
        }
        else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Not Found"
            })
        }
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    getUser,
}