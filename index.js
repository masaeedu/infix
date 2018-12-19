const Fn = {
  flip: f => x => y => f(y)(x),
  pipe: fs => x => fs.reduce((p, f) => f(p), x)
};
const Obj = {
  map: f => o => Object.keys(o).reduce((p, k) => ({ ...p, [k]: f(o[k]) }), {})
};

const infix = X => {
  const wrap = x => {
    const methods = Obj.map(f => Fn.pipe([Fn.flip(f)(x), wrap]))(X);
    return { ...methods, unwrap: x };
  };
  return wrap;
};

module.exports = { infix };
