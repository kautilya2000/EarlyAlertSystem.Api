import { ApiProperty } from '@nestjs/swagger';
import { RiskStudentsDetailEntity } from '../entities/risk-students-detail.entity';

export class PagedRiskStudentsDetail {
  @ApiProperty()
  total: number;

  @ApiProperty({
    type: [RiskStudentsDetailEntity],
  })
  items: RiskStudentsDetailEntity[];
}
