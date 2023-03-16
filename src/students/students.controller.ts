import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { StudentEntity } from './entities/student.entity';
import { PagedStudentDto } from './dto/paged-student.dto';

@Controller('students')
@ApiTags('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @ApiCreatedResponse({ type: StudentEntity })
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  @ApiQuery({ name: 'skip', type: 'number', required: false })
  @ApiQuery({ name: 'take', type: 'number', required: false })
  @ApiOkResponse({ type: PagedStudentDto })
  findAll(@Query('skip') skip?: number, @Query('take') take?: number) {
    let skipValue: number | undefined = undefined;
    let takeValue: number | undefined = undefined;

    if (!isNaN(skip)) {
      skipValue = Number(skip);
    }

    if (!isNaN(take)) {
      takeValue = Number(take);
    }

    return this.studentsService.findAll(skipValue, takeValue);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: 'string', required: true })
  @ApiOkResponse({ type: StudentEntity })
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: 'string', required: true })
  @ApiOkResponse({ type: StudentEntity })
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(id, updateStudentDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: 'string', required: true })
  @ApiOkResponse({ type: StudentEntity })
  remove(@Param('id') id: string) {
    return this.studentsService.remove(id);
  }
}
