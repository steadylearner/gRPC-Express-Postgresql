const client = require("./client");

let newUser = {
    "id": "mybirthdayisnoblackfriday",
    "first_name": "mybirthdayisno",
    "last_name": "blackfriday",
    "date_of_birth": "2019-11-26",
};

client.create(newUser, (error, user) => {
    if (!error) {
        console.log('The user was created successfully', user);
    }
    else {
        console.error(error);
    }
})