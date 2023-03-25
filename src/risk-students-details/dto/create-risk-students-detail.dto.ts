import { ApiProperty } from '@nestjs/swagger';
import { RiskStudentDetails } from '@prisma/client';

export class CreateRiskStudentsDetailDto
  implements Partial<RiskStudentDetails>
{
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
  studentId: string;

  @ApiProperty()
  studentNetId: string;

  @ApiProperty()
  notes: string;

  @ApiProperty()
  isGraduateStudent: boolean;

  @ApiProperty()
  sendEmail: boolean;

  @ApiProperty()
  factors: string[];
}
