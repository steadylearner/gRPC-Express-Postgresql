# How to structure folder

1. **products** folder should include **Express** server, grpc_product server and client, grpc_user client, **product.proto** and **user.proto** and tests for them.

2. **users** folder should include **grpc_user server** and **user.proto**.

## The purpose

1. Blackfriday, return the product list with 10% discount.

2. Birthday, return the product list with 5% discount.

3. When not 1. and 2, return the product list.

4. Without Connection for users gRPC server, return the product list

5. Separate gRPC server for products and users

6. Use /product end point.

## Install

```console
$bash ./install.sh
```

## Test 

1. `$cd users && yarn serve`

2. `$cd ../products && yarn serve` in another console

3. `$yarn test-tape` in the same folder

## End Point

It only use /product Express route with gRPC clients and Postgresql database.

## Schema

1. users

```
CREATE TABLE users(
  id VARCHAR(255) PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  date_of_birth Date NOT NULL
);
```

2. products

```
CREATE DOMAIN pct AS 
  REAL NOT NULL CHECK (value >= 0);

CREATE DOMAIN value_in_cents AS 
  INTEGER NOT NULL CHECK (value >= 0);

CREATE TYPE discount AS (
  pct pct,
  value_in_cents value_in_cents
);

CREATE TABLE products(
  id VARCHAR(255) PRIMARY KEY,
  price_in_cents INTEGER NOT NULL CHECK (price_in_cents > 0),
  title VARCHAR(255) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  discount discount
);
```

## CRUD operation

1. You can test them for users and products without datbase in before/without_db folders.

2. Then, you can modify them to be usable with database.

## Note

This is the mirror project of [Graphql-Express-Postgresql](https://github.com/steadylearner/Graphql-Express-Postgresql). That means you can learn Graphql and gRPC with these projects.
