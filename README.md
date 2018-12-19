# Infix

## Summary
A simple trick for applying a bag of static functions where the data goes last as infix functions.

## Usage

```js
const Int = {
  "+": x => y => y + x,
  "-": x => y => y - x,
  "*": x => y => y * x,
  "/": x => y => y / x
};

const result = infix(Int)(1)["+"](2)["+"](5)["*"](5)["+"](2).unwrap;
```

## Properties

The expression `infix(F)(x).y(...).z(...).unwrap` desugars to: `F.z(...)(F.y(...)(x))`
