import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  //creae product service

  async create(createProductDto: CreateProductDto) {
    const product = this.productRepo.create({
      ...createProductDto,
    });

    console.log('Creating product: ', product);

    return this.productRepo.save(product);
  }

  //

  //
  //
  //
  //
  //
  // read

  async findAllProduct(): Promise<Product[]> {
    const products = await this.productRepo.find();
    if (!products.length) throw new NotFoundException(`No products found`);
    //return products;
    return products;
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
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const updateResult = await this.productRepo.update(id, updateProductDto);
    if (updateResult.affected === 0) {
      throw new NotFoundException(`Product with #${id} not found`);
    }
    const updatedProduct = await this.productRepo.findOne({ where: { id } });
    if (!updatedProduct) {
      throw new NotFoundException(`Product with #${id} not found`);
    }
    return updatedProduct;
  }

  //

  //
  //
  //
  //
  //

  //delete
  async remove(id: number): Promise<{ deleted: boolean }> {
    const result = await this.productRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return { deleted: true };
  }

  //

  //
  //
  //
  //
  //
  //find by id

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }
}
