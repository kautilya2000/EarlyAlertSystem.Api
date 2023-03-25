import { Module } from '@nestjs/common';
import { RiskStudentsDetailsService } from './risk-students-details.service';
import { RiskStudentsDetailsController } from './risk-students-details.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [RiskStudentsDetailsController],
  providers: [RiskStudentsDetailsService],
  imports: [PrismaModule],
})
export class RiskStudentsDetailsModule {}
