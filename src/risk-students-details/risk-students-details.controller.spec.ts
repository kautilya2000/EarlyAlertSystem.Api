import { Test, TestingModule } from '@nestjs/testing';
import { RiskStudentsDetailsController } from './risk-students-details.controller';
import { RiskStudentsDetailsService } from './risk-students-details.service';

describe('RiskStudentsDetailsController', () => {
  let controller: RiskStudentsDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RiskStudentsDetailsController],
      providers: [RiskStudentsDetailsService],
    }).compile();

    controller = module.get<RiskStudentsDetailsController>(
      RiskStudentsDetailsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
