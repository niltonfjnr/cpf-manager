import { AppModule } from '../../../app.module';
import { CpfManagerController } from './cpf-manager.controller';

import { Test, TestingModule } from '@nestjs/testing';

describe('CpfManagerController', () => {
  let controller: CpfManagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [CpfManagerController],
    }).compile();

    controller = module.get<CpfManagerController>(CpfManagerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
