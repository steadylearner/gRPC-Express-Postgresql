const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const chalk = require("chalk");

const userResolvers = require("./resolvers/user");

const PROTO_PATH = "./typeDefs/user.proto";
const options = require("./options");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const userproto = grpc.loadPackageDefinition(packageDefinition);

const main = () => {
    const server = new grpc.Server()

    server.addService(userproto.UserService.service, userResolvers)
    const port = "127.0.0.1:50051";

    server.bind(port, grpc.ServerCredentials.createInsecure());
    const blue = chalk.blue
    const target = blue(`http://${port}`)

    console.log(`🚀 gRPC user server ready at ${target}`);
    server.start();
}

main();



