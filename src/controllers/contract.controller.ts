import { Message } from '@common';
import { ContractDto, UpdateContract } from '@dtos';
import { ContractEntity } from '@entities';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ContractService } from '@services';

@Controller('contracts')
@ApiTags('contracts')
export class ContractController {
  constructor(private contractService: ContractService) {}

  @Get('')
  async getAllContracts() {
    const contracts = await this.contractService.findAllAndCountDeployers();
    const countAll = contracts.reduce((prev, current) => {
      prev += (current as any).deployersCount;
      return prev;
    }, 0);

    return {
      countAll,
      contracts,
    };
  }

  @Post('')
  async createContract(@Body() contractDto: ContractDto) {
    const contract = await this.contractService.findByContractCode(
      contractDto.code,
    );

    if (contract) {
      throw new BadRequestException(Message.CONTRACT_EXIST);
    }

    const newContract = new ContractEntity(contractDto);
    this.contractService.create(newContract);

    return {
      newContract,
    };
  }

  @Put('/:contractId')
  async updateContract(
    @Param('contractId') id: number,
    @Body() contractDto: UpdateContract,
  ) {
    return await this.contractService.update(id, contractDto);
  }

  @Delete('/:contractId')
  async deleteContract(@Param('contractId') id: number) {
    return await this.contractService.remove(id);
  }
}
