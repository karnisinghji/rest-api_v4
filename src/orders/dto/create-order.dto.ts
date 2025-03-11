import { ArrayMinSize, ArrayNotEmpty, IsArray, IsEnum, IsInt, IsNotEmpty, IsNumber } from 'class-validator';
import { OrderStatus } from '../entities/order.entity';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  customerId: number;


  @IsArray()
  @ArrayNotEmpty()
  //@ArrayMinSize(1)
  @IsInt({each: true})
  @Type(() => Number)
  //@IsNumber({}, { each: true })
  productId: number;

  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  quantity: number;

  @IsEnum(OrderStatus)
  status: OrderStatus;
}
