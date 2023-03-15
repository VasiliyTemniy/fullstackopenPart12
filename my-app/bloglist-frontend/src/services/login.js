import axios from 'axios'
const baseUrl = `${process.env.REACT_APP_BACKEND_URL}/login`

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }
