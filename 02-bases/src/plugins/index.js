const { getAge  }= require('./get-age.plugin');
const { getUuid } = require('./get-uuid-plugin');
const { http } = require('./https-client')
const buildLogger = require('./logger.plugin')

module.exports = {
    getAge,
    getUuid,
    http,
    buildLogger
}