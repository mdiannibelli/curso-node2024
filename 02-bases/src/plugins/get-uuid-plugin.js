const { v4: uuidv4 } = require('uuid');

const getUuid = () => {
    return uuidv4();
}

module.exports = getUuid;