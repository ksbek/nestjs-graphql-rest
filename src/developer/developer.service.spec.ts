import { Test, TestingModule } from '@nestjs/testing';
import factory from 'factory-girl';
import { initializeFactoryGirl } from '../tests/db-factories';
import { DeveloperService } from './developer.service';
import { Developer, Language, ProgrammingLanguage } from '../db/models';
import { LanguageCode } from '../enums/language_code'
import { ProgrammingLanguageName } from '../enums/programming_language'


describe('DeveloperService', () => {
  let service: DeveloperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeveloperService],
    }).compile();

    service = module.get<DeveloperService>(DeveloperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get developers', async () => {
    await initializeFactoryGirl(factory);

    // clean database
    await Developer.delete({});
    await Language.delete({});
    await ProgrammingLanguage.delete({});

    const language1 = await factory.create<Language>('language', { code: LanguageCode.English });
    const language2 = await factory.create<Language>('language', { code: LanguageCode.Japanese });
    const language3 = await factory.create<Language>('language', { code: LanguageCode.French });

    const programming_language1 = await factory.create<ProgrammingLanguage>('programming_language', { name: ProgrammingLanguageName.Javascript });
    const programming_language2 = await factory.create<ProgrammingLanguage>('programming_language', { name: ProgrammingLanguageName.Python });
    const programming_language3 = await factory.create<ProgrammingLanguage>('programming_language', { name: ProgrammingLanguageName.Typescript });

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

    const developers = await service.searchDevelopers({ programming_language:  ProgrammingLanguageName.Typescript, language: LanguageCode.French });

    expect(developers[0]).toMatch(developer2.email);
  });
});
