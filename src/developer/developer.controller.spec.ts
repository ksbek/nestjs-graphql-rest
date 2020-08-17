import { Test, TestingModule } from '@nestjs/testing';
import { DeveloperController } from './developer.controller';
import { DeveloperService } from './developer.service';
// import factory from 'factory-girl';
// import { initializeFactoryGirl } from '../tests/db-factories';
// import { Developer, Language, ProgrammingLanguage } from '../db/models';
// import { LanguageCode } from '../enums/language_code'
// import { ProgrammingLanguageName } from '../enums/programming_language'

describe('Developer Controller', () => {
  let controller: DeveloperController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeveloperController],
      providers: [DeveloperService],
    }).compile();

    controller = module.get<DeveloperController>(DeveloperController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // it('should get developers', async () => {
  //   await initializeFactoryGirl(factory);

  //   // clean database
  //   await Developer.delete({});
  //   await Language.delete({});
  //   await ProgrammingLanguage.delete({});

  //   const language1 = await factory.create<Language>('language', { code: LanguageCode.English });
  //   const language2 = await factory.create<Language>('language', { code: LanguageCode.Japanese });
  //   const language3 = await factory.create<Language>('language', { code: LanguageCode.French });

  //   const programming_language1 = await factory.create<ProgrammingLanguage>('programming_language', { name: ProgrammingLanguageName.Javascript });
  //   const programming_language2 = await factory.create<ProgrammingLanguage>('programming_language', { name: ProgrammingLanguageName.Python });
  //   const programming_language3 = await factory.create<ProgrammingLanguage>('programming_language', { name: ProgrammingLanguageName.Typescript });

  //   const developer1 = await factory.create<Developer>('developer', {
  //     languages: [language1, language2],
  //     programming_languages: [programming_language1, programming_language3],
  //   });
  //   const developer2 = await factory.create<Developer>('developer', {
  //     languages: [language2, language3],
  //     programming_languages: [programming_language3],
  //   });
  //   const developer3 = await factory.create<Developer>('developer', {
  //     languages: [language1],
  //     programming_languages: [programming_language2],
  //   });

  //   const developers = await controller.searchDevelopers({ programming_language:  ProgrammingLanguageName.Typescript, language: LanguageCode.French });

  //   expect(developers[0]).toMatch(developer2.email);
  // });
});
