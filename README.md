# Pull Up

Pull it up, mod or app.

Organize your mod or app as a tree of dirs and files. Do not need to import/require code everywhere. Just pull them up with one line of code.

## Concepts

It is all about modules (**mods**).

There are two types of mod, **dir mod** and **file mod**. In a tree view, dir mods are internal nodes and file mods are leaves.

Each file mod exports a function called **mod loader**, which share the shape of `async (context) => context`

When you pull up a mod, the mod tree is travelled in a depth-first way, running mod loaders one by one.

`index.js` (if exists) of each dir is special which serves as the config file.

`lib` dir (if exists) is special in any level which won't be pull up automatically while you can require/import code within it.

## Installation

```
npm install pullup
```

Note

- only support node >= 10 

## Basic Usage

- create a mod according to [concepts](#concepts)
- pull it up:

```
const pullup = require('pullup')

const app = await pullup(dir, context)
```

See [test](./test) as an example.

## Config Options

### order: array of string

Specify the loading order of the sub mods of this mod, where each item is a file name or dir name.

### adapter: (any) => mod loader

Convert exports of direct children file mods into mod loaders.

## License

MIT
