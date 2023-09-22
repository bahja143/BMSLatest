import api from "./api";

const endPoint = "/rooms";

const add = (room) => api.post(endPoint, room);
const update = (id, room) => api.put(endPoint + "/" + id, room);
const getAll = () => api.get(endPoint);
const getById = (id) => api.get(endPoint + "/" + id);

export default { add, update, getAll, getById };
