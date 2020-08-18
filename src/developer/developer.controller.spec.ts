import { Test, TestingModule } from '@nestjs/testing';
import { DeveloperController } from './developer.controller';
import { DeveloperService } from './developer.service';

describe('Developer Controller', () => {
  let controller: DeveloperController;
  let service: DeveloperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeveloperController],
      providers: [DeveloperService],
    }).compile();

    controller = module.get<DeveloperController>(DeveloperController);
    service = module.get<DeveloperService>(DeveloperService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return array of developers', async () => {
    const result = [];
    jest.spyOn(service, 'searchDevelopers').mockImplementation(({}) => Promise.resolve(result));

    expect(await controller.searchDevelopers({})).toBe(result);
  });
});
