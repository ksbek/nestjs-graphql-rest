import factory from 'factory-girl';
import { Language } from '../../db/models';
import { LanguageCode } from '../../enums/language_code';

factory.define('language', Language, buildOptions => ({
  code: LanguageCode.English,
  ...buildOptions,
}));
