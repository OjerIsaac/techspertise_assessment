import { Module } from '@nestjs/common';
import { DemoController } from './demo.controller';
import { DemoService } from './demo.service';
import { DemoRepository } from './repository';
import { demoProvider } from './provider';

@Module({
  imports: [],
  controllers: [DemoController],
  providers: [DemoService, DemoRepository, demoProvider],
})
export class DemoModule {}
