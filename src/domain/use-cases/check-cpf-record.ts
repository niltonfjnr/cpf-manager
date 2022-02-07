import { AddCpfModel } from '../models/add-cpf';
import { AddCpfResultModel } from '../models/add-cpf-result';
import { Exception } from '../../presentation/protocols/exception';

export default interface CheckCpfRecord {
  check: (cpfRecord: AddCpfModel) => Promise<AddCpfResultModel | Exception>;
}
