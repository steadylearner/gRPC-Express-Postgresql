const client = require('../client')

client.deleteUsers({}, (error,_) => {
    if (!error) {
        console.log('Delete all users');
    }
    else {
        console.error(error);
    }
});