import axios from 'axios'
import jsonBig from 'json-bigint'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 基础路径
})

request.defaults.transformResponse = [function (data) {
  try {
    return jsonBig.parse(data)
  } catch (error) {
    return {}
  }
}]

export default request
