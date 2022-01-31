import { Test, TestingModule } from '@nestjs/testing';
import { MortoBikesService } from './morto-bikes.service';

describe('MortoBikesService', () => {
  let service: MortoBikesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MortoBikesService],
    }).compile();

    service = module.get<MortoBikesService>(MortoBikesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
