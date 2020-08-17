const TypeOrmAdapter = require('factory-girl-typeorm');

class PostgresqlTypeOrmAdapter extends TypeOrmAdapter {
  constructor(connection) {
    super(connection);
  }
}

module.exports = { PostgresqlTypeOrmAdapter };
