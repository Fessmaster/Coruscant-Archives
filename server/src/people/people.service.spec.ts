import { Test, TestingModule } from '@nestjs/testing';
import { PeopleService } from './people.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PeopleEntity } from './entity/people.entity';
import { ImagesEntity } from 'src/images/entity/images.entity';
import { FileService } from 'src/file/file.service';
import { NotFoundException } from '@nestjs/common';

describe('PeopleService', () => {
  let service: PeopleService;

  const mockRepository = {
    findOne: jest.fn()
  };


  const mockFileService = {
    uploadFile: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PeopleService,
        {
          provide: getRepositoryToken(PeopleEntity),
          useValue: mockRepository,
        },       
        {
          provide: getRepositoryToken(ImagesEntity),
          useValue: mockRepository,
        },        
        {
          provide: FileService,
          useValue: mockFileService,
        },
      ],
    }).compile();

    service = module.get<PeopleService>(PeopleService);
  });

  it('should be defined', async () => {
    const mockPerson = {
      id: 1,
      name: 'Luke Skywalker',
      images: [],
    };
    
    mockRepository.findOne = jest.fn().mockResolvedValue(mockPerson);
    const userName = await service.findById('1');
    expect(userName).toBeDefined();
    expect(userName.name).toBe('Luke Skywalker');
  });

  it('should throw NotFoundException if person not found', async () => {
    mockRepository.findOne = jest.fn().mockResolvedValue(null); 

    await expect(service.findById('999')).rejects.toThrow(NotFoundException);
  });
});
