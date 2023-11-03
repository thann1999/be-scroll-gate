import { Injectable } from '@nestjs/common';
import { AbstractMysqlRepository } from './base.repository';
import { DataSource } from 'typeorm';
import { ContractEntity } from '@entities';

@Injectable()
export class ContractRepository extends AbstractMysqlRepository<ContractEntity> {
  constructor(private dataSource: DataSource) {
    super(dataSource.getRepository(ContractEntity));
  }

  findAllAndCountDeployers() {
    return this.dataSource
      .getRepository(ContractEntity)
      .createQueryBuilder('contract')
      .loadRelationCountAndMap('contract.deployersCount', 'contract.deployers')
      .getMany();
  }
}
