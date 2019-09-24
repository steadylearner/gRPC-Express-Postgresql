const client = require('../client')

client.getUsers({}, (error, users) => {
    if(!error){
        console.log('Get all users');
        console.log(users);
    }
    else{
        console.error(error);
    }
});

