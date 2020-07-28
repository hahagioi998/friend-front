import request from '@/utils/request'

export function changeSpace(params) {
  return request({
    url: '/friend/friendList/changeSpace',
    method: 'get',
    params
  })
}

export function getData(params) {
  return request({
    url: '/friend/friendList/getData',
    method: 'get',
    params
  })
}

export function deleteById(id) {
  return request({
    url: `/friend/friendList/${id}`,
    method: 'delete',
  })
}


