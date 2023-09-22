import api from "./api";

const endPoint = "/buildings";

const add = (building) => api.post(endPoint, building);
const update = (id, building) => api.put(endPoint + "/" + id, building);
const getAll = () => api.get(endPoint);

export default { add, update, getAll };
