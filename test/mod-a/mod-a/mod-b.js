const name = require('./lib/name')

module.exports = async function (context) {
  return context.concat(name)
}
