import { Test, TestingModule } from '@nestjs/testing';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from './entities/order.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
//

//
//
//
//

// Mock OrdersService
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

    controller = module.get<OrdersController>(OrdersController); // Ensure controller is initialized
    service = module.get<OrdersService>(OrdersService);
  });

  it('should create an order', async () => {
    const mockOrder: CreateOrderDto = {
      customerId: 1,
      productId: 1,
      quantity: 2,
      status: OrderStatus.PENDING,
    };

    const mockCreatedOrder = {
      id: 1,
      ...mockOrder,
    };

    (service.createOrder as jest.Mock).mockResolvedValue(mockCreatedOrder);

    const result = await controller.createOrder(mockOrder); // Use initialized `controller`

    expect(result).toEqual(
      expect.objectContaining({
        statusCode: 201,
        message: 'Order created successfully',
        data: expect.objectContaining({
          id: expect.any(Number),
          customerId: 1,
          productId: 1,
          quantity: 2,
          status: OrderStatus.PENDING,
        }),
      }),
    );
  });
});
