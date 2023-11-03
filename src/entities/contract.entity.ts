import { Expose } from 'class-transformer';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { DeployerEntity } from './deployer.entity';

@Entity('contracts')
export class ContractEntity extends BaseEntity<ContractEntity> {
  constructor(user: Partial<ContractEntity>) {
    super(user, ContractEntity);
  }

  //Mapping with contractCode in contracts-compile.json
  @Column({ unique: true })
  @Expose()
  code: string;

  @Column({ nullable: true })
  @Expose()
  type: string;

  @Column()
  @Expose()
  image: string;

  @Column()
  @Expose()
  title: string;

  @Column()
  @Expose()
  description: string;

  @Column({ type: 'float' })
  @Expose()
  price: number;

  @Column({ nullable: true })
  @Expose()
  nftURI: string;

  @OneToMany(() => DeployerEntity, (deployer) => deployer.contract)
  deployers: DeployerEntity[];
}
