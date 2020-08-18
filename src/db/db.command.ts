import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { DbFixturesService } from './db-fixtures.service';

@Injectable()
export class DbCommand {
  constructor(private readonly dbFixturesService: DbFixturesService) {}

  @Command({
    command: 'db:seed:languages',
    describe: 'populate database with static collections',
    autoExit: true,
  })
  async dbSeed(): Promise<any> {
    await this.dbFixturesService.loadFixtures();
  }

  @Command({
    command: 'db:seed:developers',
    describe: 'populate database with fake developers',
    autoExit: true,
  })
  async dbSeedDevelopers(): Promise<any> {
    await this.dbFixturesService.loadDevelopers();
  }

  @Command({
    command: 'db:seed:drop',
    describe: 'drop static collections',
    autoExit: true,
  })
  async dbSeedDrop(): Promise<any> {
    await this.dbFixturesService.dropFixtures();
  }
}
