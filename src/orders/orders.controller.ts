import {
  ArgumentMetadata,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Injectable,
  NotFoundException,
  Param,
  ParseEnumPipe,
  Patch,
  PipeTransform,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth,ApiOperation  } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth.guard';
import { Order, OrderStatus } from '../orders/entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersService } from './orders.service';









@Controller('orders')
@ApiBearerAuth()        //Adds Swagger authentication button
@UseGuards(JwtAuthGuard)
export 
class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  //

  //
    //by status

    /* @Get("/allStatus")
    @UsePipes(new ValidationPipe({ transform: true }))
    //@ApiOperation({summary: 'Get all order status with order list(find by status query)'})
    @HttpCode(HttpStatus.OK) // 200 OK
    async findAll(@Query('status') status?: OrderStatus) {
      const orders = await this.ordersService.findAllOrder();
  
      return { statusCode: HttpStatus.OK, data: orders };
    }
   */
    //
  
    //
    //
    //
    //
    //
    // search by status
    @Get('/status')
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiOperation({ summary: 'filtered order by status' })
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
  
    @Get()
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiOperation({ summary: 'All Order with detail' })
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
  // to create a new order
  @Post()    
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Create order, productId is array,status= pending(defauls)'})
  @HttpCode(HttpStatus.CREATED)
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    const { customerId, productId, quantity } = createOrderDto; //

    const order = await this.ordersService.createOrder(customerId, [productId], quantity);
    console.log('Received data:', customerId, productId, quantity);

    return {
      statusCode: HttpStatus.CREATED,
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
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Update Order using by Id(status and quantity))'})
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
  //  status can we updated here

  @Patch(':id/status')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Status can updated using Id'})
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

  //

  //

  //

  //

  //

  @Delete(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Deleted order using Id'})
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
