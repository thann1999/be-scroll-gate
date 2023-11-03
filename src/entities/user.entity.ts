import { Expose, Transform, TransformationType } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('users')
export class UserEntity extends BaseEntity<UserEntity> {
  constructor(user: Partial<UserEntity>) {
    super(user, UserEntity);
  }

  @Column()
  @Expose()
  firstName: string;

  @Column()
  @Expose()
  lastName: string;

  @Column({ unique: true })
  @Expose()
  @IsEmail()
  email: string;

  @Column()
  @Expose()
  @Transform(({ value, type }) => {
    if (type === TransformationType.PLAIN_TO_CLASS) return value;

    return undefined;
  })
  password: string;
}
