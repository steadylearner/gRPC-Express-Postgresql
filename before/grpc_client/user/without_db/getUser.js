const client = require('../client');

client.getUser({ id: "steadylearner" }, (error, user) => {
    if (!error) {
        console.log('Get user', user);
    }
    else {
        console.error(error);
    }
})