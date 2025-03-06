import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

async register(email: string, password: string, name: string, address: string, mobile_number: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.customer.create({ data: { 
      email , 
      password: hashedPassword ,
        name, 
            address, 
            mobile_number
    } });
  }

  async login(email: string, password: string) {
    const user = await this.prisma.customer.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return { token: this.jwtService.sign({ id: user.id }) };
  }
}
