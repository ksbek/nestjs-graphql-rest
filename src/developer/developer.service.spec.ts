import { Test, TestingModule } from '@nestjs/testing';
import factory from 'factory-girl';
import { getConnection } from 'typeorm';
import { testConnection } from '../tests/test-db-connection';
import { initializeFactoryGirl } from '../tests/db-factories';
import { DeveloperService } from './developer.service';
import { Developer, Language, ProgrammingLanguage } from '../db/models';
import { LanguageCode } from '../enums/language_code';
import { ProgrammingLanguageName } from '../enums/programming_language';

describe('DeveloperService', () => {
  let service: DeveloperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [testConnection],
      providers: [DeveloperService],
    }).compile();

    service = module.get<DeveloperService>(DeveloperService);
    await initializeFactoryGirl(factory, getConnection());
  });

  afterEach(async () => {
    await getConnection().synchronize(true);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get developers', async () => {
    const language1 = await factory.create<Language>('language', {
      code: LanguageCode.English,
    });
    const language2 = await factory.create<Language>('language', {
      code: LanguageCode.Japanese,
    });
    const language3 = await factory.create<Language>('language', {
      code: LanguageCode.French,
    });

    const programming_language1 = await factory.create<ProgrammingLanguage>(
      'programming_language',
      { name: ProgrammingLanguageName.Javascript },
    );
    const programming_language2 = await factory.create<ProgrammingLanguage>(
      'programming_language',
      { name: ProgrammingLanguageName.Python },
    );
    const programming_language3 = await factory.create<ProgrammingLanguage>(
      'programming_language',
      { name: ProgrammingLanguageName.Typescript },
    );

    await factory.create<Developer>('developer', {
      languages: [language1, language2],
      programming_languages: [programming_language1, programming_language3],
    });
    const developer2 = await factory.create<Developer>('developer', {
      languages: [language2, language3],
      programming_languages: [programming_language3],
    });
    await factory.create<Developer>('developer', {
      languages: [language1],
      programming_languages: [programming_language2],
    });

    const developers = await service.searchDevelopers({
      programming_language: ProgrammingLanguageName.Typescript,
      language: LanguageCode.French,
    });

    expect(developers[0].email).toMatch(developer2.email);
  });
});
