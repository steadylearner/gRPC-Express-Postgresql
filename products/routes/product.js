// https://github.com/prisma/graphql-request

const express = require('express')
const router = express.Router()

const { product_grpc, user_grpc } = require("../grpc_client"); // It doesn't work with relative path when test

const { isBirthday, isBlackFriday, dateTodayWithoutYear } = require("../lib")

const productsWithDiscount = (pct, products) => {
  const payload = products.map(product => {
    const { price_in_cents, discount, ...rest } = product;
    return {
      ...rest,
      price_in_cents,
      "discount": {
        pct, // show float value pct.toPrecision(1) or ptc.toFixed(2) if necessary
        "value_in_cents": price_in_cents * pct
      },
    }
  });

  return payload;
}

router.get("/", (req, res) => {

  product_grpc.getProducts({}, (error, response) => {
    if (!error) {
      console.log('[GET] products');
      let { products } = response;

      // use this instead if you want to test isBlackFriday
      // if (true) {
        // console.log("Today is the black friday. Give 10% discount anyway.");

      // or
      // if (isBlackFriday([10, 24])) {

      if (isBlackFriday(dateTodayWithoutYear())) {
        const pct = "0.1"; // discount
        products = productsWithDiscount(pct, products);
        return res.json({ payload: products });
      } else {
        const withTargetHeader = req.headers.hasOwnProperty("x-user-id");

        if (withTargetHeader) {
          const id = req.headers["x-user-id"];

          user_grpc.getUser({ id }, (error, response) => {

            if (!error) {
              const { date_of_birth } = response;
              const time = (new Date(date_of_birth)).getTime();

              if (isBirthday(time)) {
                const pct = "0.05"; // discount
                products = productsWithDiscount(pct, products);
                return res.json({ payload: products });
              } else {
                return res.json({ payload: products });
              }
            }
            else {

              console.error(error);
              console.log("Something wrong while requesting user data.");
              return res.json({ payload: products });
            }
          })
        } else {
          console.log("There is no X-USER-ID header in this request.");
          return res.json({ payload: products });
        }
      }
    }
    else {
      // 1. error.details: 'failed to connect to all addresses' // server fail
      // 2. error.datails: 'Not Found' // No record in database yet
      console.error(error);
      return res.json({ payload: products });
    }
  });

});

module.exports = router;
