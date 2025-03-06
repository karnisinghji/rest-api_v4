import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsInt } from 'class-validator';
import { OrderStatus } from 'src/orders/entities/order.entity';
import { CreateOrderDto } from './create-order.dto';






export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    
    
    @IsInt()
    quantity?: number;

    
    @IsEnum(OrderStatus, { message: 'Status must be one of pending, shipped, delivered, cancelled' })
    status : OrderStatus;


}
