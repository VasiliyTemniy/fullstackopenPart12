import axios from 'axios'
const baseUrl = `${process.env.REACT_APP_BACKEND_URL}/blogs`

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const getOne = async (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  const response = await request
  return response.data
}

const update = async (updObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/${updObject.id}`, updObject, config)
  return response.data
}

const like = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/${id}&like`, id, config)
  return response.data
}

const comment = async (id, comment) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/${id}&comment`, { comment }, config)
  return response.data
}

const deleteRequest = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.delete(`${baseUrl}/${id}`, config)
  const response = await request
  return response
}

export default { getAll, getOne, create, setToken, update, like, comment, deleteRequest }
