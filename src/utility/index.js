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

export const position = ({
  target,
  at = { left: "left", top: "bottom" },
  current,
}) => {
  const {
    left: tLeft,
    top: tTop,
    width: tWidth,
    height: tHeight,
  } = target.getBoundingClientRect();
  const { width: cWidth, height: cHeight } = current.getBoundingClientRect();

  let newLeft = tLeft;
  let newTop = tTop;

  const [xLeft, xOffset = 0] = at.left
    .split(/\+|\-/)
    .map((item) => item.trim());
  const [yTop, yOffset = 0] = at.top.split(/\+|\-/).map((item) => item.trim());

  if (xLeft === "left") {
    newLeft = newLeft + xOffset;
  } else if (xLeft === "right") {
    newLeft = tLeft + tWidth - cWidth - xOffset;
  } else if (xLeft === "center") {
    newLeft = tLeft + (tWidth - cWidth) / 2 + xOffset;
  }

  if (yTop === "bottom") {
    newTop = tTop + tHeight + yOffset;
  } else if (yTop === "top") {
    newTop = tTop - cHeight - yOffset;
  } else if (yTop === "middle") {
    newTop = tTop + (tHeight - cHeight) / 2 + yOffset;
  }

  newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - cWidth));
  newTop = Math.max(0, Math.min(newTop, window.innerHeight - cHeight));

  return {
    left: newLeft,
    top: newTop,
  };
};
