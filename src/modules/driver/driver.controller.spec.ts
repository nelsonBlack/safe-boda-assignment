import { Test, TestingModule } from '@nestjs/testing';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { Driver } from './entities/driver.entity';
const createDriverDto: CreateDriverDto = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'driver@mail.com',
  phone: '+380991234567',
  middleName: 'Ousman',
  password: 'pass',
} as Driver;

describe('UsersController', () => {
  let driverController: DriverController;
  let driverService: DriverService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DriverController],
      providers: [
        DriverService,
        {
          provide: DriverService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((driver: CreateDriverDto) =>
                Promise.resolve({ id: '1', ...driver }),
              ),
            getAllDrivers: jest.fn().mockResolvedValue([
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
            suspendDriver: jest.fn().mockImplementation((id: number) =>
              Promise.resolve({
                firstName: 'John2',
                lastName: 'Doe2',
                email: 'driver@mail.com2',
                phone: '+3809912345672',
                middleName: 'Ousman2',
                password: 'pass2',
                suspended: true,
                id,
              }),
            ),
            unSuspendDriver: jest.fn(),
          },
        },
      ],
    }).compile();

    driverController = app.get<DriverController>(DriverController);
    driverService = app.get<DriverService>(DriverService);
  });

  it('should be defined', () => {
    expect(driverController).toBeDefined();
  });

  describe('create()', () => {
    it('should create a driver', () => {
      driverController.create(createDriverDto);
      expect(driverController.create(createDriverDto)).resolves.toEqual({
        id: 1,
        ...createDriverDto,
      });
      expect(driverService.create).toHaveBeenCalledWith(createDriverDto);
    });
  });

  describe('getAllDrivers()', () => {
    it('should find all drivers ', () => {
      driverController.getAllDrivers();
      expect(driverService.getAllDrivers).toHaveBeenCalled();
    });
  });

  describe('suspendDriver()', () => {
    it('should suspend a driver', () => {
      expect(driverController.suspendDriver('1')).resolves.toEqual({
        firstName: 'John',
        lastName: 'Doe',
        email: 'driver@mail.com',
        phone: '+380991234567',
        middleName: 'Ousman',
        password: 'pass',
        suspended: true,
        id: 1,
      });
      expect(driverService.suspendDriver).toHaveBeenCalled();
    });
  });

  describe('unSuspendDriver()', () => {
    it('should unsuspend driver', () => {
      driverController.unSuspendDriver('2');
      expect(driverService.unSuspendDriver).toHaveBeenCalled();
    });
  });
});
