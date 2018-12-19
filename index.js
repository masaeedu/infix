const Fn = {
  flip: f => x => y => f(y)(x),
  pipe: fs => x => fs.reduce((p, f) => f(p), x),
  uncurry: f => args => args.reduce((p, c) => p(c), f)
};
const Obj = {
  map: f => o => Object.keys(o).reduce((p, k) => ({ ...p, [k]: f(o[k]) }), {})
};

const uncurry = Symbol("@masaeedu/infix/uncurry");
const infix = X => {
  const wrap = x => {
    const methods = Obj.map(f => Fn.pipe([Fn.flip(f)(x), wrap]))(X);
    const uncurrier = k => xs => wrap(Fn.uncurry(X[k])([...xs, x]));
    return { ...methods, [uncurry]: uncurrier, unwrap: x };
  };
  return wrap;
};

module.exports = { infix, uncurry };
