import { Exception } from '../protocols/exception';

export class InternalServerException implements Exception {
  constructor(private readonly messageError: any) {}
  type = this.constructor.name;
  message = this.messageError;
}
