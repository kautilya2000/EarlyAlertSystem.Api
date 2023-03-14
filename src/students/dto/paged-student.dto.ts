import { ApiProperty } from '@nestjs/swagger';
import { StudentEntity } from '../entities/student.entity';

export class PagedStudentDto {
  @ApiProperty()
  total: number;

  @ApiProperty()
  students: StudentEntity[];
}
