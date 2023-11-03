import { ENV } from '@common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';

@Injectable()
export class TypeOrmService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: 'mysql',
      host: this.configService.get(ENV.DATABASE_HOST),
      port: this.configService.get(ENV.DATABASE_PORT),
      username: this.configService.get(ENV.DB_USERNAME),
      database: this.configService.get(ENV.DATABASE),
      password: this.configService.get(ENV.DB_PASSWORD),
      entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
      synchronize: true,
      migrations: [],
      autoLoadEntities: true,
    };
  }
}
