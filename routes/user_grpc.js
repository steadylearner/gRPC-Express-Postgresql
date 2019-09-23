const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const USER_PATH = "./typeDefs/user.proto";
const options = require("./typeDefs/options");

const userDefinition = protoLoader.loadSync(
    USER_PATH,
    options
);
const userproto = grpc.loadPackageDefinition(userDefinition);

const UserService = userproto.UserService;

const user_grpc = new UserService('localhost:50051', grpc.credentials.createInsecure());

module.exports = user_grpc;