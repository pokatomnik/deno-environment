# deno-environment

[Deno](https://deno.land/) package for environment variables management.

Currently, Deno exposes environment variables through `Deno.env`. This package is for converting environment variables to expected types.

## Exports are:

### `StringValue`

Typescript [string type](https://www.typescriptlang.org/docs/handbook/basic-types.html#string). It checks if the environment value exists and does nothing with It.

### `NumberValue`

Typescript [number type](https://www.typescriptlang.org/docs/handbook/basic-types.html#number). Converts env value to number.

### `IntValue`

Integer type. Converts the environment variable to a number as well as `NumberValue`, but checks if the environment variable can be converted to `integer`.

### `BooleanValue`

Typescript [boolean type](https://www.typescriptlang.org/docs/handbook/basic-types.html#boolean). Converts the environment variable to a `boolean` from string `'true'` or `'false'`.

### `EnvValue`

Is a generic abstract class that must be extended in this way:

```typescript
interface MyType {
  title: string;
  tome: number;
  isRead: boolean;
}

class MyType extends EnvValue<MyType> {
  protected mapper(rawValue: string): MyType {
    return JSON.parse(rawValue);
  }
}
```

So the raw env value could be `'{"title": "Harry Potter", "tome": 1, "isRead": false}'`. And the Environment converter can use JSON parser to do all the work.

## Examples

Let's imagine we have the environment variable `port` with value `8080`. We could access that in this way:

```typescript
const port = Number(Deno.env.get('port'));
```

But what if this environment variable is missing? We should check It first:

```typescript
const portString = Deno.env.get('port');
const portNumber = Number(portString);

if (portNumber === undefined) {
  throw new Error('port number is missing');
}

if (Number.isNaN(portNumber)) {
  throw new Error('Incorrect port variable');
}
```

This routine could be easily done with this:

```typescript
const portNumber = new IntValue('port').get();
```

## Please, note

> If a particular variable is not convertible, `.get()` method throws the exception.

## Importing the module

> `mod.ts` is an entrypoint, other files should not be used.

## Tests

`deno test --allow-env`
