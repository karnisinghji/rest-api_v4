import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseEnumPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderStatus } from './entities/order.entity';
import { OrdersService } from './orders.service';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  //

  //
  //
  //
  //
  //
  // to create a new order
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ transform: true }))
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    const order = await this.ordersService.createOrder(createOrderDto);
    return {
      statucCode: HttpStatus.CREATED,
      message: 'Order created successfully',
      data: order,
    };
  }

  //

  //
  //
  //
  //
  //
  //  quantity and status can be passed as query parameters
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateOrder(
    @Param('id') id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    const updatedOrder = await this.ordersService.updateOrder(
      id,
      updateOrderDto,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Order  updated successfully',
      data: updatedOrder,
    };
  }

  //

  //
  //
  //
  //
  //
  //  status can we updated here

  @Patch(':id/status')
  @HttpCode(HttpStatus.OK)
  async updateOrderStatus(
    @Param('id') id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    const updatedOrder = await this.ordersService.updateOrderStatus(
      id,
      updateOrderDto.status,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Order status updated successfully',
      data: updatedOrder,
    };
  }

  //

  //
  //
  //
  //
  //
  //by status

  @Get('allstatus')
  @HttpCode(HttpStatus.OK) // 200 OK
  async findAll(@Query('status') status?: OrderStatus) {
    const orders = await this.ordersService.findAllOrder();

    return { statusCode: HttpStatus.OK, data: orders };
  }

  //

  //
  //
  //
  //
  //
  // search by status
  @Get('/status')
  async getOrdersByStatus(
    @Query('status', new ParseEnumPipe(OrderStatus)) status?: OrderStatus,
  ): Promise<Order[]> {
    const orders = await this.ordersService.findOrderByStatus(status);

    if (!orders.length) {
      throw new NotFoundException(
        `No orders found with status '${status || 'all'}'`,
      );
    }

    return orders;
  }

  //

  //

  //

  //

  //
  // find all orders

  @Get('/')
  @HttpCode(HttpStatus.OK) // 200 OK
  async findAllOrder() {
    const orders = await this.ordersService.findAllOrder();
    if (orders != null) {
      return { statusCode: HttpStatus.OK, data: orders };
    } else {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Order not found',
      }; //  404 Not Found
    }
  }

  //

  //

  //

  //

  //

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
