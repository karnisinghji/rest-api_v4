// // // import { Test, TestingModule } from '@nestjs/testing';
// // // import { CustomersController } from './customers.controller';
// // // import { CustomersService } from './customers.service';
// // // import { JwtAuthGuard } from '../auth/auth.guard';
// // // import { UpdateCustomerDto } from './dto/update-customer.dto';
// // // import { NotFoundException } from '@nestjs/common';

// // // describe('CustomersController', () => {
// // //   let controller: CustomersController;
// // //   let service: CustomersService;

// // //   const mockCustomer = {
// // //     id: 1,
// // //     name: 'hari',
// // //     email: 'hari@example.com',
// // //     address: '123 Main St',
// // //     mobile_number: '1234567890',
// // //     password: 'Pass123',
// // //     orders: [],
// // //   };

// // //   const mockCustomersService = {
// // //     findAll: jest.fn().mockResolvedValue([mockCustomer]),
// // //     findOneById: jest
// // //       .fn()
// // //       .mockImplementation((id) =>
// // //         id === 1 ? Promise.resolve(mockCustomer) : Promise.resolve(null),
// // //       ),
// // //     update: jest
// // //       .fn()
// // //       .mockImplementation((id, dto) =>
// // //         Promise.resolve({ ...mockCustomer, ...dto }),
// // //       ),
// // //     delete: jest.fn().mockResolvedValue(mockCustomer),
// // //   };

// // //   beforeEach(async () => {
// // //     const module: TestingModule = await Test.createTestingModule({
// // //       controllers: [CustomersController],
// // //       providers: [
// // //         {
// // //           provide: CustomersService,
// // //           useValue: mockCustomersService,
// // //         },
// // //       ],
// // //     })
// // //       .overrideGuard(JwtAuthGuard)
// // //       .useValue({ canActivate: jest.fn(() => true) })
// // //       .compile();

// // //     controller = module.get<CustomersController>(CustomersController);
// // //     service = module.get<CustomersService>(CustomersService);
// // //   });

// // //   it('should be defined', () => {
// // //     expect(controller).toBeDefined();
// // //   });

// // //   describe('findAll', () => {
// // //     it('should return all customers', async () => {
// // //       expect(await controller.findAll()).toEqual({
// // //         statusCode: 200,
// // //         data: [mockCustomer],
// // //       });
// // //     });
// // //   });

// // //   describe('findOne', () => {
// // //     it('should return a customer by ID', async () => {
// // //       expect(await controller.findone('1')).toEqual({
// // //         statusCode: 200,
// // //         data: mockCustomer,
// // //       });
// // //     });

// // //     it('should return 404 if customer is not found', async () => {
// // //       await expect(controller.findone('2')).resolves.toEqual({
// // //         statusCode: 404,
// // //         message: 'Customer not found',
// // //       });
// // //     });
// // //   });

// // //   describe('updateCustomer', () => {
// // //     it('should update a customer', async () => {
// // //       const dto: UpdateCustomerDto = { name: 'Updated Name' };

// // //       jest.spyOn(service, 'update').mockImplementation(async () => ({
// // //         ...mockCustomer,
// // //         ...dto,
// // //         password: mockCustomer.password, // Ensure password is included
// // //       }));

// // //       await expect(controller.updateCustomer('1', dto)).resolves.toEqual({
// // //         statusCode: 201,
// // //         message: 'Customer updated successfully',
// // //         data: { ...mockCustomer, ...dto },
// // //       });
// // //     });
// // //   });

// // //   describe('deleteCustomer', () => {
// // //     it('should delete a customer', async () => {
// // //       expect(await controller.deleteCustomer('1')).toEqual({
// // //         statusCode: 200,
// // //         message: 'Customer deleted successfully',
// // //         data: mockCustomer,
// // //       });
// // //     });

// // //     it('should return 404 if customer is not found', async () => {
// // //       jest
// // //         .spyOn(service, 'delete')
// // //         .mockRejectedValue(
// // //           new NotFoundException('Selected customer not found'),
// // //         );

// // //       await expect(controller.deleteCustomer('2')).rejects.toThrow(
// // //         NotFoundException,
// // //       );
// // //     });
// // //   });
// // // });

// // //  2nd attempt

// // import { Test, TestingModule } from '@nestjs/testing';
// // import { CustomersController } from './customers.controller';
// // import { CustomersService } from './customers.service';
// // import { JwtAuthGuard } from '../auth/auth.guard';
// // import { UpdateCustomerDto } from './dto/update-customer.dto';
// // import { NotFoundException } from '@nestjs/common';

// // describe('CustomersController', () => {
// //   let controller: CustomersController;
// //   let service: CustomersService;

