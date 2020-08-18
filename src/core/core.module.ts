import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandModule } from 'nestjs-command';
import { DeveloperModule } from '../developer/developer.module';
import { DbModule } from '../db/db.module';
import * as TypeOrmConfig from '../typeorm-config';

const moduleList = [
  TypeOrmModule.forRoot(TypeOrmConfig),
  DeveloperModule,
  DbModule,
  CommandModule,
];

@Module({
  imports: moduleList,
  exports: moduleList,
})
export class CoreModule {}
