import { PartialType } from '@nestjs/swagger';
import { CreateRiskStudentsDetailDto } from './create-risk-students-detail.dto';

export class UpdateRiskStudentsDetailDto extends PartialType(
  CreateRiskStudentsDetailDto,
) {}
