import api from "./api";

const endPoint = "/expensecategories";

const getAll = () => api.get(endPoint);
const add = (category) => api.post(endPoint, category);
const update = (id, category) => api.put(endPoint + "/" + id, category);

export default { add, update, getAll };
