import { ClassConstructor, plainToClass } from 'class-transformer';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity<T> {
  constructor(user: Partial<T>, entity: ClassConstructor<T>) {
    Object.assign(
      this,
      plainToClass(entity, user, {
        excludeExtraneousValues: true,
      }),
    );
  }

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
