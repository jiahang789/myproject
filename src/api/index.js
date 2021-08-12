import request from '../utils/request'

export const fetchData = query => {
  return request({
    url: './table.json',
    method: 'get',
    params: query
  })
}

export const getData = (url, params) => {
  return request.get(url, {params})
}

export const postData = (url, params) => {
  return request.post(url, params)
}
export const putData = (url, params) => {
  return request.put(url, params)
}
export const delData = url => {
  return request.delete(url)
}
