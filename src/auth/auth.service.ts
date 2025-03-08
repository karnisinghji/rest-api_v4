import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateCustomerDto } from 'src/customers/dto/create-customer.dto';
import { CustomersService } from '../customers/customers.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly customersService: CustomersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(customerDto: CreateCustomerDto) {
    const existingCustomer = await this.customersService.findByEmail(
      customerDto.email,
    );
    if (existingCustomer) {
      throw new BadRequestException('Email is already in use');
    }

    return this.customersService.createCustomer(customerDto);
  }

  async login(email: string, password: string) {
    const customer = await this.customersService.findByEmail(email);

    if (!customer) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, customer.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = {
      id: customer.id,
      email: customer.email,
      name: customer.name,
    };
    return { access_token: this.jwtService.sign(payload) };
  }
}
