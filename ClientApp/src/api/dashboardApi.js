import api from "./api";

const endPoint = "/dashboardes";

const getAll = () => api.get(endPoint);

export default { getAll };
