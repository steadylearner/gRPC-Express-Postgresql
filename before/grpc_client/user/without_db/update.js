const client = require('../client');

let user = {
    "id": "mybirthdayisnoblackfriday",
    "first_name": "mybirthdayisnot",
    "last_name": "blackfriday",
    "date_of_birth": "2019-11-26",
};

client.update(user, (error, updated) => {
    if (!error) {
        console.log('The product is updated successfully', updated)
    }
    else {
        console.error(error)
    }
})