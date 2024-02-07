import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { DemoService } from './demo.service';
import { HttpResponse } from '../../utils';
import { PaginationDto } from '../../queries/dto';
import { DemoDto } from './dto';
import { validateUUID } from '../../helpers';

@Controller('demo')
export class DemoController {
  constructor(private readonly demoService: DemoService) {}

  @Post('create')
  async create(@Body() dto: DemoDto) {
    const data = await this.demoService.createDemo(dto);

    return HttpResponse.success({ data, message: 'Record created successfully' });
  }

  @Get('/:id')
  async getMessage(@Param('id') id: string) {
    if (!validateUUID(id)) {
      return HttpResponse.error({ data: '', message: 'bad input' });
    }
    const data = await this.demoService.getDemo(id);

    return HttpResponse.success({ data, message: 'Record fetched successfully' });
  }

  @Get('/')
  async getAllMessage(@Query() query: PaginationDto) {
    const data = await this.demoService.getAllDemo(query);

    return HttpResponse.success({ data, message: 'Record fetched successfully' });
  }
}
