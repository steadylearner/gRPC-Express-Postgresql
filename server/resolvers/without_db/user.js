const grpc = require('grpc');

let users = [
    {
        "id": "steadylearner",
        "first_name": "steady",
        "last_name": "learner",
        "date_of_birth": "2019-01-01",
    },
    {
        "id": "mybirthdayisblackfriday",
        "first_name": "mybirthdayis",
        "last_name": "blackfriday",
        "date_of_birth": "2019-11-25",
    },
];

const getUsers = (_, callback) => {
    if (users) {
        // console.log(users);
        callback(null, { users }); //
    }
    else {
        callback({
            code: grpc.status.NOT_FOUND,
            details: "Not Found"
        })
    }
};

const getUser = ({ request }, callback) => {
    let user = users.find((t) => t.id === request.id);
    if (user) {
        callback(null, user)
    }
    else {
        callback({
            code: grpc.status.NOT_FOUND,
            details: "Not Found"
        })

    }
};

const create = ({ request }, callback) => {
    let user = request;
    users.push(user)

    callback(null, user) // null means there was no error
};

const update = ({ request }, callback) => {
    let user = users.find((t) => t.id === request.id);
    if (user) {

        user.first_name = request.first_name;
        user.last_name = request.last_name;
        user.date_of_birth = request.date_of_birth;

        callback(null, user)
    }
    else {

        callback({
            code: grpc.status.NOT_FOUND,
            details: "Not Found"
        })

    }
};


const deleteUser = ({ request }, callback) => {
    let userDelete = users.find((n) => n.id === request.id);
    if (userDelete != -1) {

        users.splice(userDelete, 1) // mutable operation, remove a member from userDelete
        callback(null, {})

    }
    else {
        callback({
            code: grpc.status.NOT_FOUND,
            details: "Not Found"
        })
    }
};

const deleteUsers = (_, callback) => {
    if (users) {
        users = [];
        callback(null, {})
    }
    else {
        callback({
            code: grpc.status.NOT_FOUND,
            details: "Not Found"
        })
    }
};

module.exports = {
    getUsers,
    getUser,
    create,
    update,
    deleteUser,
    deleteUsers,
}