import api from "./api";

const endPoint = "/tenants";

const add = (tenant) => api.post(endPoint, tenant);
const update = (id, tenant) => api.put(endPoint + "/" + id, tenant);
const getAll = () => api.get(endPoint);
const getById = (id) => api.get(endPoint + "/" + id);

export default { add, update, getAll, getById };
