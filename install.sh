#!/bin/bash

set -e #$help set

echo "install NPM pacakages for gRPC products folder to work"
pushd products #$help pushd
yarn
popd #$help popd
echo "ready to use products gRPC server and Express /product route"

echo "install NPM packages for gRPC users folder to work"

pushd users
yarn
popd 

echo "Project set up process complete."

echo "To start the project use 'cd users && yarn serve'"

echo "Then, use another console with in products folder and use 'yarn serve' to start Express and grpc server"

echo "Test with 'yarn test-tape' in another console in the same folder."
