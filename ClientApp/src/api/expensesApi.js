import api from "./api";

const endPoint = "/expenses";

const add = (expenses) => api.post(endPoint, expenses);
const update = (id, expenses) => api.put(endPoint + "/" + id, expenses);
const getAll = () => api.get(endPoint);

export default { add, update, getAll };
