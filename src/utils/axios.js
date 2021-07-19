import Axios from 'axios'
import store from '@/store'

const config = {
  baseURL: import.meta.env.VITE_BASE_URL
}

const axios = Axios.create(config)

const prompt = (e) => {
  switch (e.code) {
    case 40101:
      // store.dispatch(logout())
      break
    case 422:
      break
    case 500:
      break
    case 40102:
      break
    default:
      break
  }
}

axios.interceptors.request.use(
  (config) => {
    const token = store?.state?.auth?.token
    if (token) config.headers.common.Authorization = `Bearer ${token}`
    return config
  },
  (err) => Promise.reject(err)
)

axios.interceptors.response.use(
  (res) => res,
  (err) => {
    let error = { status: 0, message: '服务器未响应', code: 0 }
    if (err.response) error = err.response.data
    prompt(error)
    return Promise.reject(error)
  }
)

export default axios