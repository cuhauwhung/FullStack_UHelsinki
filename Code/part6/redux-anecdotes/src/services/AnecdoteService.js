import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const object = { content, votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const update = async (anecdoteObject) => {
    const id = anecdoteObject.id
    const request = axios.put(`${baseUrl}/${id}`, anecdoteObject)
    return request.then(res => res.data)
  }

export default { getAll, createNew, update }
