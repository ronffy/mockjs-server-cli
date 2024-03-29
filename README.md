# mockjs-server-cli
[![npm](https://img.shields.io/npm/v/mockjs-server-cli.svg)](https://www.npmjs.com/package/mockjs-server-cli)

An express server that relies on mockjs to simulate the CLI of interface data

[View examples](https://github.com/ronffy/mockjs-server-cli/tree/master/exemple)

## Install

```shell
npm install mockjs-server-cli
```

## Usage

### mode1

You can add mock.config.js to the project root directory  

project-root  
```
+ |- mock.config.js
```

Running commands  
```shell
mockjs-server
```

### mode2

You can also place mock.config.js somewhere else, or change it to another name.  

project-root  
```
+ |- /config
+   |- mock.config.js
```

Running commands  
```shell
mockjs-server --port=8888 --config=config/mock.config.js
```

### options

- `-p, --port`(default: `8888`) - server port
- `--config`(default: `${cwd}/mock.config.js`) - path to the mock config file
- `--delay` -  simulate http delay
