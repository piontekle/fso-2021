import axios from 'axios';
const baseUrl = '/api/persons';

const getAll = () => {
  const req = axios.get(baseUrl);
  return req.then(res => res.data);
}

const create = (newPerson) => {
  const req = axios.post(baseUrl, newPerson);
  return req.then(res => res.data);
}

const update = (updatedPerson) => {
  const req = axios.put(`${baseUrl}/${updatedPerson.id}`, updatedPerson)
  return req.then(res => res.data);
}

const remove = (id) => {
  const req = axios.delete(`${baseUrl}/${id}`);
  return req.then(res => res.status);
}

export default {
  getAll,
  create,
  update,
  remove,
}
