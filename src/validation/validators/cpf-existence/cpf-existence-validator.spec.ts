import { CpfExistenceValidator } from './cpf-existence-validator';

const makeSut = () => ({ sut: new CpfExistenceValidator() });

describe('CpfExistenceValidator unit test', () => {
  it('should be defined', () => {
    const { sut } = makeSut();
    expect(sut).toBeDefined();
  });
  it('GIVEN a valid existent value WHEN validating THEN should return false', async () => {
    const { sut } = makeSut();
    const cpfRepository = { find: () => Promise.resolve({ length: 1 }) } as any;
    const cpf = 'any_valid_existent_value';
    const result = await sut.isValid(cpfRepository, cpf);
    expect(result).toBe(false);
  });
  it('GIVEN a valid but not existent value WHEN validating THEN should return true', async () => {
    const { sut } = makeSut();
    const cpfRepository = { find: () => Promise.resolve(false) } as any;
    const cpf = 'any_valid_not_existent_value';
    const result = await sut.isValid(cpfRepository, cpf);
    expect(result).toBe(true);
  });
});
