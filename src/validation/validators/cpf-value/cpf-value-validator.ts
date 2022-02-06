import { Validator } from '../../protocols/validator';

export class CpfValueValidator implements Validator {
  formatCpfValue(cpfValue: string): string {
    const formattedCpfValue = cpfValue.length && cpfValue.replace(/\D/g, '');
    return formattedCpfValue;
  }

  hasOnlySameNumber(formattedCpfValue: string): boolean {
    const ableToCalculate = formattedCpfValue
      .split('')
      .every((v, index, arr) => v === arr[0])
      ? true
      : false;
    return ableToCalculate;
  }

  calculateCpf(formattedCpfValue: string) {
    let sum = 0,
      rest: number;
    if (formattedCpfValue == '00000000000') return false;
    for (let i = 1; i <= 9; i++) {
      sum = sum + parseInt(formattedCpfValue.substring(i - 1, i)) * (11 - i);
    }
    rest = (sum * 10) % 11;

    if (rest == 10 || rest == 11) rest = 0;
    if (rest != parseInt(formattedCpfValue.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum = sum + parseInt(formattedCpfValue.substring(i - 1, i)) * (12 - i);
    }
    rest = (sum * 10) % 11;

    if (rest == 10 || rest == 11) rest = 0;
    if (rest != parseInt(formattedCpfValue.substring(10, 11))) return false;
    return true;
  }

  isValid(cpf: string): boolean {
    if (!cpf || (cpf && cpf.length === 0)) return false;

    const formattedCpfValue = this.formatCpfValue(cpf);
    if (formattedCpfValue && formattedCpfValue.length !== 11) return false;

    const hasOnlySameNumber = this.hasOnlySameNumber(formattedCpfValue);
    if (hasOnlySameNumber) return false;

    const hasValidCalculatedValue = this.calculateCpf(formattedCpfValue);
    if (hasValidCalculatedValue) {
      return true;
    }
    return false;
  }
}
