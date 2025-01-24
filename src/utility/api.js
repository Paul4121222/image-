import axios from "axios";

axios.defaults.baseURL = "/api";

const statusCheck = (res) => {
  if (res.status === 200) {
    return res.data;
  }

  throw new Error();
};

export const apiGetPhotoList = () => {
  return axios.get("/list").then(statusCheck);
};
