import { Get, Controller, Query } from '@nestjs/common';
import { DeveloperService } from './developer.service';
import { Developer } from '../db/models';
import { DeveloperSearchInput } from '../graphql';

@Controller('developers')
export class DeveloperController {
  constructor(private developerService: DeveloperService) {}

  @Get()
  searchDevelopers(@Query() query: DeveloperSearchInput): Promise<Developer[]> {
    return this.developerService.searchDevelopers(query);
  }
}
