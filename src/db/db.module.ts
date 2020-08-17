import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbCommand } from './db.command';
import { DbFixturesService } from './db-fixtures.service';
import * as allEntities from './models';

@Global()
@Module({
  imports: [TypeOrmModule],
  providers: [...Object.keys(allEntities).map(k => allEntities[k]), DbCommand, DbFixturesService],
  exports: [TypeOrmModule, DbCommand, DbFixturesService],
})
export class DbModule {}
