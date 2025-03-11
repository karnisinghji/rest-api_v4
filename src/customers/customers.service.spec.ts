import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CustomersService } from './customers.service';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

const mockCustomers = [
  {
    id: 1,
    name: 'ram',
    email: 'ram@example.com',
    password: 'hashedPassword',
    address: '123 Main St',
    mobile_number: '1234567890',
    orders: [],
  },
  {
    id: 2,
    name: 'shyam',
    email: 'shyam@example.com',
    password: 'hashedPassword',
    address: '1243 Main St',
    mobile_number: '1234867890',
    orders: [],
  },
];

describe('CustomersService', () => {
  let service: CustomersService;
  let repository: jest.Mocked<Repository<Customer>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        {
          provide: getRepositoryToken(Customer),
          useValue: {
            findOne: jest.fn(),
            find: jest.fn().mockResolvedValue(mockCustomers),
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
    repository = module.get(getRepositoryToken(Customer));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all customers', async () => {
    const result = await service.findAll();
    expect(result).toEqual(mockCustomers);
  });

  it('should find a customer by ID', async () => {
    repository.findOne.mockResolvedValue(mockCustomers[0]);
    const result = await service.findOneById(1);
    expect(result).toEqual(mockCustomers[0]);
  });

  it('should throw NotFoundException if customer not found', async () => {
    repository.findOne.mockResolvedValue(null);
    await expect(service.findOneById(3)).rejects.toThrow(NotFoundException);
  });

  it('should update a customer', async () => {
    const updateDto = {
      ...mockCustomers[0],
      name: 'new name',
    };
    repository.update.mockResolvedValue({ affected: 1 } as any);
    repository.findOne.mockResolvedValue(updateDto);
    const result = await service.update(1, updateDto);
    expect(result).toEqual(updateDto);
  });

  it('should delete a customer', async () => {
    repository.delete.mockResolvedValue({ affected: 1 } as any);
    await expect(service.delete(1)).resolves.toEqual({ deleted: true });
  });

  it('should throw NotFoundException if deleting a non-existent customer', async () => {
    repository.delete.mockResolvedValue({ affected: 0 } as any);
    await expect(service.delete(3)).rejects.toThrow(NotFoundException);
  });
});
