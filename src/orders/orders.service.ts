import { Injectable, NotFoundException } from '@nestjs/common';
//import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Customer } from '../customers/entities/customer.entity';
import { Product } from '../product/entities/product.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderStatus } from './entities/order.entity';
@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}
  //
  //
  //
  //

  //
  //
  // Find customer and product in the database

  /* async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const { customerId, productId, quantity, status } = createOrderDto;

    // Fetch customer and product from DB
    const customer = await this.customerRepo.findOne({
      where: { id: customerId },
    });
    const products = await this.productRepo.findOne({
      where: { id: productId },
    });

    if (!customer || !products) {
      throw new NotFoundException('Customer or Product not found');
    }
    const order = this.orderRepo.create({
      customer,
      products,
      quantity,
      status,
    });

    return await this.orderRepo.save(order);
  } */
  //
  async createOrder(customerId: number, productIds: number[], quantity: number): Promise<Order> {
    // Fetch the customer
    const customer = await this.customerRepo.findOne({ where: { id: customerId } });
    if (!customer) {
      throw new Error('Customer not found');
    }
  
    const products = await this.productRepo.find({
      where: { id: In(productIds.map(Number)) }, 
    });
        if (products.length== 0) {
      throw new Error('No products found');
    }
  
    // Create the order object
    const order = this.orderRepo.create({
      customer,   //  Ensure this is correctly passed
      products,   // Pass an array of products
      quantity,
      status: OrderStatus.PENDING,
    });
  
    // Save the order and return it
    return await this.orderRepo.save(order); // order` should be a single object, not an array
  }
  

  //
  //
  //

  //
  //
  async findAllOrder(): Promise<Order[]> {
    return await this.orderRepo.find({ relations: ['customer', 'products'] });
  }

  //
  //
  //
  //

  //
  //
  async updateOrder(
    id: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    await this.findOne(id);
    await this.orderRepo.update(id, updateOrderDto);
    return this.findOne(id);
  }
  //
  //
  //
  //

  //
  //
  async remove(id: number) {
    const result = await this.orderRepo.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`Order with ID ${id} not found`);

    return `Order ${id} sucessfully deleted`;
  }
  //
  //
  //
  //

  //
  //

  //update order Status
  async updateOrderStatus(id: number, status: OrderStatus) {
    const order = await this.orderRepo.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order with Id ${id} not found`);
    }
    order.status = status;
    return await this.orderRepo.save(order);
  }
  //
  //
  //
  //

  //
  //
  // find order by status
  async findOrderByStatus(status?: OrderStatus) {
    const whereCondition = status ? { status: status as OrderStatus } : {};
    console.log('Filtering order with', whereCondition);
    return await this.orderRepo.find({ where: whereCondition });
  }




  //


  //
  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['customer', 'products'],
    });
    if (!order) throw new NotFoundException(`Order with ID ${id} not found`);
    return order;
  }
}
