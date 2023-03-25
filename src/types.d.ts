import { ApiProperty } from '@nestjs/swagger';

export class PagedDto<T> {
  @ApiProperty()
  total: number;

  @ApiProperty()
  items: T[];
}
