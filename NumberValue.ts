import { EnvValue } from './EnvValue.ts';

export class NumberValue extends EnvValue<number> {
  protected mapper(rawValue: string) {
    if (rawValue === '') {
      throw new Error('Empty value provided');
    }

    const numberValueRaw = Number(rawValue);
    if (Number.isNaN(numberValueRaw)) {
      throw new Error(`Value ${rawValue} can't be converted to number`);
    }
    return numberValueRaw;
  }
}
