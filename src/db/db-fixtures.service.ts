import { Injectable } from '@nestjs/common';
import faker = require('faker');
import { Developer, ProgrammingLanguage, Language } from '../db/models';
import * as plData from './fixtures/programming_languages.json';
import * as langData from './fixtures/languages.json';

@Injectable()
export class DbFixturesService {
  public async dropFixtures(): Promise<any> {
    await this.dropFixture('ProgrammingLanguages', ProgrammingLanguage);
    await this.dropFixture('Languages', Language);
    await this.dropFixture('Developers', Developer);
  }

  private async dropFixture(label, entity): Promise<any> {
    try {
      await entity.clear();
      console.log(`Dropped collection ${label}.`);
    } catch (e) {
      console.error(`Failed to drop ${label}, maybe it doesn't exist`, e);
    }
  }

  public async loadFixtures(): Promise<any> {
    await this.loadFixture('ProgrammingLanguages', ProgrammingLanguage, plData);
    await this.loadFixture('Languages', Language, langData);
  }

  private async loadFixture(
    label: string,
    entity: any,
    data: any,
  ): Promise<any> {
    const count = await entity.count();
    if (count === 0) {
      console.log(`${label} empty. Loading ${data.length} records.`);
      await Promise.all(data.map(row => entity.create(row).save()));
    } else {
      console.log(`${label} already has ${count} records. Skipping.`);
    }
  }

  public async loadDevelopers(): Promise<any> {
    await this.loadFixture('Developers', Developer, await this.developerData());
  }

  private async developerData(): Promise<any> {
    const programming_languages = await ProgrammingLanguage.find();
    const languages = await Language.find();

    const developerData = [];
    for (let i = 0; i < 100; i++) {
      developerData.push({
        email: faker.internet.email(),
        programming_languages: this.randomItems(programming_languages),
        languages: this.randomItems(languages),
      });
    }
    return developerData;
  }

  private randomItems(data: any[]): any[] {
    const items = [];
    for (let i = 0; i < Math.floor(Math.random() * data.length); i++) {
      items.push(data[Math.floor(Math.random() * data.length)]);
    }
    return items;
  }
}
