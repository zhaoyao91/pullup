# Pull Up

Pull it up, mod or app.

Organize your mod or app as a tree of dirs and files. Do not need to import/require everywhere. Just pull them up with one line of code.

## Installation

```
npm install pullup
```

Note

- only support node >= 10 

## Basic Usage

- create a dir as a mod in which
  - any file exports a mod loader, which is an async function that tooks a context and returns a (new) context, such as `async (context) => context`
  - any dir is another sub mod

See [test](./test) as an example.

## Config

The `index.js` file (if exists) of each dir is the config file of the mod, which supports following options:

- order: array of string - specify the loading order of the sub mods of this mod, where each item is a file name or dir name

## Static Code

The `lib` dir of each dir is a special folder which holds the static code and won't be pulled up automatically. You can require/import modules in them from other mod files.

## License

MIT
