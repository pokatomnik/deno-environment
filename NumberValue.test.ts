import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std/testing/asserts.ts";
import { NumberValue } from "./NumberValue.ts";

const KEY = "number-value";

Deno.test("Number - 42", () => {
  Deno.env.set(KEY, "42");

  const value = new NumberValue(KEY).get();
  assertEquals(value, 42);

  Deno.env.delete(KEY);
});

Deno.test("Number - default value", () => {
  Deno.env.set(KEY, "42");

  const value = new NumberValue(KEY).get();
  assertEquals(value, 42);

  Deno.env.delete(KEY);
});

Deno.test("Number - override", () => {
  Deno.env.set(KEY, "42");

  const value = new NumberValue(KEY, 1).get();
  assertEquals(value, 42);

  Deno.env.delete(KEY);
});

Deno.test("Number - incorrect number", () => {
  Deno.env.set(KEY, "foo");

  assertThrows(() => {
    new NumberValue(KEY).get();
  });

  Deno.env.delete(KEY);
});

Deno.test("Number - fractional", () => {
  Deno.env.set(KEY, "44.1");

  const value = new NumberValue(KEY).get();
  assertEquals(value, 44.1);

  Deno.env.delete(KEY);
});

Deno.test("Number - no value", () => {
  assertThrows(() => {
    new NumberValue(KEY).get();
  });
});
