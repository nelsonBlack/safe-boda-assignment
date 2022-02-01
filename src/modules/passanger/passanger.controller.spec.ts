import { Test, TestingModule } from '@nestjs/testing';
import { CreatePassangerDto } from './dto/create-passanger.dto';
import { Passanger } from './entities/passanger.entity';
import { PassangerController } from './passanger.controller';
import { PassangerService } from './passanger.service';
const createPassangerDto: CreatePassangerDto = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'driver@mail.com',
  phone: '+380991234567',
  middleName: 'Ousman',
  password: 'pass',
} as Passanger;
describe('PassangerController', () => {
  let controller: PassangerController;
  let passangerService: PassangerService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PassangerController],
      providers: [
        PassangerService,
        {
          provide: PassangerService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((passanger: CreatePassangerDto) =>
                Promise.resolve({ id: '1', ...passanger }),
              ),
            getAllPassangers: jest.fn().mockResolvedValue([
              {
                firstName: 'John',
                lastName: 'Doe',
                email: 'driver@mail.com',
                phone: '+380991234567',
                middleName: 'Ousman',
                password: 'pass',
              },
              {
                firstName: 'John1',
                lastName: 'Doe1',
                email: 'driver@mail.com1',
                phone: '+3809912345617',
                middleName: 'Ousman1',
                password: 'pass1',
              },
            ]),
          },
        },
      ],
    }).compile();

    controller = module.get<PassangerController>(PassangerController);
    passangerService = module.get<PassangerService>(PassangerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it('should create a passanger', () => {
      controller.create(createPassangerDto);
      expect(controller.create(createPassangerDto)).resolves.toEqual({
        id: 1,
        ...createPassangerDto,
      });
      expect(passangerService.create).toHaveBeenCalledWith(createPassangerDto);
    });
  });

  describe('getAllPassangers()', () => {
    it('should find all drivers ', () => {
      controller.getAllPassangers();
      expect(passangerService.getAllPassangers).toHaveBeenCalled();
    });
  });
});
