const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
// /home/steadylearner/Desktop/code/site/grpc-postgresql/typeDefs/options
// /home/steadylearner/Desktop/code/site/grpc-postgresql/grpc_client/user/typeDefs/options

// const PROTO_PATH = `../../typeDefs/user.proto`;
// const options = require(`${__dirname}/typeDefs/options`);

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