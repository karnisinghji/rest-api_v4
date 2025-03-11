import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';
import { CustomersService } from './customers.service';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';



@ApiBearerAuth()        //Adds Swagger authentication button
@Controller('customers')
@UseGuards(JwtAuthGuard)
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  /* @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ transform: true })) //Enables validation
  async createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    const customer =
      await this.customersService.createCustomer(createCustomerDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Customer created successfully',
      data: customer,
    };
  }
 */

  //

  
  //
  @Get()
  @ApiOperation({ summary: 'Get all customers profile' })
  @HttpCode(HttpStatus.OK) //  200 OK
  @UsePipes(new ValidationPipe({ transform: true })) //Enables validation
  async findAll() {
    const customer = await this.customersService.findAll();
    return { statusCode: HttpStatus.OK, data: customer };
  }

  //

  //
  //
  //
  //
  //
  //search by id

  @Get(':id')
  @ApiOperation({summary : 'Get customer profile by Id'})
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true })) //Enables validation
  async findone(@Param('id') id: string) {
    const customer = await this.customersService.findOneById(+id);
    if (!customer) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Customer not found',
      }; //  404 Not Found
    }
    return { statusCode: HttpStatus.OK, data: customer };
  }

  //

  //

  //
  //
  @Patch(':id')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({summary: 'Update or changed customer profile(except Id)'})
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateCustomer(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    const updatedCustomer = await this.customersService.update(
      +id,
      updateCustomerDto,
    );
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Customer updated successfully',
      data: updatedCustomer,
    };
  }

  //

  //
  //
  //
  //

  @Delete(':id')
  @UsePipes(new ValidationPipe({transform : true}))
  @ApiOperation({summary :'Delete Customer profile using Id'})
  async deleteCustomer(@Param('id', ParseIntPipe) id: string) {
    const deletedCustomer = await this.customersService.delete(+id);
    if (!deletedCustomer) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Selected customer not found ',
      }; //
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Customer deleted successfully',
      data: deletedCustomer,
    };
  }
}
