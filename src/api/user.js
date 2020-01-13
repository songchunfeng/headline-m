import request from '@/utils/request.js'

// 登录
export const login = data => {
  return request({
    url: '/app/v1_0/authorizations',
    method: 'post',
    data
  })
}

// 发送验证码
export const getSmsCode = mobile => {
  return request({
    url: `/app/v1_0/sms/codes/${mobile}`,
    method: 'GET'
  })
}
// 获取用户信息
export const getUserInfo = () => {
  return request({
    url: '/app/v1_0/user',
    method: 'GET'
  })
}
// 获取指定用户个人信息
export const getUserById = userId => {
  return request({
    url: `/app/v1_0/users/${userId}`,
    method: 'GET'
  })
}
