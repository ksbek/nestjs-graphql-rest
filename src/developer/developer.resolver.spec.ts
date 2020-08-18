import { Test, TestingModule } from '@nestjs/testing';
import { DeveloperResolver } from './developer.resolver';
import { DeveloperService } from './developer.service';

describe('DeveloperResolver', () => {
  let resolver: DeveloperResolver;
  let service: DeveloperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeveloperResolver, DeveloperService],
    }).compile();

    resolver = module.get<DeveloperResolver>(DeveloperResolver);
    service = module.get<DeveloperService>(DeveloperService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should return array of developers', async () => {
    const result = [];
    jest.spyOn(service, 'searchDevelopers').mockImplementation(({}) => Promise.resolve(result));

    expect(await resolver.searchDevelopers({})).toBe(result);
  });
});
