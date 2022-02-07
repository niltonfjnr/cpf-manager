import { AddCpfDTO } from '../../../presentation/dtos/add-cpf';
import { InternalServerException } from '../../../presentation/exceptions/internal-server-exception';
import { CpfManagerService } from '../../../presentation/services/cpf-manager/cpf-manager.service';

import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('cpf-manager')
@Controller('cpf-manager')
export class CpfManagerController {
  constructor(private readonly cpfManagerService: CpfManagerService) {}

  @Post('cpf')
  async saveCpf(@Body() addCpfDTO: AddCpfDTO) {
    try {
      const result = await this.cpfManagerService.add(addCpfDTO);
      return result;
    } catch (error) {
      return new InternalServerException(error);
    }
  }
}
