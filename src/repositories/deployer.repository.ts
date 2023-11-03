import { DeployerEntity } from '@entities';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AbstractMysqlRepository } from './base.repository';

@Injectable()
export class DeployerRepository extends AbstractMysqlRepository<DeployerEntity> {
  constructor(private dataSource: DataSource) {
    super(dataSource.getRepository(DeployerEntity));
  }
}
