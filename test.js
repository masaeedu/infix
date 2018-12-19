const { test } = require("ava");
const { infix, uncurry } = require(".");

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

test("can apply functions of arbitrary arity infix by uncurrying", t => {
  const Arr = {
    foldMap: M => f => xs => xs.reduce((p, c) => M.append(p)(f(c)), M.empty)
  };
  const Sum = { empty: 0, append: x => y => x + y };

  // prettier-ignore
  const result = infix(Arr)([1, 2, 3])
    [uncurry]("foldMap")([Sum, x => x * 2]).unwrap;

  t.is(result, 12);
});
