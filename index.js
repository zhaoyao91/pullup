const fs = require('fs').promises
const path = require('path')

const sortByOrder = require('./lib/sort-by-order')
const pickItOut = require('./lib/pick-it-out')

const configFileName = 'index.js'

async function pullup (modPath, context) {
  const modStat = await fs.stat(modPath)
  if (modStat.isFile()) {
    const modLoader = require(modPath)
    return modLoader(context)
  } else {
    const [relativeConfigPath, relativeModPaths] = pickItOut(await fs.readdir(modPath), configFileName)
    const config = relativeConfigPath ? require(path.resolve(modPath, relativeConfigPath)) : {}
    const orderedRelativeModPaths = sortByOrder(relativeModPaths, config.order || [])
    for (let relativeModPath of orderedRelativeModPaths) {
      const subModPath = path.resolve(modPath, relativeModPath)
      context = await pullup(subModPath, context)
    }
    return context
  }
}

module.exports = pullup
