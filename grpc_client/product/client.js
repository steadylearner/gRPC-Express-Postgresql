const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = `../..${__dirname}/typeDefs/product.proto`;
// const PROTO_PATH = "../../typeDefs/product.proto";
const options = require(`../..${__dirname}/typeDefs/options`);
// const options = require("../../typeDefs/options");

const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    options
);
const productproto = grpc.loadPackageDefinition(packageDefinition);

const ProductService = productproto.ProductService;

const client = new ProductService('localhost:50050', grpc.credentials.createInsecure());

module.exports = client;