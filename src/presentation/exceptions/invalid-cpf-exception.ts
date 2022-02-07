import { Exception } from '../protocols/exception';

export class InvalidCpfException implements Exception {
  type = this.constructor.name;
  message = 'CPF is not valid.';
}
