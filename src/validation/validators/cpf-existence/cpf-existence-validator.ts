import { CpfEntity } from '../../../infra/entities/cpf.entity';
import { Validator } from '../../protocols/validator';

import { Repository } from 'typeorm';

export class CpfExistenceValidator implements Validator {
  static readonly softNotDeletedWhereClause = (cpfRecord) => ({
    where: { cpf: cpfRecord.cpf },
    withDeleted: false,
  });
  static readonly softDeletedWhereClause = (cpfRecord) => ({
    where: { cpf: cpfRecord.cpf },
    withDeleted: true,
  });

  async isValid(
    cpfRepository: Repository<CpfEntity>,
    cpf: string,
  ): Promise<boolean> {
    if (!cpf || !cpfRepository) return false;
    const findClause = CpfExistenceValidator.softNotDeletedWhereClause({ cpf });
    const result = await cpfRepository.find(findClause);
    const exists = !!(result && result.length);
    if (exists) {
      return false;
    }
    return true;
  }
}
