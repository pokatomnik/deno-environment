import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std/testing/asserts.ts";
import { StringValue } from "./StringValue.ts";

const KEY = "string-value";

Deno.test("String - foo", () => {
  Deno.env.set(KEY, "foo");

  const value = new StringValue(KEY).get();

  assertEquals(value, "foo");

  Deno.env.delete(KEY);
});

Deno.test("String - default value", () => {
  const value = new StringValue(KEY, "foo").get();

  assertEquals(value, "foo");
});

Deno.test("String - override", () => {
  Deno.env.set(KEY, "foo");

  const value = new StringValue(KEY, "bar").get();

  assertEquals(value, "foo");

  Deno.env.delete(KEY);
});

Deno.test("String - no value", () => {
  assertThrows(() => {
    new StringValue(KEY).get();
  });
});
