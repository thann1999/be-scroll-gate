import { Injectable } from '@nestjs/common';
import { AbstractMysqlRepository } from './base.repository';
import { DataSource } from 'typeorm';
import { UserEntity } from '@entities';

@Injectable()
export class UserRepository extends AbstractMysqlRepository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(dataSource.getRepository(UserEntity));
  }
}
