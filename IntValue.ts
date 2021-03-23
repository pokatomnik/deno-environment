import { NumberValue } from "./NumberValue.ts";

export class IntValue extends NumberValue {
  protected mapper(rawValue: string) {
    const value = super.mapper(rawValue);
    if (Math.floor(value) === value) {
      return value;
    }

    throw new Error(`Value ${rawValue} can't be converted to a int value`);
  }
}
