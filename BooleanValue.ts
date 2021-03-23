import { EnvValue } from "./EnvValue.ts";

export class BooleanValue extends EnvValue<boolean> {
  protected mapper(rawValue: string) {
    if (rawValue === true.toString()) {
      return true;
    } else if (rawValue === false.toString()) {
      return false;
    }

    throw new Error(`Value ${rawValue} can't be converted to boolean`);
  }
}
