import axios from "axios";

axios.defaults.baseURL = "/api";

const statusCheck = (res) => {
  if (res.status === 200) {
    return res.data;
  }

  throw new Error();
};

export const apiGetPhotoList = ({ albumId }) => {
  return axios
    .get("/list", {
      params: {
        _dc: Math.random(),
        a: albumId,
      },
    })
    .then(statusCheck)
    .then((list) => {
      return [
        {
          segments: [
            {
              contents: list,
            },
          ],
        },
      ];
    });
};

export const apiUploadPhoto = (file) => {
  const formData = new FormData();
  formData.append("image", file);
  return axios.post("list", formData).then(statusCheck);
};

export const apiGetAlbumsTotal = () => {
  return axios
    .get("/album", {
      params: {
        t: "totalAlbums",
      },
    })
    .then(statusCheck);
};
export const apiGetAlbums = () => {
  return axios
    .get("/album", {
      params: {
        t: "allAlbums",
      },
    })
    .then(statusCheck);
};

export const apiCreateAlbum = ({ name, photoSelected }) => {
  return axios
    .post("/album", { name, images: photoSelected })
    .then(statusCheck);
};
