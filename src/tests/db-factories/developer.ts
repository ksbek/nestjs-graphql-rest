import faker = require('faker');
import factory from 'factory-girl';
import { Developer } from '../../db/models';

factory.define('developer', Developer, buildOptions => ({
  email: faker.internet.email(),
  ...buildOptions,
}));
