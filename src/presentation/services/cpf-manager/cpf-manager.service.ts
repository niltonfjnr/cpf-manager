import AddCpfRecord from '../../../domain/use-cases/add-cpf-record';

import { CpfValueValidator } from '../../../validation/validators/cpf-value/cpf-value-validator';
import { CpfExistenceValidator } from '../../../validation/validators/cpf-existence/cpf-existence-validator';

import { CpfEntity } from '../../../infra/entities/cpf.entity';
import { AddCpfDTO } from '../../../presentation/dtos/add-cpf';
import { InvalidCpfException } from '../../../presentation/exceptions/invalid-cpf-exception';
import { ExistsCpfException } from '../../../presentation/exceptions/exists-cpf-exception';
import { AddCpfResultDTO } from '../../dtos/add-cpf-result';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult } from 'typeorm';

@Injectable()
export class CpfManagerService implements AddCpfRecord {
  constructor(
    @InjectRepository(CpfEntity)
    private readonly cpfRepository: Repository<CpfEntity>,
  ) {}

  async add(
    cpfRecord: AddCpfDTO,
  ): Promise<AddCpfResultDTO | ExistsCpfException | InvalidCpfException> {
    const isCpfValid = new CpfValueValidator().isValid(cpfRecord);
    if (isCpfValid) {
      const cpfCouldBeAdded = await new CpfExistenceValidator().isValid(
        this.cpfRepository,
        cpfRecord.cpf,
      );
      if (cpfCouldBeAdded) {
        const record = await this.cpfRepository.insert(cpfRecord);
        return this.normalizeRecord(cpfRecord.cpf, record);
      }
      return new ExistsCpfException();
    }
    return new InvalidCpfException();
  }

  private normalizeRecord(cpf, record: InsertResult): AddCpfResultDTO {
    if (record && record.raw) {
      const resultId = record && record.raw && record.raw.insertId;
      if (resultId) {
        const generatedRecord =
          (record.generatedMaps && record.generatedMaps[0]) || {};
        const { createdAt } =
          generatedRecord && typeof generatedRecord === 'object'
            ? generatedRecord
            : { createdAt: undefined };
        return { cpf, createdAt } as AddCpfResultDTO;
      }
    }
  }
}
