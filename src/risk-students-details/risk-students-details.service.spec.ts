import { Test, TestingModule } from '@nestjs/testing';
import { RiskStudentsDetailsService } from './risk-students-details.service';

describe('RiskStudentsDetailsService', () => {
  let service: RiskStudentsDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RiskStudentsDetailsService],
    }).compile();

    service = module.get<RiskStudentsDetailsService>(
      RiskStudentsDetailsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
