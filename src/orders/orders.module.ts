import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/customers/entities/customer.entity';
import { Product } from 'src/product/entities/product.entity';
import { Order } from './entities/order.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports : [TypeOrmModule.forFeature([Order,Customer,Product])],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports : [OrdersService],
})
export class OrdersModule {}
