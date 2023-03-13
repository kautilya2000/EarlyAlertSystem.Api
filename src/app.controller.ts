import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Query,
} from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { Student as StudentModel, Prisma } from '@prisma/client'

@Controller()
export class AppController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get('student/:id')
  async getStudentById(@Param('id') id: string): Promise<StudentModel> {
    return this.prismaService.student.findUnique({ where: { ksuId: id } })
  }

  @Get('students')
  async getStudents(
    @Query('skip') skip: number,
    @Query('take') take: number,
  ): Promise<StudentModel[]> {
    return this.prismaService.student.findMany({
      skip: Number(skip),
      take: Number(take),
    })
  }

  @Post('student')
  async createStudent(@Body() student: Prisma.StudentCreateInput) {
    return this.prismaService.student.create({ data: student })
  }

  @Put('student/:id')
  async updateStudent(
    @Param('id') id: string,
    @Body() student: Prisma.StudentUpdateInput,
  ) {
    return this.prismaService.student.update({
      where: { ksuId: id },
      data: student,
    })
  }

  @Delete('student/:id')
  async deleteStudent(@Param('id') id: string) {
    return this.prismaService.student.delete({ where: { ksuId: id } })
  }
}
