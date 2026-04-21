const path = require('path');

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      // This ensures the file is created in the db folder correctly
      filename: path.join(__dirname, 'dev.sqlite3')
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.join(__dirname, 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'seeds')
    }
  }
};