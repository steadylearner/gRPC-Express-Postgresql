const client = require('./client');

client.getUser({ id: "steadylearner" }, (error, response) => {
    if (!error) {
        console.log(response);
        // console.log('Get user', user);
    }
    else {
        console.error(error);
    }
})