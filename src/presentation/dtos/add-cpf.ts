import { AddCpfModel } from '../../domain/models/add-cpf';

import { ApiProperty } from '@nestjs/swagger';

export class AddCpfDTO implements AddCpfModel {
  @ApiProperty()
  cpf: string;
}
