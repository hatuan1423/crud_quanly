import axios from "./axios";

const fetchAllUser = (page: number) => {
  return axios.get(`/api/users?page=${page}`);
};

const postCreateUser = (name: string, job: string) => {
  return axios.post("/api/users", { name, job });
};

const updateUser = (name: string, job: string) => {
  return axios.put("/api/users", { name, job });
};

export { fetchAllUser, postCreateUser, updateUser };
