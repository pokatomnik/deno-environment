import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std/testing/asserts.ts";
import { IntValue } from "./IntValue.ts";

const KEY = "int-value";

Deno.test("Int - 42", () => {
  Deno.env.set(KEY, "42");

  const value = new IntValue(KEY).get();
  assertEquals(value, 42);

  Deno.env.delete(KEY);
});

Deno.test("Int - default value", () => {
  Deno.env.set(KEY, "42");

  const value = new IntValue(KEY).get();
  assertEquals(value, 42);

  Deno.env.delete(KEY);
});

Deno.test("Int - override", () => {
  Deno.env.set(KEY, "42");

  const value = new IntValue(KEY, 1).get();
  assertEquals(value, 42);

  Deno.env.delete(KEY);
});

Deno.test("Int - incorrect number", () => {
  Deno.env.set(KEY, "foo");

  assertThrows(() => {
    new IntValue(KEY).get();
  });

  Deno.env.delete(KEY);
});

Deno.test("Int - fractional", () => {
  Deno.env.set(KEY, "44.1");

  assertThrows(() => {
    new IntValue(KEY).get();
  });

  Deno.env.delete(KEY);
});

Deno.test("Int - no value", () => {
  assertThrows(() => {
    new IntValue(KEY).get();
  });
});
