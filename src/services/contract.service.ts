import { ContractEntity } from '@entities';
import { Injectable } from '@nestjs/common';
import { ContractRepository } from '@repositories';
import { FindManyOptions, FindOneOptions } from 'typeorm';

@Injectable()
export class ContractService {
  constructor(private contractRepository: ContractRepository) {}

  create(contract: ContractEntity) {
    return this.contractRepository.insert(contract);
  }

  findAll(options: FindManyOptions) {
    return this.contractRepository.findAll(options);
  }

  findAllAndCountDeployers() {
    return this.contractRepository.findAllAndCountDeployers();
  }

  findById(id: number) {
    return this.contractRepository.findById(id);
  }

  findByContractCode(code: string) {
    return this.contractRepository.findOne({
      where: {
        code,
      },
    });
  }

  findOne(options: FindOneOptions) {
    return this.contractRepository.findOne(options);
  }

  update(id: number, updateUserEntity: Partial<ContractEntity>) {
    return this.contractRepository.update(id, updateUserEntity);
  }

  remove(id: number) {
    return this.contractRepository.delete(id);
  }
}
