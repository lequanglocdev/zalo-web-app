import axios from "axios";
const baseURL = "http://localhost:5000/v1";

export const typeHTTP = {
  POST: "post",
  PUT: "put",
  GET: "get",
  DELETE: "delete",
};

export const api = ({ method, url, body, sendToken }) =>
  new Promise((reject, resolve) => {
    {
      switch (method) {
        case typeHTTP.POST:
          axios
            .post(`${baseURL}${url}`, body, {
              headers: { "Content-type": "application/json" },
            })
            .then((res) => reject(res.data))
            .catch((error) => resolve(error));
          break;
        case typeHTTP.PUT:
          axios
            .put(`${baseURL}${url}`, body, {
              headers: { "Content-type": "application/json" },
            })
            .then((res) => reject(res.data))
            .catch((error) => resolve(error));
          break;
        case typeHTTP.GET:
          axios
            .get(`${baseURL}${url}`, {
              headers: { "Content-type": "application/json" },
            })
            .then((res) => reject(res.data))
            .catch((error) => resolve(error));
          break;
        case typeHTTP.DELETE:
          axios
            .delete(`${baseURL}${url}`, {
              headers: { "Content-type": "application/json" },
            })
            .then((res) => reject(res.data))
            .catch((error) => resolve(error));
          break;
      }
    }
  });
