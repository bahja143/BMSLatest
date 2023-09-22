import api from "./api";

const endPoint = "/contracts";

const add = (contract) => api.post(endPoint, contract);
const update = (id, contract) => api.put(endPoint + "/" + id, contract);
const getCurrent = () => api.get(endPoint);
const getAll = () => api.get(endPoint + "/all");
const getOut = (id) => api.get(endPoint + "/out/" + id);

export default { add, update, getAll, getOut, getCurrent };
