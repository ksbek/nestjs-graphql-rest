import { Resolver, Args, Query } from '@nestjs/graphql';
import { DeveloperService } from './developer.service';
import { Developer } from '../db/models';
import { DeveloperSearchInput } from '../graphql';

@Resolver('Developer')
export class DeveloperResolver {
  constructor(private developerService: DeveloperService) {}

  @Query()
  async searchDevelopers(
    @Args('input') input: DeveloperSearchInput,
  ): Promise<Developer[]> {
    return this.developerService.searchDevelopers(input);
  }
}
