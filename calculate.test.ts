import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { add, sub, mul, div } from "./calculate.ts";

Deno.test("add", () => {
  assertEquals(add(1, 2, 3, 4, 5, 6, 7, 8, 9, 10), 55);
});

Deno.test("sub", () => {
  assertEquals(sub(100, 50, 10), 40);
});

Deno.test("mul", () => {
  assertEquals(mul(3, 4, 8), 96);
});

Deno.test("div", () => {
  assertEquals(div(64, 2, 4), 8);
});
