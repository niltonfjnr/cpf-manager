import { CpfEntity } from '../entities/cpf.entity';

import { TypeOrmModule } from '@nestjs/typeorm';

export const OrmForFeatureCpf = () => TypeOrmModule.forFeature([CpfEntity]);
