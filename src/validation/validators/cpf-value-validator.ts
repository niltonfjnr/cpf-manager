import { Validator } from '../protocols/validator';

export class CpfValueValidator implements Validator {
  isValid(cpf: string): boolean {
    return !!cpf;
  }
}
