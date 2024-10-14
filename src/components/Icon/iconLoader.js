const req = require.context("../../assets/icon", false, /\.svg$/);
const getIconName = (name) => name.match(/icon_(.*)\.svg/)[1];

const iconMap = req.keys().reduce((acc, item) => {
  return {
    ...acc,
    [getIconName(item)]: item,
  };
}, {});

export const getIconPath = (name) => {
  return req(iconMap[name]);
};
