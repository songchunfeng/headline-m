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
