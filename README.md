# mockjs-server-cli
An express server that relies on mockjs to simulate the CLI of interface data

## Install

```
npm install mockjs-server-cli
```

## Usage

You can add mock.config.js to the project root directory  

project-root  
```
+ |- mock.config.js
```

Running commands  
```
mockjs-server
```

You can also place mock.config.js somewhere else, or change it to another name.  

project-root  
```
+ |- /config
    |- mock.config.js
```

Running commands  
```
mockjs-server --config=config/mock.config.js
```

### options

- `-p, -port`(default: `8888`) - server port
- `config`(default: `${cwd}/mock.config.js`) - path to the mock config file
