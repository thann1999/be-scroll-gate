import { Message } from '@common';
import { DeployerDto } from '@dtos';
import { DeployerEntity } from '@entities';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ContractService, DeployerService } from '@services';

@Controller('deployers')
@ApiTags('deployers')
export class DeployerController {
  constructor(
    private deployerService: DeployerService,
    private contractService: ContractService,
  ) {}

  @Get('')
  async getAllDeployer() {
    const deployers = await this.deployerService.findAll({});

    return {
      deployers,
    };
  }

  @Get(':address')
  async getDeployerInfo(@Param('address') address: string) {
    const deployer = await this.deployerService.findByAddress(address);

    return {
      deployer,
    };
  }

  @Post('')
  async createDeployer(@Body() deployerDto: DeployerDto) {
    const contract = await this.contractService.findById(
      deployerDto.contractId,
    );

    if (!contract) {
      throw new BadRequestException(Message.NOT_FOUND_CONTRACT);
    }

    const newDeployer = new DeployerEntity({
      address: deployerDto.address,
      blockHash: deployerDto.blockHash,
    });
    newDeployer.contract = contract;
    await this.deployerService.create(newDeployer);

    return {
      newDeployer,
    };
  }
}
