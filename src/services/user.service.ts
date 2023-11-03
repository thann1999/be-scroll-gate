import { UserEntity } from '@entities';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '@repositories';
import { FindManyOptions, FindOneOptions } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  create(user: UserEntity) {
    return this.userRepository.insert(user);
  }

  findAll(options: FindManyOptions) {
    return this.userRepository.findAll(options);
  }

  findById(id: number) {
    return this.userRepository.findOne({
      where: {
        id,
      },
      relations: {
        role: true,
      },
    });
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  findOne(options: FindOneOptions) {
    return this.userRepository.findOne(options);
  }

  update(id: number, updateUserEntity: Partial<UserEntity>) {
    return this.userRepository.update(id, updateUserEntity);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
