import { ApiProperty } from '@nestjs/swagger';
import { FactorsConcerned } from '@prisma/client';

export class FactorsConcernedEntity implements FactorsConcerned {
  @ApiProperty()
  factorsConcernedId: number;

  @ApiProperty()
  riskStudentDetailsId: number;

  @ApiProperty()
  factorConcerned: string;

  @ApiProperty()
  createdDate: Date;

  @ApiProperty()
  updatedDate: Date;

  @ApiProperty()
  isDeleted: boolean;
}
