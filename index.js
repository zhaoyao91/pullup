const fs = require('fs').promises
const path = require('path')

async function pullup (modPath, context, options) {
  const modStat = await fs.stat(modPath)

  if (modStat.isFile()) {
    const modLoader = require(modPath)
    return modLoader(context)
  } else {
    const relativeModPaths = await fs.readdir(modPath)
    for (let relativeModPath of relativeModPaths) {
      const subModPath = path.resolve(modPath, relativeModPath)
      context = await pullup(subModPath, context, options)
    }
    return context
  }
}

module.exports = pullup
