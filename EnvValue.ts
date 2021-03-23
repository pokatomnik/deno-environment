import { Value } from './Value.ts';

export abstract class EnvValue<T> {
  readonly #key: string;

  readonly #rawValue: string | undefined;

  readonly #defaultValue: Value<T> | null;

  #computedValue: Value<T> | null = null;

  constructor(key: string, defaultValue?: T) {
    this.#key = key;
    this.#rawValue = Deno.env.get(key);
    this.#defaultValue =
      defaultValue === undefined ? null : new Value(defaultValue);
  }

  protected abstract mapper(rawValue: string): T;

  private compute() {
    if (this.#rawValue) {
      return this.mapper(this.#rawValue);
    } else if (this.#defaultValue !== null) {
      return this.#defaultValue.get();
    } else {
      throw new Error(`Env variable ${this.#key} is not defined`);
    }
  }

  public get() {
    return (this.#computedValue
      ? this.#computedValue
      : (this.#computedValue = new Value(this.compute()))
    ).get();
  }
}
