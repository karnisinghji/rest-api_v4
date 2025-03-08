import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
  ) {}

  //create Customer
  async createCustomer(createCustomerDto: CreateCustomerDto) {
    const existingCustomer = await this.findByEmail(createCustomerDto.email);
    if (existingCustomer) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(createCustomerDto.password, 10);

    const customer = this.customerRepo.create({
      ...createCustomerDto,
      password: hashedPassword,
    });
    return this.customerRepo.save(customer);
  }

  //read all customer

  async findAll(): Promise<Customer[]> {
    return await this.customerRepo.find();
  }

  //

  //
  //
  //
  //
  //
  //update
  async update(
    id: number,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    if (!id || isNaN(id)) {
      throw new BadRequestException('Invalid customer ID');
    }
    await this.customerRepo.update(id, updateCustomerDto);
    const updatedCustomer = await this.customerRepo.findOne({ where: { id } });
    console.log('updatedCustomer', updatedCustomer);

    if (!updatedCustomer) {
      throw new NotFoundException(`Customer with id ${id} not found`);
    }
    return updatedCustomer;
  }

  //delete

  //*css*/

  //

  async delete(id: number): Promise<void> {
    const res = await this.customerRepo.delete({ id });
    if (res.affected === 0)
      throw new NotFoundException(`Customer with ID ${id} not found`);
  }

  //

  //
  //
  //
  //
  //
  //find by id
  async findOneById(id: number): Promise<Customer> {
    const customer = await this.customerRepo.findOne({ where: { id } });
    if (!customer)
      throw new NotFoundException(`Customer with ID ${id} not found`);
    return customer;
  }

  //
  //

  //

  //

  //
  async findByEmail(email: string): Promise<Customer | undefined> {
    //: Promise<Customer | undefined>
    const customer = await this.customerRepo.findOne({ where: { email } });
    return customer ?? undefined; // Convert null to undefined
  }

  //*css*/`

  //*css*/`
  //*css*/`

  async validateCustomer(
    email: string,
    pass: string,
  ): Promise<Customer | null> {
    const customer = await this.findByEmail(email);
    if (customer && (await bcrypt.compare(pass, customer.password))) {
      return customer;
    }
    return null;
  }
}
