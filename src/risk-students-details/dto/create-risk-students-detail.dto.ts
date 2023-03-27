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

  @ApiProperty({
    required: false,
  })
  studentId: string | null;

  @ApiProperty({
    required: false,
  })
  studentNetId: string | null;

  @ApiProperty({
    required: false,
  })
  notes: string | null;

  @ApiProperty()
  isGraduateStudent: boolean;

  @ApiProperty({
    required: false,
  })
  graduateProgram: string | null;

  @ApiProperty({
    required: false,
  })
  sendEmail: boolean | null;

  @ApiProperty()
  factors: string[];
}
