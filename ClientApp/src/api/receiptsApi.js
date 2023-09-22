import api from "./api";

const endPoint = "/receipts";

const add = (receipts) => api.post(endPoint, receipts);
const update = (id, receipts) => api.put(endPoint + "/" + id, receipts);
const getAll = () => api.get(endPoint);
const getById = (id) => api.get(endPoint + "/" + id);

export default { add, update, getAll, getById };
