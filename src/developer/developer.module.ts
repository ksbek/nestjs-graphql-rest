import { Module } from '@nestjs/common';
import { DeveloperController } from './developer.controller';
import { DeveloperService } from './developer.service';
import { DeveloperResolver } from './developer.resolver';

@Module({
  controllers: [DeveloperController],
  providers: [DeveloperService, DeveloperResolver],
})
export class DeveloperModule {}
