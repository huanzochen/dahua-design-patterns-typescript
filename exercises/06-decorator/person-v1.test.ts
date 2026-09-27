import assert from "node:assert/strict";
import { test } from "node:test";

import { Person } from "./person-v1.js";

test("Person directly provides casual clothing methods", () => {
  let output = "";
  const person = new Person("小菜", (text) => {
    output += text;
  });

  person.wearTShirt();
  person.wearBaggyPants();
  person.wearSneakers();
  person.show();

  assert.equal(output, "大T恤 垮褲 破球鞋 裝扮的小菜\n");
});

test("Person directly provides formal clothing methods", () => {
  let output = "";
  const person = new Person("小菜", (text) => {
    output += text;
  });

  person.wearSuit();
  person.wearTie();
  person.wearLeatherShoes();
  person.show();

  assert.equal(output, "西裝 領帶 皮鞋 裝扮的小菜\n");
});
