import axios from 'axios'
const baseUrl = '/api/lists/'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }

  const res = await axios.post(baseUrl, blog, config)
  return res
}

const updateBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }

  const res = await axios.put(`${baseUrl}${blog.id}`, blog, config)
  return res
}

export { createBlog, getAll, setToken, updateBlog }