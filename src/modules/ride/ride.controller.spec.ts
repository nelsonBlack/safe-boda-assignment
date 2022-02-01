import { Test, TestingModule } from '@nestjs/testing';
import { CreateDriverDto } from '../driver/dto/create-driver.dto';
import { CreateRideDto } from './dto/create-ride.dto';
import { Ride } from './entities/ride.entity';
import { RideController } from './ride.controller';
import { RideService } from './ride.service';

const createRideDto: CreateRideDto = {
  driverId: 1,
  passangerId: 1,
  pickupLat: -1.29,
  pickupLong: 36.82,
  destinationLong: 36.12,
  destinationLat: -1.39,
  rideStatus: 'ongoing',
} as Ride;
describe('RideController', () => {
  let controller: RideController;
  let rideService: RideService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RideController],
      providers: [
        RideService,
        {
          provide: RideService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((ride: CreateDriverDto) =>
                Promise.resolve({ id: '1', ...ride }),
              ),
            getOngoingRides: jest.fn().mockResolvedValue([
              {
                driverId: 1,
                passangerId: 1,
                pickupLat: -1.29,
                pickupLong: 36.82,
                destinationLong: 36.12,
                destinationLat: -1.39,
                rideStatus: 'ongoing',
              },
            ]),
          },
        },
      ],
    }).compile();

    controller = module.get<RideController>(RideController);
    rideService = module.get<RideService>(RideService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it('should create a ride', async () => {
      await controller.createRide(createRideDto, '1', '1');
      expect(rideService.createRide).toHaveBeenCalledWith(createRideDto);
    });
  });
});
