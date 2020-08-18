const TypeOrmAdapter = require('factory-girl-typeorm');

class PostgresqlTypeOrmAdapter extends TypeOrmAdapter {
  constructor(connection) {
    super(connection);
  }

  build(Model, props) {
    const model = new Model(props);
    Object.assign(model, props);
    return model;
  }

  async destroy(model, Model) {
    return await this.connection.manager.delete(Model, { id: model.id });
  }
}

module.exports = { PostgresqlTypeOrmAdapter };
