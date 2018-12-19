const Fn = {
  uncurry: f => args => args.reduce((p, c) => p(c), f)
};
const Obj = {
  map: f => o => Object.keys(o).reduce((p, k) => ({ ...p, [k]: f(o[k]) }), {})
};

const uncurry = Symbol("@masaeedu/infix/uncurry");
const infix = X => {
  const wrap = x => {
    const methods = Obj.map(f => v => wrap(f(v)(x)))(X);
    const uncurrier = k => xs => wrap(Fn.uncurry(X[k])([...xs, x]));
    return { ...methods, [uncurry]: uncurrier, unwrap: x };
  };
  return wrap;
};

module.exports = { infix, uncurry };
