import { OrmForFeatureCpf } from '../../../infra/providers/orm-for-feature-cpf';
import { CpfManagerService } from '../../services/cpf-manager/cpf-manager.service';
import { CpfManagerController } from './cpf-manager.controller';

import { Module } from '@nestjs/common';

const ormForFeatureCpf = OrmForFeatureCpf();

@Module({
  imports: [ormForFeatureCpf],
  controllers: [CpfManagerController],
  providers: [CpfManagerService],
  exports: [CpfManagerService, ormForFeatureCpf],
})
export class CpfManagerModule {}
