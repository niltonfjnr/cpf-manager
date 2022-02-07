import AddCpfRecord from '../../../domain/use-cases/add-cpf-record';
import CheckCpfRecord from '../../../domain/use-cases/check-cpf-record';
import RemoveCpfRecord from '../../../domain/use-cases/remove-cpf-record';
import FindAllCpfsRecords from '../../../domain/use-cases/find-all-cpfs-records';

import { CpfValueValidator } from '../../../validation/validators/cpf-value/cpf-value-validator';
import { CpfExistenceValidator } from '../../../validation/validators/cpf-existence/cpf-existence-validator';

import { CpfEntity } from '../../../infra/entities/cpf.entity';

import { AddCpfDTO } from '../../../presentation/dtos/add-cpf';
import { InvalidCpfException } from '../../../presentation/exceptions/invalid-cpf-exception';
import { ExistsCpfException } from '../../../presentation/exceptions/exists-cpf-exception';
import { NotExistsCpfException } from '../../../presentation/exceptions/not-exists-cpf-exception';
import { RemovedCpfException } from '../../../presentation/exceptions/removed-cpf-exception';
import { RecordsRangeException } from '../../../presentation/exceptions/records-range-exception';

import { AddCpfResultDTO } from '../../dtos/add-cpf-result';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult } from 'typeorm';

@Injectable()
export class CpfManagerService
  implements AddCpfRecord, CheckCpfRecord, RemoveCpfRecord, FindAllCpfsRecords
{
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
        return this.normalizeInsertedRecord(cpfRecord.cpf, record);
      }
      return new ExistsCpfException();
    }
    return new InvalidCpfException();
  }

  private normalizeInsertedRecord(cpf, record: InsertResult): AddCpfResultDTO {
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

  async check(
    cpfRecord: AddCpfDTO,
  ): Promise<AddCpfResultDTO | InvalidCpfException> {
    const isCpfValid = new CpfValueValidator().isValid(cpfRecord);
    if (isCpfValid) {
      const findClause =
        CpfExistenceValidator.softNotDeletedWhereClause(cpfRecord);
      const result = (await this.cpfRepository.find(findClause)) as any;
      if (result && result.length) {
        return this.normalizeGotRecord(cpfRecord.cpf, result);
      }
      return new NotExistsCpfException();
    }
    return new InvalidCpfException();
  }

  private normalizeGotRecord(cpf, result: CpfEntity[]): AddCpfResultDTO {
    if (result && result.length) {
      const record = result[0];
      if (record) {
        const { createdAt } =
          record && typeof record === 'object'
            ? record
            : { createdAt: undefined };
        return { cpf, createdAt } as AddCpfResultDTO;
      }
    }
  }

  async remove(cpfRecord: AddCpfDTO) {
    const isCpfValid = new CpfValueValidator().isValid(cpfRecord);
    if (isCpfValid) {
      const findClause =
        CpfExistenceValidator.softNotDeletedWhereClause(cpfRecord);
      const result = (await this.cpfRepository.find(findClause)) as any;
      if (result && result.length) {
        const deleteCandidate = this.normalizeDeleteCandidateRecord(result);
        await this.cpfRepository.softRemove([deleteCandidate]);
        return new RemovedCpfException();
      }
      return new NotExistsCpfException();
    }
    return new InvalidCpfException();
  }

  private normalizeDeleteCandidateRecord(result: CpfEntity[]): CpfEntity {
    if (result && result.length) {
      const record = result[0];
      return record && typeof record === 'object' ? record : new CpfEntity();
    }
  }

  async findAll(limit: number, offset: number) {
    const noLimit = !limit;
    const noOffset = (offset && typeof offset !== 'number') || offset < 0;
    const noRangeLimit =
      limit && typeof limit !== 'number' && limit > 0 && limit < 11;

    if (noLimit || noOffset || noRangeLimit) {
      return new RecordsRangeException();
    }
    const findClause = { skip: offset, take: limit, withDeleted: false };
    const result = await this.cpfRepository.find(findClause);
    return this.normalizeFoundRecords(result);
  }

  private normalizeFoundRecords(result: CpfEntity[]): AddCpfResultDTO[] {
    if (result && result.length) {
      const normalizedRecords = result.map((item) => {
        delete item.id;
        delete item.deletedAt;
        const normalizedItem: AddCpfResultDTO = item;
        return normalizedItem;
      });
      return normalizedRecords;
    }
  }
}
