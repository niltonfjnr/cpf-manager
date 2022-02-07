import { Exception } from '../protocols/exception';

export class NotExistsCpfException implements Exception {
  type = this.constructor.name;
  message = 'CPF is not registered.';
}
