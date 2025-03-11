// // import { Test, TestingModule } from '@nestjs/testing';
// // import { Repository } from 'typeorm';
// // import { CreateProductDto } from './dto/create-product.dto';
// // import { Product } from './entities/product.entity';
// // import { ProductController } from './product.controller';
// // import { ProductService } from './product.service';
// // //

// // //
// // type MockType<T> = {
// //   [P in keyof T]?: jest.Mock<any, any>;
// // };

// // //
// // const mockProductRepository: MockType<Repository<Product>> = {
// //   create: jest.fn(),
// //   save: jest.fn(),
// //   find: jest.fn(),
// //   findOne: jest.fn(),
// //   update: jest.fn(),
// //   remove: jest.fn(),
// // };
// // //

// // //

// // //
// // //
// // const mockProducts: Product[] = [
// //   { id: 1, name: 'myProduct', price: 100, quantity: 10, orders: [] },
// //   { id: 2, name: 'Product B', price: 200, quantity: 5, orders: [] },
// // ];

// // //
// // describe('ProductController', () => {
// //   let controller: ProductController;
// //   let service: ProductService;

// //   beforeEach(async () => {
// //     const module: TestingModule = await Test.createTestingModule({
// //       controllers: [ProductController],
// //       providers: [
// //         {
// //           provide: ProductService,
// //           useValue: {
// //             create: jest.fn(),
// //             findAllProduct: jest.fn().mockResolvedValue(mockProducts),
// //             findOne: jest.fn(),
// //             update: jest.fn(),
// //             remove: jest.fn(),
// //           },
// //         },
// //       ],
// //     }).compile();

// //     controller = module.get<ProductController>(ProductController);
// //     service = module.get<ProductService>(ProductService);
// //   });

// //   it('should create a product', async () => {
// //     const dto: CreateProductDto = {
// //       name: 'Product A',
// //       price: 100,
// //       quantity: 10,
// //     }; //

// //     jest.spyOn(service, 'create').mockResolvedValue({
// //       id: 1,
// //       ...dto,
// //       orders: [],
// //     } as Product);

// //     const result = await controller.createProduct(dto);

// //     expect(result).toEqual({
// //       statusCode: 201,
// //       message: 'Product successfully created',
// //       data: {
// //         id: 1,
// //         ...dto,
// //       },
// //     });
// //   });

// //   //
// //   //

// //   it(`should return a list of products`, async () => {
// //     const result = await controller.getAllProducts();
// //     expect(result).toEqual({
// //       statusCode: 200,
// //       message: 'Products retrieved successfully',
// //       data: mockProducts,
// //     });
// //   });
// // });

// //*css*/`

// //
// import { Test, TestingModule } from '@nestjs/testing';
// import { Repository } from 'typeorm';
// import { Product } from './entities/product.entity';
// import { ProductController } from './product.controller';
// import { ProductService } from './product.service';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';

// // Mock Type for Repository
// type MockType<T> = {
//   [P in keyof T]?: jest.Mock<any, any>;
// };

// // Mock Repository Implementation
// const mockProductRepository: MockType<Repository<Product>> = {
//   create: jest.fn(),
//   save: jest.fn(),
//   find: jest.fn(),
//   findOne: jest.fn(),
//   update: jest.fn(),
//   remove: jest.fn(),
// };

// describe('ProductController', () => {
//   let controller: ProductController;
//   let service: ProductService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [ProductController],
//       providers: [
//         ProductService,
//         {
//           provide: getRepositoryToken(Product),
//           useValue: mockProductRepository,
//         },
//       ],
//     }).compile();

//     controller = module.get<ProductController>(ProductController);
//     service = module.get<ProductService>(ProductService);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });

//   it('should create a product', async () => {
//     const dto: CreateProductDto = {
//       name: 'Test Product',
//       price: 100,
//       quantity: 10,
//     };

//     mockProductRepository.save.mockResolvedValue({
//       id: 1,
//       name: dto.name,
//       price: dto.price,
//       quantity: dto.quantity,
//     });

//     const result = await controller.createProduct(dto);

//     expect(result).toEqual({
//       statusCode: 201,
//       message: 'Product successfully created',
//       data: {
//         id: 1,
//         ...dto,
//       },
//     });

//     expect(mockProductRepository.save).toHaveBeenCalledWith(dto);
//   });

//   it('should return a list of products', async () => {
//     const mockProducts = [
//       { id: 1, name: 'Product 1', description: 'Desc 1', price: 100 },
//       { id: 2, name: 'Product 2', description: 'Desc 2', price: 200 },
//     ];

//     mockProductRepository.find.mockResolvedValue(mockProducts);