// //   const mockCustomer = {
// //     id: 1,
// //     name: 'hari',
// //     email: 'hari@example.com',
// //     address: '123 Main St',
// //     mobile_number: '1234567890',
// //     password: 'Pass123',
// //     orders: [],
// //   };

// //   const mockCustomersService = {
// //     findAll: jest.fn().mockResolvedValue([mockCustomer]),
// //     findOneById: jest
// //       .fn()
// //       .mockImplementation((id) =>
// //         id === 1 ? Promise.resolve(mockCustomer) : Promise.resolve(null),
// //       ),
// //     update: jest.fn().mockImplementation(async (id, dto) => ({
// //       ...mockCustomer,
// //       ...dto,
// //       password: mockCustomer.password,
// //     })),
// //     delete: jest.fn().mockResolvedValue(mockCustomer),
// //   };

// //   beforeEach(async () => {
// //     const module: TestingModule = await Test.createTestingModule({
// //       controllers: [CustomersController],
// //       providers: [
// //         {
// //           provide: CustomersService,
// //           useValue: mockCustomersService,
// //         },
// //       ],
// //     })
// //       .overrideGuard(JwtAuthGuard)
// //       .useValue({ canActivate: jest.fn(() => true) })
// //       .compile();

// //     controller = module.get<CustomersController>(CustomersController);
// //     service = module.get<CustomersService>(CustomersService);
// //   });

// //   it('should be defined', () => {
// //     expect(controller).toBeDefined();
// //   });

// //   describe('findAll', () => {
// //     it('should return all customers', async () => {
// //       expect(await controller.findAll()).toEqual({
// //         statusCode: 200,
// //         data: [mockCustomer],
// //       });
// //     });
// //   });

// //   describe('findOne', () => {
// //     it('should return a customer by ID', async () => {
// //       expect(await controller.findone('1')).toEqual({
// //         statusCode: 200,
// //         data: mockCustomer,
// //       });
// //     });

// //     it('should return 404 if customer is not found', async () => {
// //       await expect(controller.findone('2')).resolves.toEqual({
// //         statusCode: 404,
// //         message: 'Customer not found',
// //       });
// //     });
// //   });

// //   describe('updateCustomer', () => {
// //     it('should update a customer', async () => {
// //       const dto: UpdateCustomerDto = { name: 'Updated Name' };

// //       jest.spyOn(service, 'update').mockImplementation(async () => ({
// //         ...mockCustomer,
// //         ...dto,
// //         password: mockCustomer.password, // Ensure password is included
// //       }));

// //       await expect(controller.updateCustomer('1', dto)).resolves.toEqual({
// //         statusCode: 201,
// //         message: 'Customer updated successfully',
// //         data: { ...mockCustomer, ...dto, password: mockCustomer.password },
// //       });
// //     });
// //   });

// //   describe('deleteCustomer', () => {
// //     it('should delete a customer', async () => {
// //       expect(await controller.deleteCustomer('1')).toEqual({
// //         statusCode: 200,
// //         message: 'Customer deleted successfully',
// //         data: mockCustomer,
// //       });
// //     });

// //     it('should return 404 if customer is not found', async () => {
// //       jest
// //         .spyOn(service, 'delete')
// //         .mockRejectedValue(
// //           new NotFoundException('Selected customer not found'),
// //         );

// //       await expect(controller.deleteCustomer('2')).rejects.toThrow(
// //         NotFoundException,
// //       );
// //     });
// //   });
// // });

// //

// // 3rd attempt

// import { Test, TestingModule } from '@nestjs/testing';
// import { CustomersController } from './customers.controller';
// import { CustomersService } from './customers.service';
// import { JwtAuthGuard } from '../auth/auth.guard';
// import { UpdateCustomerDto } from './dto/update-customer.dto';
// import { NotFoundException } from '@nestjs/common';

// describe('CustomersController', () => {
//   let controller: CustomersController;
//   let service: CustomersService;

//   const mockCustomer = {
//     id: 1,
//     name: 'hari',
//     email: 'hari@example.com',
//     address: '123 Main St',
//     mobile_number: '1234567890',
//     password: 'Pass123',
//     orders: [],
//   };

//   const mockCustomersService = {
//     findAll: jest.fn().mockResolvedValue([mockCustomer]),
//     findOneById: jest
//       .fn()
//       .mockImplementation((id) =>
//         id === 1 ? Promise.resolve(mockCustomer) : Promise.resolve(null),
//       ),
//     update: jest.fn().mockImplementation(async (id, dto) => ({
//       ...mockCustomer,
//       ...dto,
//       password: mockCustomer.password,
//     })),
//     delete: jest.fn().mockResolvedValue(mockCustomer),
//   };

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [CustomersController],
//       providers: [
//         {
//           provide: CustomersService,
//           useValue: mockCustomersService,
//         },
//       ],
//     })
//       .overrideGuard(JwtAuthGuard)
//       .useValue({ canActivate: jest.fn(() => true) })
//       .compile();

