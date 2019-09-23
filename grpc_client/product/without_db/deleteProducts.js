const client = require('../client')

client.deleteProducts({}, (error,_) => {
    if (!error) {
        console.log('Delete all products');
    }
    else {
        console.error(error);
    }
});