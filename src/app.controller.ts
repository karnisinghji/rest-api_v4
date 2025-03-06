import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  
 


constructor(private readonly appService : AppService){}


 @Get("/home")
  async Home(){
  return await this.appService.getHello();
}


@Post('/about')
async About(){
  return await this.appService.getAbout();

  }
}