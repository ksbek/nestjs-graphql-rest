import factory from 'factory-girl';
import { ProgrammingLanguage } from '../../db/models';
import { ProgrammingLanguageName } from '../../enums/programming_language'

factory.define('programming_language', ProgrammingLanguage, buildOptions => ({
  name: ProgrammingLanguageName.Typescript,
  ...buildOptions,
}));
