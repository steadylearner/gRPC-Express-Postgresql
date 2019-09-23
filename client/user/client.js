const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = "../../typeDefs/user.proto";
const options = require("../../typeDefs/options");

const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    options
);
const productproto = grpc.loadPackageDefinition(packageDefinition);

const UserService = productproto.UserService;

const client = new UserService('localhost:50051', grpc.credentials.createInsecure());

module.exports = client;