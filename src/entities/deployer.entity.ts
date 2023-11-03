import { Expose } from 'class-transformer';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ContractEntity } from './contract.entity';

@Entity('deployers')
export class DeployerEntity extends BaseEntity<DeployerEntity> {
  constructor(user: Partial<DeployerEntity>) {
    super(user, DeployerEntity);
  }

  @Column()
  @Expose()
  address: string;

  @Column()
  @Expose()
  blockHash: string;

  @ManyToOne(() => ContractEntity, (contract) => contract.deployers)
  contract: ContractEntity;
}
