import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { OrderStatus } from '../entities/order.entity';

export class CreateOrderDto {
  @IsInt()
  @IsNotEmpty()
  customerId: number;

  @IsInt()
  @IsNotEmpty()
  productId: number;

  @IsInt()
  @IsNotEmpty()
  quantity: number;

  @IsEnum(OrderStatus)
  status: OrderStatus;
}
