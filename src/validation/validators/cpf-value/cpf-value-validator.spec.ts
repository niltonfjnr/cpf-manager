import { CpfValueValidator } from './cpf-value-validator';

const makeSut = () => ({ sut: new CpfValueValidator() });

describe('CpfValueValidator unit test', () => {
  it('should be defined', () => {
    const { sut } = makeSut();
    expect(sut).toBeDefined();
  });
  it('GIVEN a sut instance WHEN validating an invalid CPF value THEN should return false', () => {
    const { sut } = makeSut();
    const cpfRecord = { cpf: 'invalid_value' };
    const result = sut.isValid(cpfRecord);
    expect(result).toBe(false);
  });
  it('GIVEN a sut instance WHEN validating an invalid CPF value THEN should return false', () => {
    const { sut } = makeSut();
    const cpfRecord = { cpf: '11111111111' };
    const result = sut.isValid(cpfRecord);
    expect(result).toBe(false);
  });
  it('GIVEN a sut instance WHEN validating an invalid CPF value THEN should return false', () => {
    const { sut } = makeSut();
    const cpf = { cpf: '55555555555' };
    const result = sut.isValid(cpf);
    expect(result).toBe(false);
  });
  it('GIVEN a sut instance WHEN validating a valid CPF value THEN should return true', () => {
    const { sut } = makeSut();
    const cpfRecord = { cpf: '39892942701' };
    const result = sut.isValid(cpfRecord);
    expect(result).toBe(true);
  });
  it('GIVEN a sut instance WHEN validating a valid CPF value THEN should return true', () => {
    const { sut } = makeSut();
    const cpf = { cpf: '398.929.427-01' };
    const result = sut.isValid(cpf);
    expect(result).toBe(true);
  });
  it('GIVEN a sut instance WHEN validating a valid CPF value THEN should return true', () => {
    const { sut } = makeSut();
    const cpf = '39892942701';
    const result = sut.calculateCpf(cpf);
    expect(result).toBe(true);
  });
  it('GIVEN a sut instance WHEN validating an invalid CPF value THEN should return false', () => {
    const { sut } = makeSut();
    const cpf = '39892942702';
    const result = sut.calculateCpf(cpf);
    expect(result).toBe(false);
  });
});
