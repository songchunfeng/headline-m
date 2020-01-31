import request from '@/utils/request.js'

// 展示联想建议
export const getSuggestions = q => {
  return request({
    url: '/app/v1_0/suggestion',
    method: 'get',
    params: { q }
  })
}
// 展示联想建议
export const getSearchResult = params => {
  return request({
    url: '/app/v1_0/search',
    method: 'get',
    params
  })
}
