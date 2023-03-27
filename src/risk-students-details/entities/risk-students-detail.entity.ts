import { ApiProperty } from '@nestjs/swagger';
import { RiskStudentDetails } from '@prisma/client';
import { FactorsConcernedEntity } from './factors-concerned.entity';

export class RiskStudentsDetailEntity implements RiskStudentDetails {
  @ApiProperty()
  riskStudentDetailsId: number;

  @ApiProperty()
  facultyName: string;

  @ApiProperty()
  facultyEmail: string;

  @ApiProperty()
  courseNumber: string;

  @ApiProperty()
  courseCrn: string;

  @ApiProperty()
  studentName: string;

  @ApiProperty()
  studentId: string | null;

  @ApiProperty()
  studentNetId: string | null;

  @ApiProperty()
  createdDate: Date;

  @ApiProperty()
  updatedDate: Date;

  @ApiProperty()
  isDeleted: boolean;

  @ApiProperty()
  notes: string | null;

  @ApiProperty()
  isGraduateStudent: boolean;

  @ApiProperty()
  graduateProgram: string | null;

  @ApiProperty({
    required: false,
  })
  sendEmail: boolean | null;

  @ApiProperty({
    type: [FactorsConcernedEntity],
  })
  FactorsConcerned: FactorsConcernedEntity[];
}
