import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { Repository } from 'typeorm';
import { Driver } from './entities/driver.entity';

const userArray = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'driver@mail.com',
    phone: '+380991234567',
    middleName: 'Ousman',
    password: 'pass',
  },
  {
    firstName: 'John2',
    lastName: 'Doe2',
    email: 'driver@mail.com2',
    phone: '+3809912345672',
    middleName: 'Ousman2',
    password: 'pass2',
    suspended: true,
  },
] as unknown as Driver[];

const oneUser = {
  firstName: 'John2',
  lastName: 'Doe2',
  email: 'driver@mail.com2',
  phone: '+3809912345672',
  middleName: 'Ousman2',
  password: 'pass2',
  suspended: true,
  id: 1,
} as Driver;

describe('DriverService', () => {
  let service: DriverService;
  let repository: Repository<Driver>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DriverService,
        {
          provide: getRepositoryToken(Driver),
          useValue: {
            find: jest.fn().mockResolvedValue(userArray),
            findOne: jest.fn(),
            save: jest.fn(),
            create: jest.fn().mockResolvedValue(oneUser),
          },
        },
      ],
    }).compile();

    service = module.get<DriverService>(DriverService);
    repository = module.get<Repository<Driver>>(getRepositoryToken(Driver));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should successfully insert a user', () => {
      const oneUser = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'driver@mail.com',
        phone: '+380991234567',
        middleName: 'Ousman',
        password: 'pass',
      };

      expect(
        service.create({
          firstName: 'John',
          lastName: 'Doe',
          email: 'driver@mail.com',
          phone: '+380991234567',
          middleName: 'Ousman',
          password: 'pass',
        }),
      ).resolves.toEqual(oneUser);
    });
  });

  describe('getAllDrivers()', () => {
    it('should return an array of drivers', async () => {
      const users = await service.getAllDrivers();
      expect(users).toEqual(userArray);
    });
  });

  describe('suspendDriver()', () => {
    it('should suspend a single driver', () => {
      const repoSpy = jest.spyOn(repository, 'findOne');
      const repoSpySave = jest.spyOn(repository, 'save');
      expect(service.suspendDriver(1)).resolves.toEqual(oneUser);
      expect(repoSpy).toBeCalledWith(1);
    });
  });

/*   describe('unSuspendDriver non existing driver()', () => {
    it('unSuspendDriver', async () => {
      const repoSpy = jest.spyOn(repository, 'findOne');
      await service.unSuspendDriver(1);
      expect(service.unSuspendDriver(1)).resolves.toEqual(oneUser);
      expect(repoSpy).toThrowError();
    });
  }); */
});
