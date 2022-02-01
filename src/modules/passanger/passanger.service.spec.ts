import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Passanger } from './entities/passanger.entity';
import { PassangerService } from './passanger.service';
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
] as unknown as Passanger[];

const oneUser = {
  firstName: 'John2',
  lastName: 'Doe2',
  email: 'driver@mail.com2',
  phone: '+3809912345672',
  middleName: 'Ousman2',
  password: 'pass2',
  suspended: true,
  id: 1,
} as unknown as Passanger;
describe('PassangerService', () => {
  let service: PassangerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PassangerService,
        {
          provide: getRepositoryToken(Passanger),
          useValue: {
            find: jest.fn().mockResolvedValue(userArray),

            create: jest.fn().mockResolvedValue(oneUser),
          },
        },
      ],
    }).compile();

    service = module.get<PassangerService>(PassangerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllPassangers()', () => {
    it('should return an array of passangers', async () => {
      const users = await service.getAllPassangers();
      expect(users).toEqual(userArray);
    });
  });

  describe('create()', () => {
    it('should successfully insert a passanger', () => {
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
});
