import { Injectable } from '@nestjs/common';
import { Order } from '@/orders/entities/order.entity';

@Injectable()
export class OrderRepository {
  async save(order: Order): Promise<Order> {
    // Mock implementation
    return { ...order, id: Math.floor(Math.random() * 1000) };
  }

  async findAll(): Promise<Order[]> {
    return [];
  }
}
