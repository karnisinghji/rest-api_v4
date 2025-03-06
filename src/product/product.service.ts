import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product)
    private readonly productRepo : Repository<Product>){}



 //creae product service

async create(createProductDto : CreateProductDto){
  const product = this.productRepo.create({
    ...createProductDto});

      console.log('product: ', product);

  return this.productRepo.save(product);
}
    



// read

  async findAll() : Promise<Product[]> {
    return this.productRepo.find();
  }


    //update

async update(id : number, updateProductDto: UpdateProductDto): Promise<Product> {
  await this.productRepo.update(id, updateProductDto); // This does not return the updated entity
     // await  this.productRepo.update(id, updateProductDto);
      const updatedProduct = await this.productRepo.findOne({where :{id}});
      if(!updatedProduct){
        throw new NotFoundException(`Product with #${id} not found`);
      }
      return updatedProduct;
  }



//delete
 async remove(id: number): Promise<void> {
  const result = await this.productRepo.delete(id);
  if(result.affected == 0) throw new NotFoundException(`Product with ID ${id} not found`);
    
  }


   async findOne(id: number):Promise<Product> {
    const product = await this.productRepo.findOne({where:{id}});
          if (!product) throw new NotFoundException(`Customer with ID ${id} not found`);
      return product;
  }

  

 
}
