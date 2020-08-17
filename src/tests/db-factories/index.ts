import './developer';
import './language';
import './programming_language';
import { createConnection, Connection } from 'typeorm';
import { testTypeOrmConnectionOptions } from '../test-db-connection';
import { PostgresqlTypeOrmAdapter } from './lib/postgresql-type-orm-adapter';

import factory from 'factory-girl';

export { factory };

function getDbConnection(): Promise<Connection> {
  return createConnection(testTypeOrmConnectionOptions);
}

export const initializeFactoryGirl = async (factory: factory.Static, connection?: Connection) : Promise<Connection> => {
  const dbConnection = connection || (await getDbConnection());
  factory.setAdapter(new PostgresqlTypeOrmAdapter(dbConnection));
  return dbConnection;
};