//     controller = module.get<CustomersController>(CustomersController);
//     service = module.get<CustomersService>(CustomersService);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });

//   describe('findAll', () => {
//     it('should return all customers', async () => {
//       expect(await controller.findAll()).toEqual({
//         statusCode: 200,
//         data: [mockCustomer],
//       });
//     });
//   });

//   describe('findOne', () => {
//     it('should return a customer by ID', async () => {
//       expect(await controller.findone('1')).toEqual({
//         statusCode: 200,
//         data: mockCustomer,
//       });
//     });

//     it('should return 404 if customer is not found', async () => {
//       await expect(controller.findone('2')).resolves.toEqual({
//         statusCode: 404,
//         message: 'Customer not found',
//       });
//     });
//   });

//   describe('updateCustomer', () => {
//     it('should update a customer', async () => {
//       const dto: UpdateCustomerDto = { name: 'Updated Name' };

//       jest.spyOn(service, 'update').mockImplementation(async () => ({
//         ...mockCustomer,
//         ...dto,
//         password: mockCustomer.password, // Ensure password is included
//       }));

//       const response = await controller.updateCustomer('1', dto);
//       expect(response).toEqual({
//         statusCode: 201,
//         message: 'Customer updated successfully',
//         data: { ...mockCustomer, ...dto, password: mockCustomer.password },
//       });
//     });
//   });

//   describe('deleteCustomer', () => {
//     it('should delete a customer', async () => {
//       expect(await controller.deleteCustomer('1')).toEqual({
//         statusCode: 200,
//         message: 'Customer deleted successfully',
//         data: mockCustomer,
//       });
//     });

//     it('should return 404 if customer is not found', async () => {
//       jest
//         .spyOn(service, 'delete')
//         .mockRejectedValue(
//           new NotFoundException('Selected customer not found'),
//         );

//       await expect(controller.deleteCustomer('2')).rejects.toThrow(
//         NotFoundException,
//       );
//     });
//   });
// });

//4th attempt

import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { NotFoundException } from '@nestjs/common';

describe('CustomersController', () => {
  let controller: CustomersController;
  let service: CustomersService;

  const mockCustomer = {
    id: 1,
    name: 'hari',
    email: 'hari@example.com',
    address: '123 Main St',
    mobile_number: '1234567890',
    password: 'Pass123',
    orders: [],
  };

  const mockCustomersService = {
    findAll: jest.fn().mockResolvedValue([mockCustomer]),
    findOneById: jest
      .fn()
      .mockImplementation((id) =>
        id === 1 ? Promise.resolve(mockCustomer) : Promise.resolve(null),
      ),
    update: jest.fn().mockImplementation(async (id, dto) => ({
      ...mockCustomer,
      ...dto,
      password: mockCustomer.password,
    })),
    delete: jest.fn().mockResolvedValue(mockCustomer),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [
        {
          provide: CustomersService,
          useValue: mockCustomersService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<CustomersController>(CustomersController);
    service = module.get<CustomersService>(CustomersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all customers', async () => {
      expect(await controller.findAll()).toEqual({
        statusCode: 200,
        data: [mockCustomer],
      });
    });
  });

  describe('findOne', () => {
    it('should return a customer by ID', async () => {
      expect(await controller.findone('1')).toEqual({
        statusCode: 200,
        data: mockCustomer,
      });
    });

    it('should return 404 if customer is not found', async () => {
      await expect(controller.findone('2')).resolves.toEqual({
        statusCode: 404,
        message: 'Customer not found',
      });
    });
  });

  describe('updateCustomer', () => {
    it('should update a customer', async () => {
      const dto: UpdateCustomerDto = { name: 'Updated Name' };

      jest.spyOn(service, 'update').mockImplementation(async () => ({
        ...mockCustomer,
        ...dto,
        password: mockCustomer.password, // Ensure password is included
      }));

      const response = await controller.updateCustomer('1', dto);
      expect(response).toEqual({
        statusCode: 201,
        message: 'Customer updated successfully',
        data: { ...mockCustomer, ...dto, password: mockCustomer.password },
      });
    });
  });

  describe('deleteCustomer', () => {
    it('should delete a customer', async () => {
      expect(await controller.deleteCustomer('1')).toEqual({
        statusCode: 200,
        message: 'Customer deleted successfully',
        data: mockCustomer,
      });
    });

    it('should return 404 if customer is not found', async () => {
      jest
        .spyOn(service, 'delete')
        .mockRejectedValue(
          new NotFoundException('Selected customer not found'),
        );

      await expect(controller.deleteCustomer('2')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
