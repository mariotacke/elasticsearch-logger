const logger = require('../' /* elasticsearch-logger */)();

try {
  throw new Error('An error has occurred.');
} catch (e) {
  logger
    .error(e)
    .then(() => console.error(e)); // eslint-disable-line no-console
}

logger
  .info({
    some: 'information'
  })
  .then(() => console.log()); // eslint-disable-line no-console
