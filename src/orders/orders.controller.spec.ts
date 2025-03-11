import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderStatus } from './entities/order.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
//
//

//
//
//
//
// Mock OrderService
const mockOrdersService = {
  createOrder: jest.fn(),
  updateOrder: jest.fn(),
  updateOrderStatus: jest.fn(),
  findAllOrder: jest.fn(),
  findOrderByStatus: jest.fn(),
  remove: jest.fn(),
};

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [{ provide: OrdersService, useValue: mockOrdersService }],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    service = module.get<OrdersService>(OrdersService);
  });

  it('should create an order', async () => {
    const mockOrder: CreateOrderDto = {
      customerId: 1,
      productId: 1, // Changed from productIds to productId
      quantity: 2, //  Added quantity field
      status: OrderStatus.PENDING, // Added status field
    };
    const mockCreatedOrder = {
      id: 1,
      ...mockOrder,
    };
    (service.createOrder as jest.Mock).mockResolvedValue(mockCreatedOrder);

    const result = await controller.createOrder(mockOrder);
    expect(result).toEqual({
      statusCode: 201,
      message: 'Order created successfully',
      data: expect.objectContaining({
        id: expect.any(Number),
        customerId: 1,
        productId: 1,
        quantity: 2,
        status: OrderStatus.PENDING,
      }),
    });
  });

  it('should update an order', async () => {
    const dto: UpdateOrderDto = {
      quantity: 2,
      status: OrderStatus.PENDING,
    };
    const mockUpdatedOrder = {
      id: 1,
      quantity: 2,
      status: OrderStatus.PENDING,
    };
    (service.updateOrder as jest.Mock).mockResolvedValue(mockUpdatedOrder);
    const result = await controller.updateOrder(1, dto);
    expect(result).toEqual({
      statusCode: 200,
      message: 'Order  updated successfully',
      data: mockUpdatedOrder,
    });
  });

  it('should update order status', async () => {
    const dto: UpdateOrderDto = { status: OrderStatus.SHIPPED };
    const mockUpdatedOrder = { id: 1, status: OrderStatus.SHIPPED };
    (service.updateOrderStatus as jest.Mock).mockResolvedValue(
      mockUpdatedOrder,
    );

    const result = await controller.updateOrderStatus(1, dto);
    expect(result).toEqual({
      statusCode: 200,
      message: 'Order status updated successfully',
      data: mockUpdatedOrder,
    });
  });

  it('should return all orders', async () => {
    const mockOrders = [{ id: 1 }, { id: 2 }];
    (service.findAllOrder as jest.Mock).mockResolvedValue(mockOrders);
    const result = await controller.findAllOrder();
    expect(result).toEqual({ statusCode: 200, data: mockOrders });
  });

  it('should return orders by status', async () => {
    const mockOrders = [{ id: 1, status: OrderStatus.PENDING }];
    (service.findOrderByStatus as jest.Mock).mockResolvedValue(mockOrders);
    const result = await controller.getOrdersByStatus(OrderStatus.PENDING);
    expect(result).toEqual(mockOrders);
  });

  it('should throw NotFoundException if no orders found by status', async () => {
    (service.findOrderByStatus as jest.Mock).mockResolvedValue([]);
    await expect(
      controller.getOrdersByStatus(OrderStatus.PENDING),
    ).rejects.toThrow(NotFoundException);
  });

  it('should delete an order', async () => {
    (service.remove as jest.Mock).mockResolvedValue({ deleted: true });
    const result = await controller.remove('1');
    expect(result).toEqual({ deleted: true });
  });
});
