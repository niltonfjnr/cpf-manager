import { Exception } from '../protocols/exception';

export class ExistsCpfException implements Exception {
  type = this.constructor.name;
  message = 'CPF in use.';
}
