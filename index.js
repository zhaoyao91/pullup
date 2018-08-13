const fs = require('fs').promises
const path = require('path')

const sortByOrder = require('./lib/sort-by-order')
const pickItOut = require('./lib/pick-it-out')

const configFileName = 'index.js'
const libDirName = 'lib'

async function pullup (modPath, context) {
  const modStat = await fs.stat(modPath)
  if (modStat.isFile()) {
    const modLoader = require(modPath)
    return modLoader(context)
  } else {
    let [relativeConfigPath, relativeModPaths] = pickItOut(await fs.readdir(modPath), configFileName) // pick out config file path
    const config = relativeConfigPath ? require(path.resolve(modPath, relativeConfigPath)) : {} // load config
    relativeModPaths = relativeModPaths.filter(x => x !== libDirName) // filter away lib dir
    relativeModPaths = sortByOrder(relativeModPaths, config.order || []) // sort the mods by order

    // pull up all sub mods
    for (let relativeModPath of relativeModPaths) {
      const subModPath = path.resolve(modPath, relativeModPath)
      context = await pullup(subModPath, context)
    }

    return context
  }
}

module.exports = pullup
