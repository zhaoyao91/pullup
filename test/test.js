const path = require('path')

const pullup = require('../index')

describe('pullup', () => {
  it('should pull up mod-a', async () => {
    const modPath = path.resolve(__dirname, './mod-a')
    const app = await pullup(modPath, [])
    expect(app).toEqual([
      'a-a-a',
      'lib',
      'a-b-b',
      'a-b-a',
      'a-b-c-a',
      'a-c',
      'a-d'
    ])
  })
})
