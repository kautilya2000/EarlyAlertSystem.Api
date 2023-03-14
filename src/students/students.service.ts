import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { v4 as uuid4 } from 'uuid';
import { PagedStudentDto } from './dto/paged-student.dto';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  create(createStudentDto: CreateStudentDto) {
    return this.prisma.student.create({
      data: {
        ...createStudentDto,
        ksuId: uuid4(),
        homeDepartment: 'CCSE',
      },
    });
  }

  async findAll(skip?: number, take?: number): Promise<PagedStudentDto> {
    const result = await this.prisma.student.findMany({
      where: {
        isDeleted: false,
      },
      skip,
      take,
    });
    return {
      students: result,
      total: result.length,
    };
  }

  findOne(id: string) {
    return this.prisma.student.findUnique({
      where: {
        ksuId: id,
      },
    });
  }

  update(id: string, updateStudentDto: UpdateStudentDto) {
    return this.prisma.student.update({
      where: {
        ksuId: id,
      },
      data: updateStudentDto,
    });
  }

  remove(id: string) {
    return this.prisma.student.update({
      where: {
        ksuId: id,
      },
      data: {
        isDeleted: true,
      },
    });
  }
}
