import { AddCpfResultModel } from '../models/add-cpf-result';
import { Exception } from '../../presentation/protocols/exception';

export default interface FindAllCpfsRecords {
  findAll: (
    limit: number,
    offset: number,
  ) => Promise<AddCpfResultModel[] | Exception>;
}
