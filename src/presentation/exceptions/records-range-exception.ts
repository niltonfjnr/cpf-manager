import { Exception } from '../protocols/exception';

export class RecordsRangeException implements Exception {
  type = this.constructor.name;
  message =
    'Use both limit and offset valid numbers. Limit must be between 1 and 10';
}
