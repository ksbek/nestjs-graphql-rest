import { TypeOrmModule } from '@nestjs/typeorm';
import * as TypeOrmTestConfig from '../typeorm-config.test';

export const testTypeOrmConnectionOptions = TypeOrmTestConfig;

export const testConnection = TypeOrmModule.forRoot({
  ...TypeOrmTestConfig,
  ...{
    // nest typeorm options
    keepConnectionAlive: true,
    migrationsRun: false,
  },
});
