const req = require.context("../assets/img", false, /\.jpg|jpeg$/);

const map = req.keys().reduce((acc, item) => {
  const name = item.match(/\.\/(.*)/)[1];
  return {
    ...acc,
    [name]: item,
  };
}, {});
export const imgLoader = (name) => {
  return req(map[name]).default;
};

export const debounce = (fn, delay) => {
  let timer = null;
  return (...args) => {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
