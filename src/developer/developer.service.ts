import { Injectable } from '@nestjs/common';
import { Developer } from '../db/models/developer.entity';
import { DeveloperSearchInput } from '../graphql';

@Injectable()
export class DeveloperService {
  searchDevelopers(input: DeveloperSearchInput): Promise<Developer[]> {
    if (!input) {
      input = {};
    }
    return Developer.searchDevelopers(input.programming_language, input.language, input.offset, input.limit);
  }
}
