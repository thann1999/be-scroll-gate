import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/health-check')
  getHealthCheck() {
    return {
      message: 'Hello ScrollGate',
    };
  }
}
