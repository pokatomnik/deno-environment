import { EnvValue } from './EnvValue.ts';

export class StringValue extends EnvValue<string> {
  protected mapper(rawValue: string) {
    return rawValue;
  }
}
