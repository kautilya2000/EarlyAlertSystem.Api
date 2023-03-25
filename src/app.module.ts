import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { StudentsModule } from './students/students.module';
import { RiskStudentsDetailsModule } from './risk-students-details/risk-students-details.module';

@Module({
  imports: [PrismaModule, StudentsModule, RiskStudentsDetailsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
