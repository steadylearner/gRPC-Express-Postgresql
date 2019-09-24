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

const create = async ({ request }, callback) => {
    const sql = "INSERT INTO users(id, first_name, last_name, date_of_birth) VALUES($1, $2, $3, $4)";

    const { id, first_name, last_name, date_of_birth } = request;

    const query = {
        text: sql,
        values: [id, first_name, last_name, date_of_birth],
    };

    try {
        const { rowCount } = await db.query(query);

        if (rowCount === 1) {
            console.log(`Create ${rowCount} user with id(${id}).`);
            callback(null, {
                id,
                first_name,
                last_name,
                date_of_birth,
            });
        } else {
            callback({
                code: grpc.status.CANCELLED,
                details: "CANCELLED",
            })

            // This goes to catch part
            // callback({
            //     code: grpc.status.ALREADY_EXISTS,
            //     details: "ALREADY EXISTS",
            // })
        }
    } catch (e) {
        console.log(e);
        callback(e);
    }
};

module.exports = {
    getUser,
    create,
}
