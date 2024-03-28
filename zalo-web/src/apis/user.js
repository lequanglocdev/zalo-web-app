import axiosClient from "./axiosClient";

const loginApi = {
  registry: (name, username, password) => {
    const url = "/auth/registry";

    return axiosClient.post(url, { name, username, password });
  },
};
