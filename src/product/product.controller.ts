import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

@Post('/create')
@HttpCode(HttpStatus.CREATED)
@UsePipes(new ValidationPipe({transform : true}))
  async createProduct(@Body() createProductDto: CreateProductDto) {
    const product = this.productService.create(createProductDto);
    return  {statusCode :HttpStatus.CREATED, message :'Product sucessfully created', data : product};
  } 

/*   async createProduct(data: { name: string; price: number }){
    return this.productService.create(data);
  } */





  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
