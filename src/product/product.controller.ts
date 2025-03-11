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
  ValidationPipe
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';


//
@ApiBearerAuth()        //Adds Swagger authentication button
@Controller('product')
@UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  //

  //
  //
  // get all products list
  @Get()
  @HttpCode(HttpStatus.OK) //  200 OK
  @ApiOperation({summary: 'Get all product related detail'})
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
// search any product by id
@Get(':id')
@HttpCode(HttpStatus.OK)
@ApiOperation({summary: 'Product  detail by Id'})
@UsePipes(new ValidationPipe({ transform: true }))async findOne(@Param('id') id: string) {
  const product = await this.productService.findOne(+id);
  if (!product) {
    return {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Product not found',
    }; //  404 Not Found
  }
  return {
    statusCode: HttpStatus.OK,
    message: 'Product Detail',
    data: product,
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
  @Post()
  @ApiOperation({summary: 'Create Product'})
  @UsePipes(new ValidationPipe({ transform: true }))
  @HttpCode(HttpStatus.CREATED)
  async createProduct(@Body() createProductDto: CreateProductDto) {
    const product = await this.productService.create(createProductDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Product successfully created',
      data: product,
    };
  }

  //

  //
  // update any product details by id
  @Patch(':id')
@ApiOperation({summary: 'Update by Id'})
@UsePipes(new ValidationPipe({ transform: true }))
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const product = await this.productService.update(+id, updateProductDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Product updated successfully',
      data: product,
    };
  }

  @Delete(':id')

@ApiOperation({summary: 'Delete by Id'})
@UsePipes(new ValidationPipe({ transform: true }))
  async deleteProduct(@Param('id') id: string) {
    const deletedProduct = await this.productService.remove(+id);
    if (!deletedProduct.deleted) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Selected product not found ',
      }; //
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Product deleted successfully',
      data: deletedProduct,
    };
  }
}
