import { Exception } from '../protocols/exception';

export class RemovedCpfException implements Exception {
  type = this.constructor.name;
  message = 'CPF was removed.';
}
