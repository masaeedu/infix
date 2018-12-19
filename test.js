const { test } = require("ava");
const { infix } = require(".");

test("can apply static functions infix", t => {
  const Int = {
    "+": x => y => y + x,
    "-": x => y => y - x,
    "*": x => y => y * x,
    "/": x => y => y / x
  };

  const result = infix(Int)(1)
    ["+"](2)
    ["+"](5)
    ["*"](5)
    ["+"](2).unwrap;

  t.is(result, 42);
});
