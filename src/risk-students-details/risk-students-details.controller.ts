import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RiskStudentsDetailsService } from './risk-students-details.service';
import { CreateRiskStudentsDetailDto } from './dto/create-risk-students-detail.dto';
import { UpdateRiskStudentsDetailDto } from './dto/update-risk-students-detail.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RiskStudentsDetailEntity } from './entities/risk-students-detail.entity';
import { PagedRiskStudentsDetail } from './dto/paged-risk-students-detail.dto';

@ApiTags('risk-students-details')
@Controller('risk-students-details')
export class RiskStudentsDetailsController {
  constructor(
    private readonly riskStudentsDetailsService: RiskStudentsDetailsService,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: CreateRiskStudentsDetailDto })
  create(@Body() createRiskStudentsDetailDto: CreateRiskStudentsDetailDto) {
    return this.riskStudentsDetailsService.create(createRiskStudentsDetailDto);
  }

  @Get()
  @ApiOkResponse({ type: [PagedRiskStudentsDetail] })
  findAll() {
    return this.riskStudentsDetailsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: RiskStudentsDetailEntity })
  findOne(@Param('id') id: string) {
    return this.riskStudentsDetailsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: RiskStudentsDetailEntity })
  update(
    @Param('id') id: string,
    @Body() updateRiskStudentsDetailDto: UpdateRiskStudentsDetailDto,
  ) {
    return this.riskStudentsDetailsService.update(
      +id,
      updateRiskStudentsDetailDto,
    );
  }

  @Delete(':id')
  @ApiOkResponse({ type: RiskStudentsDetailEntity })
  remove(@Param('id') id: string) {
    return this.riskStudentsDetailsService.remove(+id);
  }
}
