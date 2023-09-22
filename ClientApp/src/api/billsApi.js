import api from "./api";

const endPoint = "/bills";

const getOverDueBills = () => api.get(endPoint);
const getAll = () => api.get(endPoint + "/allBills");

export default { getAll, getOverDueBills };
