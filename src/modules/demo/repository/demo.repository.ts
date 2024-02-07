import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../../database';
import { DEMO_REPOSITORY } from '../demo.constant';
import { Demo } from '../entities';
import { PaginationDto } from '../../../queries/dto';

@Injectable()
export class DemoRepository extends BaseRepository<Demo> {
  constructor(
    @Inject(DEMO_REPOSITORY)
    private demoRepo: Repository<Demo>
  ) {
    super(demoRepo);
  }

  async findAndCount(paginationDto: PaginationDto): Promise<[Demo[], number]> {
    const { skip, limit } = paginationDto;

    const [demo, count] = await this.demoRepo.findAndCount({
      order: {
        createdAt: 'DESC',
      },
      take: limit,
      skip,
    });

    return [demo, count];
  }
}
