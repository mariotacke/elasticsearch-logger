const elasticsearch = require('elasticsearch');

function createLogger (options = {}) {
  const hosts = options.hosts || [options.host || 'localhost:9200'];
  const defaults = {
    application: options.application || process.env.npm_package_name,
    environment: options.environment || process.env.NODE_ENV || 'local'
  };

  const client = new elasticsearch.Client({
    hosts,
    log: 'trace'
  });

  const error = function (error) {
    return new Promise((resolve, reject) => {
      if (!(error instanceof Error)) {
        return reject(new Error(`Error must be instanceof Error.`));
      }

      const body = Object.assign({
        date: new Date().toISOString(),
        stackTrace: error.stack,
        message: error.message
      }, defaults);

      client.index({
        index: options.index || 'logger',
        type: 'error',
        body
      }, (err) => {
        if (err) {
          return reject(err);
        }

        resolve(body);
      });
    });
  };

  const info = function (info) {
    return new Promise((resolve, reject) => {
      const body = Object.assign({
        date: new Date().toISOString(),
      }, defaults, info);

      client.index({
        index: options.index || 'logger',
        type: 'info',
        body
      }, (err) => {
        if (err) {
          return reject(err);
        }

        resolve(body);
      });
    });
  };

  return {
    error,
    info
  };
}

module.exports = createLogger;
