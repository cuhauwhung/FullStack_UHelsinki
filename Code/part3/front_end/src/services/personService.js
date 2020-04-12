import axios from 'axios'
const baseURL = 'api/persons'


const getAll = () => {
    const request = axios.get(baseURL)
    console.log(request.then(res => res.data))
    return request.then(res => res.data)
}

const create = (newPerson) => {
    const request = axios.post(baseURL, newPerson)
    return request.then(res => res.data)
}

const update = (id, newPerson) => {
    const request = axios.put(`${baseURL}/${id}`, newPerson)
    return request.then(res => res.data)
}

const deletePerson = (id) => {
    const req = axios.delete(`${baseURL}/${id}`);
    return req.then(res => res.data);
}

export default {
    getAll,
    create,
    update,
    deletePerson
}