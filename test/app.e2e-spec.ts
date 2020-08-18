import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('App integration test', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(done => {
    app.close();
    done();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/developers (GET)', () => {
    return request(app.getHttpServer())
      .get('/developers?programming_language=Javascript&language=en')
      .expect(200);
  });

  it('/graphql (POST)', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: 'searchDevelopers',
        variables: {
          input: { programming_language: 'Python', language: 'en' },
        },
        query:
          'query searchDevelopers($input: DeveloperSearchInput) {searchDevelopers(input: $input) {id email programming_languages {id name} languages {id code }}}',
      })
      .expect(200);
  });
});
