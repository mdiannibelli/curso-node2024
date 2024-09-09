const { getAge  }= require('../plugins/get-age.plugin');
const { getUuid } = require('../plugins/get-uuid-plugin');
const { http } = require('../plugins/https-client')

module.exports = {
    getAge,
    getUuid,
    http 
}