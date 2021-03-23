export class Value<T> {
  readonly #value: T;

  constructor(value: T) {
    this.#value = value;
  }

  public get() {
    return this.#value;
  }
}
