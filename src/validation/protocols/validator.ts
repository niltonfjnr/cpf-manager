export interface Validator {
  isValid(...value: any): boolean | Promise<boolean>;
}
