import { AddCpfResultModel } from '../../domain/models/add-cpf-result';

import { ApiProperty } from '@nestjs/swagger';

export class AddCpfResultDTO implements AddCpfResultModel {
  @ApiProperty()
  cpf: string;

  @ApiProperty()
  createdAt: string;
}
