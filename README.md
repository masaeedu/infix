# Infix

## Summary
A simple trick for applying a bag of static functions where the data goes last as infix functions.

## Usage

```js
const { infix, uncurry } = require("@masaeedu/infix");

const Int = {
  "+": x => y => y + x,
  "-": x => y => y - x,
  "*": x => y => y * x,
  "/": x => y => y / x
};

const result = infix(Int) (1) ["+"] (2) ["+"] (5) ["*"] (5) ["+"] (2) .unwrap;
// => 42
```

## Properties

The expression:

```js
infix(F)(a)
  .f(b)
  .g(c).unwrap
```

desugars to:

```js
F.g(c)(F.f(b)(a))
```

Note that this only works when `F.f`, `F.g` etc. are binary functions with the data as the second argument.

Some functions may not fit this mould. Functions of arbitrary arity are supported using uncurrying. The expression:

```js
infix(F)(a)
  .f(b)
  [uncurry](g)([c, d])
  .h(e).unwrap
```

desugars to:

```js
F.h(e)(
  F.g(c)(d)(
    F.f(b)(
      a)))
```

## Disclaimer

Use of this library may result in you being instantly fired. I accept no responsibility.
