import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';

@Controller('product')
@UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  //

  //

  //
  //
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ transform: true }))
  async createProduct(@Body() createProductDto: CreateProductDto) {
    const product = this.productService.create(createProductDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Product sucessfully created',
      data: product,
    };
  }
  //

  //

  //
  //
  // get all products list
  @Get()
  @HttpCode(HttpStatus.OK) //  200 OK
  @UsePipes(new ValidationPipe({ transform: true }))
  async getAllProducts(@Res() res: Response) {
    const products = await this.productService.findAllProduct();

    if (!products || products.length === 0) {
      return res.status(HttpStatus.NOT_FOUND).json({
        statusCode: 404,
        message: 'No products found',
        data: [],
      });
    }

    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      message: 'Products list',
      data: products,
    });
  }

  //

  //

  //
  //
  // search any product by id
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true })) //Enables validation
  async findOne(@Param('id') id: string) {
    const product = await this.productService.findOne(+id);
    if (!product) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Product not found',
      }; //  404 Not Found
    }
    return {
      statusCode: HttpStatus.FOUND,
      message: 'Product Detail',
      data: product,
    };
  }

  // update any product details by id
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const product = this.productService.update(+id, updateProductDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Product updated successfully',
      data: product,
    };
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    const deletedProduct = this.productService.remove(+id);
    if (!this.deleteProduct) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Selected product not found ',
      }; //
    }
    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: 'Product deleted successfully',
      data: deletedProduct,
    };
  }
}
