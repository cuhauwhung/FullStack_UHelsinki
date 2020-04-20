import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(res => res.data)
}

const create = (newObject) => {

  const config = {
    headers: { Authorization: token }
  }

  const request = axios.post(baseUrl, newObject, config)
  return request.then(res => res.data)
}

const update = (blogObject) => {

  const id = blogObject.id
  const request = axios.put(`${baseUrl}/${id}`, blogObject)
  return request.then(res => res.data)
}

const deleteBlog = (blogObject) => {

  const config = {
    headers: { Authorization: token }
  }

  const id = blogObject.id
  const req = axios.delete(`${baseUrl}/${id}`, config)
  return req.then(res => res.data)
}

export default { getAll, create, update, setToken, deleteBlog }
