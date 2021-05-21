import axios from 'axios'

// 添加请求拦截器
axios.interceptors.request.use()
  // config => {
  //   if(store.state.token){
  //     config.headers.common['uuid'] =store.state.uuid
  //   }
  //   return config
  // },
  // error =>{
  //   // 对请求错误做什么
  //   return Promise.reject(error)
  // })

// 响应拦截器
axios.interceptors.response.use(
  function (config) {
    // 对响应数据做点什么
    return config
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

let base = ''

// 基金查询post，第三方
export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    withCredentials: false,
    // contentType: 'application/json',
    headers: {
      // 'Content-Type': 'application/json',
      'token': '39CknoZcrT'
    }
  })
}

// 查询基金get，第三方
export const getRequest = (url, headers) => {
  return axios({
    method: 'get',
    url: `${base}${url}`,
    withCredentials: false,
    headers: {
      'Authorization': headers
    }
  })
}

// 发送post请求到后端拿数据
export const postServerRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    withCredentials: false,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  })
}
