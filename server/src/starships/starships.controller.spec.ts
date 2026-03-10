import { Test, TestingModule } from '@nestjs/testing';
import { StarshipController } from './starships.controller';

describe('StarshipController', () => {
  let controller: StarshipController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StarshipController],
    }).compile();

    controller = module.get<StarshipController>(StarshipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
