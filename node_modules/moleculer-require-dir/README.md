# moleculer-require-dir

> because moleculer-runner doesn't active hot-reload when use with require-dir so I made this

```bash
npm i moleculer-require-dir --save
```

```js
const requireDir = require('moleculer-require-dir')
console.log(requireDir('./folders', {
  recurse: true,
  camelCase: true
}))
```

* Options
    > recurse: load all children dirs

    > camelCase: convert this-name_type to thisNameType

* Author

[0x0a0d](//github.com/0x0a0d)

have funs