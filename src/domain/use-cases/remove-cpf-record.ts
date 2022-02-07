import { AddCpfModel } from '../models/add-cpf';
import { Exception } from '../../presentation/protocols/exception';

export default interface RemoveCpfRecord {
  remove: (cpfRecord: AddCpfModel) => Promise<boolean | Exception>;
}
