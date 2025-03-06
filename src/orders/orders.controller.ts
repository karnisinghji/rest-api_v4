import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderStatus } from './entities/order.entity';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}



// to create a new order
    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new ValidationPipe({transform: true}))
    async createOrder(@Body() createOrderDto  :CreateOrderDto){
      const order = await this.ordersService.createOrder(createOrderDto);
      return {statucCode : HttpStatus.CREATED, message : 'Order created successfully', data :order};
    }



        @Patch(":id")

    //@Patch(":id/status")
    @HttpCode(HttpStatus.OK)
    async updateOrderStatus(@Param("id") id: number, @Body() updateOrderDto: UpdateOrderDto){
      const updatedOrder = await this.ordersService.updateOrderStatus(id, updateOrderDto.status);
      return {statusCode : HttpStatus.OK, message:'Order status updated successfully', data: updatedOrder};
    }


    
    //by status

    @Get("/status")
    @HttpCode(HttpStatus.OK) // 200 OK
    async findAll(@Query('status')status ?:OrderStatus) {
    const orders= await this.ordersService.findAllOrder();

    return {statusCode : HttpStatus.OK, data: orders};
  }


 // find all orders 

  @Get("/")
  @HttpCode(HttpStatus.OK) // 200 OK
  async findAllOrder() {
  const orders= await this.ordersService.findAllOrder();
if(orders !=null){
        return { statusCode: HttpStatus.OK, data: orders };

  }else{
      return { statusCode: HttpStatus.NOT_FOUND, message: 'Customer not found' }; //  404 Not Found

  }

  

 }




  


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
