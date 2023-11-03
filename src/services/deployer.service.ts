import { DeployerEntity, UserEntity } from '@entities';
import { Injectable } from '@nestjs/common';
import { DeployerRepository } from '@repositories';
import { FindManyOptions, FindOneOptions } from 'typeorm';

@Injectable()
export class DeployerService {
  constructor(private deployerRepository: DeployerRepository) {}

  create(contract: DeployerEntity) {
    return this.deployerRepository.insert(contract);
  }

  findAll(options: FindManyOptions) {
    return this.deployerRepository.findAll(options);
  }

  findById(id: number) {
    return this.deployerRepository.findById(id);
  }

  findByAddress(address: string) {
    return this.deployerRepository.findOne({
      where: {
        address,
      },
      relations: {
        contracts: true,
      },
    });
  }

  findOne(options: FindOneOptions) {
    return this.deployerRepository.findOne(options);
  }

  update(id: number, updateUserEntity: Partial<UserEntity>) {
    return this.deployerRepository.update(id, updateUserEntity);
  }

  remove(id: number) {
    return this.deployerRepository.delete(id);
  }
}
