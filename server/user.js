const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const chalk = require("chalk");

const userResolvers = require("./resolvers/user");

const PROTO_PATH = "../typeDefs/user.proto";

// https://www.npmjs.com/package/@grpc/proto-loader
const options = {
    keepCase: true, // important to use true
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
};

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const userproto = grpc.loadPackageDefinition(packageDefinition);

const main = () => {
    const server = new grpc.Server()

    server.addService(userproto.UserService.service, userResolvers)
    const port = "127.0.0.1:50051";

    server.bind(port, grpc.ServerCredentials.createInsecure());
    const blue = chalk.blue
    const target = blue(`http://${port}`)

    console.log(`🚀 gRPC server ready at ${target}`);
    server.start();
}

main();



