import request from '@/utils/request.js'

// 获取用户频道列表

// 登录了获取用户频道列表，未登录获取推荐列表
export const getUserChannel = () => {
  return request({
    url: '/app/v1_0/user/channels',
    method: 'get'
  })
}
