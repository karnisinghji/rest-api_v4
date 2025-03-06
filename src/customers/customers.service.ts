import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';


@Injectable()
export class CustomersService {

  constructor(@InjectRepository(Customer) private readonly customerRepo: Repository<Customer>) { }



  //constructor(private prisma : PrismaService){}
/* async createCustomer(data: { name: string; address: string ; mobile_number:string; email : string; password : string }) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.customer.create({
      data:{
        ...data,
            password: hashedPassword, 
    }});
  } */






    //create Customer
async createCustomer(createCustomerDto :CreateCustomerDto){
  const hashedPassword = await bcrypt.hash(createCustomerDto.password, 10);
  const customer = this.customerRepo.create({
    ...createCustomerDto,
    password : hashedPassword,
  });
  return this.customerRepo.save(customer);
}



    //read all customer

async findAll():Promise<Customer[]> {
    return await this.customerRepo.find();
}




//update
 async update(id: number, updateCustomerDto: UpdateCustomerDto):Promise<Customer>{
/*   await this.findOne(id);
  await this.customerRepo.update(id,updateCustomerDto);
  return this.findOne(id); */
  if(!id ||isNaN(id)){
        throw new BadRequestException('Invalid customer ID');

  }
  await this.customerRepo.update(id,updateCustomerDto);
  const updatedCustomer = await this.customerRepo.findOne({where :{id}});
      console.log("updatedCustomer",updatedCustomer)

  if(!updatedCustomer){
    throw new NotFoundException(`Customer with id ${id} not found`);
  }
  return updatedCustomer;
  }

 
  
  //delete

  async delete(id: number) {
    const res = await this.customerRepo.delete(id);
    if(res.affected === 0) throw new NotFoundException(`Customer with ID ${id} not found`);

  }


  async findOne(id: number) : Promise<Customer> {
      const customer = await this.customerRepo.findOne({where:{id}});
      if (!customer) throw new NotFoundException(`Customer with ID ${id} not found`);
      return customer;
  }

}