//     const result = await controller.getAllProducts();

//     expect(result).toEqual({
//       statusCode: 200,
//       message: 'Products retrieved successfully',
//       data: mockProducts,
//     });

//     expect(mockProductRepository.find).toHaveBeenCalled();
//   });

//   it('should return a single product', async () => {
//     const mockProduct = {
//       id: 1,
//       name: 'Product 1',
//       description: 'Desc 1',
//       price: 100,
//     };

//     mockProductRepository.findOne.mockResolvedValue(mockProduct);

//     const result = await controller.getProductById(1);

//     expect(result).toEqual({
//       statusCode: 200,
//       message: 'Product retrieved successfully',
//       data: mockProduct,
//     });

//     expect(mockProductRepository.findOne).toHaveBeenCalledWith({
//       where: { id: 1 },
//     });
//   });

//   it('should update a product', async () => {
//     const updateDto: UpdateProductDto = { name: 'Updated Product', price: 150 };

//     mockProductRepository.update.mockResolvedValue({ affected: 1 });

//     const result = await controller.updateProduct(1, updateDto);

//     expect(result).toEqual({
//       statusCode: 200,
//       message: 'Product updated successfully',
//     });

//     expect(mockProductRepository.update).toHaveBeenCalledWith(1, updateDto);
//   });

//   it('should delete a product', async () => {
//     mockProductRepository.remove.mockResolvedValue({ id: 1 });

//     const result = await controller.deleteProduct(1);

//     expect(result).toEqual({
//       statusCode: 200,
//       message: 'Product deleted successfully',
//     });

//     expect(mockProductRepository.remove).toHaveBeenCalled();
//   });
// });

//

//

//
import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { NotFoundException } from '@nestjs/common';

// Mock Repository Type
import { ObjectLiteral, Repository } from 'typeorm';

type MockRepository<T extends ObjectLiteral> = Partial<
  Record<keyof Repository<T>, jest.Mock>
>;

describe('ProductService', () => {
  let service: ProductService;
  let productRepository: MockRepository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    productRepository = module.get(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a product', async () => {
    const dto: CreateProductDto = {
      name: 'Test Product',
      price: 100,
      quantity: 10,
    };
    const product: Product = { id: 1, ...dto } as Product;

    productRepository.create?.mockReturnValue(product);
    productRepository.save?.mockResolvedValue(product);

    const result = await service.create(dto);
    expect(result).toEqual(product);
    expect(productRepository.create).toHaveBeenCalledWith(dto);
    expect(productRepository.save).toHaveBeenCalledWith(product);
  });

  it('should return all products', async () => {
    const mockProducts: Product[] = [
      { id: 1, name: 'Product A', price: 100, quantity: 10 } as Product,
      { id: 2, name: 'Product B', price: 200, quantity: 5 } as Product,
    ];

    productRepository.find?.mockResolvedValue(mockProducts);
    const result = await service.findAllProduct();

    expect(result).toEqual(mockProducts);
    expect(productRepository.find).toHaveBeenCalled();
  });

  it('should return a product by ID', async () => {
    const product: Product = {
      id: 1,
      name: 'Product A',
      price: 100,
      quantity: 10,
    } as Product;
    productRepository.findOne?.mockResolvedValue(product);

    const result = await service.findOne(1);
    expect(result).toEqual(product);
    expect(productRepository.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it('should throw NotFoundException if product is not found', async () => {
    productRepository.findOne?.mockResolvedValue(null);
    await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
  });

  it('should update a product', async () => {
    const updateDto: UpdateProductDto = { name: 'Updated Product', price: 150 };
    const updatedProduct: Product = { id: 1, ...updateDto } as Product;

    productRepository.update?.mockResolvedValue({ affected: 1 });
    productRepository.findOne?.mockResolvedValue(updatedProduct);

    const result = await service.update(1, updateDto);
    expect(result).toEqual(updatedProduct);
    expect(productRepository.update).toHaveBeenCalledWith(1, updateDto);
  });

  it('should throw NotFoundException if updating a non-existing product', async () => {
    productRepository.update?.mockResolvedValue({ affected: 0 });
    await expect(
      service.update(1, { name: 'New Name' } as UpdateProductDto),
    ).rejects.toThrow(NotFoundException);
  });

  it('should delete a product', async () => {
    productRepository.delete?.mockResolvedValue({ affected: 1 });
    await expect(service.remove(1)).resolves.toEqual({ deleted: true });
  });

  it('should throw NotFoundException if deleting a non-existing product', async () => {
    productRepository.delete?.mockResolvedValue({ affected: 0 });
    await expect(service.remove(1)).rejects.toThrow(NotFoundException);
  });
});
