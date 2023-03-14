import { Student } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class StudentEntity implements Student {
  @ApiProperty()
  ksuId: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  homeDepartment: string;

  @ApiProperty()
  major: string | null;

  @ApiProperty()
  gpa: string | null;

  @ApiProperty()
  cohort: string | null;

  @ApiProperty()
  academicStanding: string | null;

  @ApiProperty()
  createdDate: Date;

  @ApiProperty()
  updatedDate: Date;

  @ApiProperty()
  isDeleted: boolean;
}
