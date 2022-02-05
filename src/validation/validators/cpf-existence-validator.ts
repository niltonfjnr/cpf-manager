import { Validator } from '../protocols/validator';

export class CpfExistenceValidator implements Validator {
  isValid(cpf: string): boolean {
    return !!cpf;
  }
}
