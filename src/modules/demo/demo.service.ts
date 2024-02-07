import { Injectable } from '@nestjs/common';
import { ErrorHelper } from '../../utils';
import { PaginationDto, PaginationMetadataDto, PaginationResultDto } from '../../queries/dto';
import { DemoRepository } from './repository';
import { DemoDto } from './dto';

@Injectable()
export class DemoService {
  constructor(private demoRepo: DemoRepository) {}

  async createDemo(dto: DemoDto) {
    const demo = await this.demoRepo.create({
      ...dto,
    });

    return demo;
  }

  async getDemo(id: string) {
    const demo = await this.demoRepo.findOne({
      where: {
        id,
      },
    });

    if (!demo) {
      ErrorHelper.NotFoundException('Record not found');
    }

    return demo;
  }

  async getAllDemo(paginationDto: PaginationDto) {
    const [demo, itemCount] = await this.demoRepo.findAndCount(paginationDto);

    const pageMetaDto = new PaginationMetadataDto({
      itemCount,
      pageOptionsDto: paginationDto,
    });

    return new PaginationResultDto(demo, pageMetaDto);
  }
}
