import {
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmService, dbConfig } from '@configs';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Services from '@services';
import * as Controllers from '@controllers';
import * as Repositories from '@repositories';
import { AuthMiddleware } from './common/middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [dbConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmService,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [...Object.values(Controllers), AppController],
  providers: [
    ...Object.values(Services),
    ...Object.values(Repositories),
    Logger,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'contracts', method: RequestMethod.POST },
        { path: 'contracts/:contractId', method: RequestMethod.PUT },
      );
  }
}
