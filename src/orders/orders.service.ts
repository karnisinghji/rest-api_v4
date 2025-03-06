import { Injectable, NotFoundException } from '@nestjs/common';
//import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/customers/entities/customer.entity';
import { Product } from 'src/product/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderStatus } from './entities/order.entity';
@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
    @InjectRepository(Customer) private readonly customerRepo: Repository<Customer>,
    @InjectRepository(Product) private readonly productRepo: Repository<Product>,
  ){}
  
  

    // Find customer and product in the database

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const {customerId ,productId ,quantity, status} = createOrderDto;

      // Fetch customer and product from DB
    const customer = await this.customerRepo.findOne({where :{id : customerId}});
    const product = await this.productRepo.findOne({where :{id : productId}});

     // Debugging logs
  console.log('Customer:', customer);
  console.log('Product:', product);

    if(!customer || !product){
            throw new NotFoundException('Customer or Product not found');

    }
     const order = this.orderRepo.create({
      customer,
      product,
      quantity,
      status,
     });

    return await this.orderRepo.save(order);
  }
  



async findAllOrder(): Promise<Order[]>{
    return await this.orderRepo.find({ relations: ['customer', 'product'] });
}








  async updateOrder(id: number, updateOrderDto: UpdateOrderDto) :Promise<Order> {
    await this.findOne(id);
    await this.orderRepo.update(id,updateOrderDto);
    return  this.findOne(id);

    
  }




  async remove(id: number) {
    const result = await this.orderRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Customer with ID ${id} not found`);
    return "Customer '$id' sucessfully deleted";
  }





//update order Status
  async updateOrderStatus(id: number, status: OrderStatus) {
    const order = await this.orderRepo.findOne({where:{id}})
    if(!order){
      throw new NotFoundException('Order with Id ${id} not found');
    }
    order.status = status;
    return await this.orderRepo.save(order);
  }



// find order by status
async findOrderByStatus(status ?: OrderStatus) {
const whereCondition = status ? {status } : {};
return await this.orderRepo.find({where : whereCondition});
}



async findOne (id : number) : Promise<Order>{
  const order =  await this.orderRepo.findOne({where :{id},relations: ['customer', 'product']});
  if(!order) throw new NotFoundException(`Order with ID ${id} not found`);
  return order;
}


}
