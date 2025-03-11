import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateCustomerDto } from '../customers/dto/create-customer.dto';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation ,ApiResponse,ApiBody} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')

  @ApiOperation({summary: 'Update by Id'})
  @UsePipes(new ValidationPipe({ transform: true }))
  async register(@Body() customerDto: CreateCustomerDto) {
    return this.authService.register(customerDto);
  }



//
// 
// 
  @Post('login')
  @ApiOperation({summary : 'User login and get JWT token'})
 // @ApiResponse({status : 200, description: 'User logged in successfully'})
  @ApiBody({type: CreateCustomerDto})
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }
}
