import request from '@/utils/request'

export function addMood(data) {
  return request({
    url: '/friend/friendArticle',
    method: 'post',
    data
  })
}

export function getData(params) {
  return request({
    url: '/friend/friendArticle/getData',
    method: 'get',
    params
  })
}

export function deleteById(id) {
  return request({
    url: `/friend/friendArticle/${id}`,
    method: 'delete',
  })
}

export function getDataByLimit(params) {
  return request({
    url: '/friend/friendArticle/getDataByLimit',
    method: 'get',
    params
  })
}


