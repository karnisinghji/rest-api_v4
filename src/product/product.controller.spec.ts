/* // import { Test, TestingModule } from '@nestjs/testing';
// import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';
// import { ProductController } from './product.controller';
// import { ProductService } from './product.service';
// //

// //

// //

// //

// //

// //

// //
// const mockProducts = [
//   { id: 1, name: 'Product A', price: 100, quantity: 10, orders: [] },
//   { id: 2, name: 'Product B', price: 200, quantity: 5, orders: [] },
// ];

// describe('ProductController', () => {
//   let controller: ProductController;
//   let service: ProductService;

//   const dto: CreateProductDto = {
//     name: 'Product A',
//     price: 100,
//     quantity: 10,
//   };

//   const mockProductService = {
//     create: jest.fn().mockResolvedValue({
//       id: 1,
//       ...dto,
//       orders: [],
//     }),

//     findAllProduct: jest.fn().mockResolvedValue(mockProducts),

//     findOne: jest.fn().mockImplementation((id: number) =>
//       Promise.resolve({
//         id,
//         name: 'Product A',
//         price: 100,
//         quantity: 10,
//         orders: [],
//       }),
//     ),

//     update: jest
//       .fn()
//       .mockImplementation((id: number, dto: UpdateProductDto) =>
//         Promise.resolve({ id, ...dto }),
//       ),

//     remove: jest.fn().mockResolvedValue({ deleted: true }),
//   };

//   beforeEach(async () => {
//     const moduleRef: TestingModule = await Test.createTestingModule({
//       controllers: [ProductController],
//       providers: [
//         {
//           provide: ProductService,
//           useValue: mockProductService, // ✅ Corrected
//         },
//       ],
//     }).compile();

//     controller = moduleRef.get<ProductController>(ProductController);
//     service = moduleRef.get<ProductService>(ProductService);
//   });

//   it('should be defined', async () => {
//     expect(controller).toBeDefined();
//   });

//   it('should create a product', async () => {
//     const result = await controller.createProduct(dto);

//     expect(result).toEqual({
//       statusCode: 201,
//       message: 'Product successfully created',
//       data: expect.objectContaining({
//         id: expect.any(Number),
//         name: dto.name,
//         price: dto.price,
//         quantity: dto.quantity,
//         orders: expect.any(Array),
//       }),
//     });
//     expect(service.create).toHaveBeenCalledWith(dto);
//   });

//   it('should return all products', async () => {
//     const result = await controller.getAllProducts(); //

//     expect(result).toEqual({
//       statusCode: 200,
//       message: 'Products list',
//       data: mockProducts,
//     });
//     expect(service.findAllProduct).toHaveBeenCalled();
//   });

//   it('should get a product by ID', async () => {
//     const result = await controller.findOne('1');

//     expect(result).toEqual({
//       statusCode: 200,
//       message: 'Product Detail',
//       data: { id: 1, name: 'Product A', price: 100, quantity: 10, orders: [] },
//     });
//     expect(service.findOne).toHaveBeenCalledWith(1);
//   });

//   it('should update a product', async () => {
//     const updateDto: UpdateProductDto = {
//       name: 'Updated Product',
//       price: 150,
//       quantity: 250,
//     };

//     const result = await controller.update('1', updateDto);

//     expect(result).toEqual({
//       statusCode: 200,
//       message: 'Product updated successfully',
//       data: { id: 1, ...updateDto },
//     });
//     expect(service.update).toHaveBeenCalledWith(1, updateDto);
//   });

//   it('should delete a product', async () => {
//     const result = await controller.deleteProduct('1');

//     expect(result).toEqual({
//       statusCode: 200,
//       message: 'Product deleted successfully',
//       data: { deleted: true },
//     });
//     expect(service.remove).toHaveBeenCalledWith(1);
//   });
// });

//

//
import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/auth.guard';

const mockProducts = [
  { id: 1, name: 'Product A', price: 100, quantity: 10 },
  { id: 2, name: 'Product B', price: 200, quantity: 5 },
];

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  const dto: CreateProductDto = {
    name: 'Product A',
    price: 100,
    quantity: 10,
  };

  const mockProductService = {
    create: jest.fn().mockResolvedValue({ id: 1, ...dto }),
    findAllProduct: jest.fn().mockResolvedValue(mockProducts),
    findOne: jest
      .fn()
      .mockImplementation((id: number) =>
        Promise.resolve(mockProducts.find((product) => product.id === id)),
      ),
    update: jest
      .fn()
      .mockImplementation((id: number, dto: UpdateProductDto) =>
        Promise.resolve({ id, ...dto }),
      ),
    remove: jest.fn().mockResolvedValue({ deleted: true }),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: mockProductService,
        },
      ],
    }).compile();

    controller = moduleRef.get<ProductController>(ProductController);
    service = moduleRef.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a product', async () => {
    const result = await controller.createProduct(dto);

    expect(result).toEqual({
      statusCode: 201,
      message: 'Product successfully created',
      data: expect.objectContaining({
        id: expect.any(Number),
        name: dto.name,
        price: dto.price,
        quantity: dto.quantity,
      }),
    });
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should return all products', async () => {
    const mockResponse: any = {
      json: jest.fn((data) => data),
      status: jest.fn().mockReturnThis(),
    };

    await controller.getAllProducts(mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      statusCode: 200,
      message: 'Products list',
      data: mockProducts,
    });
  });

  it('should return a single product', async () => {
    const result = await controller.findOne('1');

    expect(result).toEqual({
      statusCode: 200,
      message: 'Product Detail',
      data: mockProducts[0],
    });
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should update a product', async () => {
    const updateDto: UpdateProductDto = {
      name: 'Updated Product',
      price: 150,
      quantity: 250,
    };

    const result = await controller.update('1', updateDto);

    expect(result).toEqual({
      statusCode: 200,
      message: 'Product updated successfully',
      data: { id: 1, ...updateDto },
    });
    expect(service.update).toHaveBeenCalledWith(1, updateDto);
  });

  it('should delete a product', async () => {
    const result = await controller.deleteProduct('1');

    expect(result).toEqual({
      statusCode: 200,
      message: 'Product deleted successfully',
      data: { deleted: true },
    });
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
 */