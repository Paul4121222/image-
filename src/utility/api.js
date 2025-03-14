import axios from "axios";
import * as R from "ramda";
axios.defaults.baseURL = "/api";

const statusCheck = (res) => {
  if (res.status === 200) {
    return res.data;
  }

  throw new Error();
};

export const apiGetPhotoList = ({ albumId }) => {
  return axios
    .get("/images", {
      params: {
        _dc: Math.random(),
        a: albumId,
      },
    })
    .then(statusCheck)
    .then((list) => {
      return [
        {
          segments: {
            contents: list,
          },
        },
      ];
    });
};

export const apiUploadPhoto = (file, name) => {
  const formData = new FormData();
  formData.append("image", file);
  return axios.post("/images", formData).then(statusCheck);
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

export const apiDeleteAlbums = ({ ids }) => {
  return axios
    .delete("/album", {
      data: {
        ids,
      },
    })
    .then(statusCheck);
};

export const apiCreateAlbum = ({ name, photoSelected }) => {
  return axios
    .post("/album", { name, images: photoSelected })
    .then(statusCheck);
};

export const apiRemovePhoto = ({ ids }) => {
  return axios
    .delete("/images", {
      data: {
        ids,
      },
    })
    .then(statusCheck);
};

export const apiDeleteItems = ({ ids }) => {
  return axios
    .delete("/list", {
      data: {
        ids,
      },
    })
    .then(statusCheck);
};
export const apiGetRemovePhotos = () => {
  return axios
    .get("/list")
    .then(statusCheck)
    .then(
      R.map(
        R.applySpec({
          name: R.prop("name"),
          dimension: R.pipe(
            R.props(["width", "height"]),
            ([width, height]) => `${width} x ${height}`
          ),
          id: R.prop("_id"),
        })
      )
    );
};
