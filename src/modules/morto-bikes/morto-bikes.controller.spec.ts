import { Test, TestingModule } from '@nestjs/testing';
import { MortoBikesController } from './morto-bikes.controller';
import { MortoBikesService } from './morto-bikes.service';

describe('MortoBikesController', () => {
  let controller: MortoBikesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MortoBikesController],
      providers: [MortoBikesService],
    }).compile();

    controller = module.get<MortoBikesController>(MortoBikesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
