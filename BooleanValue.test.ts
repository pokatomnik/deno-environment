import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std/testing/asserts.ts";
import { BooleanValue } from "./BooleanValue.ts";

const KEY = "boolean-value";

Deno.test("Boolean - false", () => {
  Deno.env.set(KEY, "false");

  const value = new BooleanValue(KEY).get();
  assertEquals(value, false);

  Deno.env.delete(KEY);
});

Deno.test("Boolean - true", () => {
  Deno.env.set(KEY, "true");

  const value = new BooleanValue(KEY).get();
  assertEquals(value, true);

  Deno.env.delete(KEY);
});

Deno.test("Boolean - false - default value", () => {
  const value = new BooleanValue(KEY, false).get();
  assertEquals(value, false);
});

Deno.test("Boolean - true - default value", () => {
  const value = new BooleanValue(KEY, true).get();
  assertEquals(value, true);
});

Deno.test("Boolean - override", () => {
  Deno.env.set(KEY, "false");
  const value = new BooleanValue(KEY, true).get();
  assertEquals(value, false);
  Deno.env.delete(KEY);
});

Deno.test("Boolean - no value", () => {
  assertThrows(() => {
    new BooleanValue(KEY).get();
  });
});

Deno.test("Boolean - incorrect value - true", () => {
  Deno.env.set(KEY, "foo");
  assertThrows(() => {
    const value = new BooleanValue(KEY).get();
    assertEquals(value, true);
  });
  Deno.env.delete(KEY);
});

Deno.test("Boolean - incorrect value - false", () => {
  Deno.env.set(KEY, "foo");
  assertThrows(() => {
    const value = new BooleanValue(KEY).get();
    assertEquals(value, false);
  });
  Deno.env.delete(KEY);
});
