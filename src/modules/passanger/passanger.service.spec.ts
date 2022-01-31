import { Test, TestingModule } from '@nestjs/testing';
import { PassangerService } from './passanger.service';

describe('PassangerService', () => {
  let service: PassangerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PassangerService],
    }).compile();

    service = module.get<PassangerService>(PassangerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
