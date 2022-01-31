import { Test, TestingModule } from '@nestjs/testing';
import { PassangerController } from './passanger.controller';
import { PassangerService } from './passanger.service';

describe('PassangerController', () => {
  let controller: PassangerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PassangerController],
      providers: [PassangerService],
    }).compile();

    controller = module.get<PassangerController>(PassangerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
