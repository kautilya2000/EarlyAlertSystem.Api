import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRiskStudentsDetailDto } from './dto/create-risk-students-detail.dto';
import { PagedRiskStudentsDetail } from './dto/paged-risk-students-detail.dto';
import { UpdateRiskStudentsDetailDto } from './dto/update-risk-students-detail.dto';
import { RiskStudentsDetailEntity } from './entities/risk-students-detail.entity';

@Injectable()
export class RiskStudentsDetailsService {
  constructor(private _prisma: PrismaService) {}

  async create(
    createRiskStudentsDetailDto: CreateRiskStudentsDetailDto,
  ): Promise<RiskStudentsDetailEntity> {
    const { factors } = createRiskStudentsDetailDto;

    // Create a new riskStudentsDetail record
    const riskStudentsDetail = await this._prisma.riskStudentDetails.create({
      data: {
        courseCrn: createRiskStudentsDetailDto.courseCrn,
        courseNumber: createRiskStudentsDetailDto.courseNumber,
        facultyEmail: createRiskStudentsDetailDto.facultyEmail,
        facultyName: createRiskStudentsDetailDto.facultyName,
        isGraduateStudent: createRiskStudentsDetailDto.isGraduateStudent,
        notes: createRiskStudentsDetailDto.notes,
        sendEmail: createRiskStudentsDetailDto.sendEmail,
        studentId: createRiskStudentsDetailDto.studentId,
        studentName: createRiskStudentsDetailDto.studentName,
        studentNetId: createRiskStudentsDetailDto.studentNetId,
      },
    });

    // create the factors and connect them to the riskStudentsDetail
    await this._prisma.factorsConcerned.createMany({
      data: factors.map((factor) => ({
        factorConcerned: factor,
        riskStudentDetailsId: riskStudentsDetail.riskStudentDetailsId,
      })),
    });

    // return the riskStudentsDetail with the factors
    return this._prisma.riskStudentDetails.findUnique({
      where: {
        riskStudentDetailsId: riskStudentsDetail.riskStudentDetailsId,
      },
      include: {
        FactorsConcerned: true,
      },
    });
  }

  async findAll(
    skip?: number,
    take?: number,
  ): Promise<PagedRiskStudentsDetail> {
    const items = await this._prisma.riskStudentDetails.findMany({
      skip,
      take,
      where: {
        isDeleted: false,
      },
      include: {
        FactorsConcerned: true,
      },
    });

    const total = await this._prisma.riskStudentDetails.count({
      where: {
        isDeleted: false,
      },
    });

    return {
      items,
      total,
    };
  }

  findOne(id: number): Promise<RiskStudentsDetailEntity> {
    return this._prisma.riskStudentDetails.findUnique({
      where: {
        riskStudentDetailsId: id,
      },
      include: {
        FactorsConcerned: true,
      },
    });
  }

  update(
    id: number,
    updateRiskStudentsDetailDto: UpdateRiskStudentsDetailDto,
  ): Promise<RiskStudentsDetailEntity> {
    return this._prisma.riskStudentDetails.update({
      where: {
        riskStudentDetailsId: id,
      },
      data: updateRiskStudentsDetailDto,
      include: {
        FactorsConcerned: true,
      },
    });
  }

  remove(id: number): Promise<RiskStudentsDetailEntity> {
    return this._prisma.riskStudentDetails.update({
      where: {
        riskStudentDetailsId: id,
      },
      data: {
        isDeleted: true,
      },
      include: {
        FactorsConcerned: true,
      },
    });
  }
}
