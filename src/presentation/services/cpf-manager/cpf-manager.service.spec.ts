import { AppModule } from '../../../app.module';
import { CpfManagerService } from './cpf-manager.service';

import { Test, TestingModule } from '@nestjs/testing';

describe('CpfManagerService', () => {
  let service: CpfManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [CpfManagerService],
    }).compile();

    service = module.get<CpfManagerService>(CpfManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
