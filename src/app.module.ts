import { CpfManagerModule } from './presentation/controllers/cpf-manager/cpf-manager.module';
import { OrmForRoot } from './infra/providers/orm-for-root';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { Module } from '@nestjs/common';

@Module({
  imports: [OrmForRoot(), CpfManagerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
