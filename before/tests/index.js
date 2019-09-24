// https://github.com/steadylearner/JavaScript-Full-Stack/blob/master/Express/src/test/index.js
// https://www.google.com/search?client=firefox-b-d&q=jest+with+supertest+example

// If files becomes larget, consider using jest instead

const test = require("tape");
const supertest = require("supertest");

const app = require("../server");
const request = supertest(app);

require('dotenv').config({ path: ".env" }) // It uses releative path and called at server/user.js and server/product.js

const { Client } = require("pg");

const GRPC = process.env.GRPC;
const db = new Client(GRPC);
db.connect();

const moment = require("moment");

const chalk = require("chalk");

test("GET /product with X-USER-ID header and is birthday", async done => {
    const sql = "INSERT INTO users(id, first_name, last_name, date_of_birth) VALUES($1, $2, $3, $4)";

    const random = require('crypto').randomBytes(10).toString('hex');
    const today = moment(new Date()).format("YYYY-MM-DD");

    const query = {
        text: sql,
        values: [random, random, random, today],
    };

    try {
        const { rowCount } = await db.query(query);
        console.log(`Create ${rowCount} user with id(${random})`);
    } catch (e) {
        console.log(e);
    }


    request
        .get('/product')
        .set("X-USER-ID", random)
        .expect(200)
        .then(response => {
            // console.log(response.body);
            const blue = chalk.blue
            const msg = blue("Should return 200 OK");

            try {
                console.log(response.body.payload);
            } catch (e) {
                console.log(e);
                done.fail(msg);
            }

            done.pass(msg);
            done.end();
        })
});

test("GET /product with X-USER-ID header and is not birthday", async done => {
    const sql = "INSERT INTO users(id, first_name, last_name, date_of_birth) VALUES($1, $2, $3, $4)";

    const random = require('crypto').randomBytes(10).toString('hex');
    const yesterday = moment(new Date()).add(-1, "days").format("YYYY-MM-DD");

    const query = {
        text: sql,
        values: [random, random, random, yesterday],
    };

    try {
        const { rowCount } = await db.query(query);
        console.log(`Create ${rowCount} user with id(${random})`);
    } catch (e) {
        console.log(e);
    }

    request
        .get('/product')
        .set("X-USER-ID", random)
        .expect(200)
        .then(response => {
            // console.log(response.body);
            const blue = chalk.blue
            const msg = blue("Should return 200 OK");

            try {
                // assert.equal(response.body.userId, "test");
                console.log(response.body.payload);
                // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Number/toPrecision
                // response.body.payload.map(x => {
                //     console.log(x.discount.pct.toPrecision(1));
                // })
            } catch (e) {
                console.log(e);
                done.fail(msg);
            }

            done.pass(msg);
            done.end();
        })
});

test("GET /product without X-USER-ID", done => {
    request
        .get('/product')
        .expect(200)
        .then(response => {
            const blue = chalk.blue
            const msg = blue("Should return 200 OK");

            try {
                console.log(response.body.payload);
            } catch (e) {
                console.log(e);
                done.fail(msg);
            }

            done.pass(msg);
            done.end();
        })
});
