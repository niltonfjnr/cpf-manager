import { CpfEntity } from '../../../infra/entities/cpf.entity';
import { Validator } from '../../protocols/validator';

import { Repository } from 'typeorm';

export class CpfExistenceValidator implements Validator {
  async isValid(
    cpfRepository: Repository<CpfEntity>,
    cpf: string,
  ): Promise<boolean> {
    if (!cpf || !cpfRepository) return false;
    const findClause = { where: { cpf } };
    const result = await cpfRepository.find(findClause);
    const exists = !!(result && result.length);
    if (exists) {
      return false;
    }
    return true;
  }
}
