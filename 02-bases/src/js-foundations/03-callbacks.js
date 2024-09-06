const user = [
    {
        id: 1,
        name: "John Doe"
    },
    {
        id: 2,
        name: "Jane Doe"
    }
]

function getUserById(id, callback) {
    const foundUser = user.find(user => user.id === id);
    //console.log({user: foundUser});

    if(!foundUser) {
        return callback(`User not found with id: ${id}`)
    }

    return callback(null, foundUser);
}

//getUserById(2)

module.exports = {
    getUserById
}