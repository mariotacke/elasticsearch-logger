# Elasticsearch Logger for Node.js
A configuration-free Elasticsearch logger for node.js with sane defaults.

## Usage
Check out the example [here](example/).

```js
const logger = require('elasticsearch-logger')();

try {
  throw new Error('An error has occurred.');
} catch (e) {
  logger
    .error(e)
    .then(() => console.error(e));
}
```

## Options
`elasticsearch-logger` accepts an optional `options` parameter during creation.

### Example
```js
const createLogger = require('elasticsearch-logger');

const logger = createLogger(options?: Object)
```

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| `hosts` | `array` or `string` | `localhost:9200` | The names of elasticsearch hosts. |
| `host` | `string` | `localhost:9200` | The name of the elasticsearch host. |
| `application` | `string` | `process.env.npm_package_name` | `application` name added to log payload. |
| `environment` | `string` | `process.env.NODE_ENV` or `local` | `environment` name added to log payload. |
| `index` | `string` | `logger` | Elasticsearch `index` name for logger. |

## Requirements
- Node.js 6+
- Elasticsearch
