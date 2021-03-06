const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const PRODUCT_PATH = "./typeDefs/product.proto";
const options = require("./typeDefs/options");

const productDefinition = protoLoader.loadSync(
    PRODUCT_PATH,
    options
);

const productproto = grpc.loadPackageDefinition(productDefinition);

const ProductService = productproto.ProductService;

const product_grpc = new ProductService('localhost:50050', grpc.credentials.createInsecure());

module.exports = product_grpc;