import axios from 'axios'
import qs from 'qs'
import { Message,Loading } from 'element-ui';
import router from './../router/index'
// 设置默认路径
let myUrl = '127.0.0', 
jumpUrl =  location.href.split("#")[0],
isLoachost = jumpUrl.indexOf(myUrl);//本地跳转
if (isLoachost > -1) {
  jumpUrl = "http://screenbehind"
};

//添加请求头headers
// axios.defaults.headers['token'] = sessionStorage.token || '1234'

// 添加请求拦截器，在发送请求之前做些什么(**具体查看axios文档**)--------------------------------------------
let cancel, promiseArr = {}
// const CancelToken = axios.CancelToken;

// 全屏显示加载和关闭
let loading
function startLoading() {
  loading = Loading.service({
    lock: true,
    text: 'Loading……',
    background: 'rgba(192, 192, 192, 0.5)',
  })
}

function endLoading() {
  loading.close()
}
let needLoadingRequestCount = 0
function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}
function tryHideFullScreenLoading() {
  needLoadingRequestCount--
  if (needLoadingRequestCount < 1) {
    endLoading()
    needLoadingRequestCount = 0
  }
  else return needLoadingRequestCount
}

// 请求拦截器
axios.interceptors.request.use(function (config) {
    // 显示loading
    if (!config.isHide) {
      showFullScreenLoading()
    }
    //发起请求时，取消掉当前正在进行的相同请求
    if (promiseArr[config.url]) {
      promiseArr[config.url]('操作取消')
      promiseArr[config.url] = cancel
    } else {
      promiseArr[config.url] = cancel
    }
    return config
  }, function (error) {
    // 请求错误时弹框提示，或做些其他事
    return Promise.reject(error)
  })
  
  // 添加响应拦截器(**具体查看axios文档**)----------------------------------------------------------------
  axios.interceptors.response.use(function (response) {
    // 隐藏loading
    if (!response.config.isHide) {
      tryHideFullScreenLoading()
    }
    // 如果需要全部，则 return response 即可 或者你也可以对响应数据做点什么，允许在数据返回客户端前，修改响应的数据
   
    return response
  }, function (error) {
    // 你可以对响应错误做点什么
    return Promise.reject(error)
  })
  
  // 封装数据返回失败提示函数---------------------------------------------------------------------------
  function errorState (response) {
    if (!response.config.isHide) {
      tryHideFullScreenLoading()
    }
    // 如果http状态码正常，则直接返回数据
    // if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    //   // 如果不需要除了data之外的数据，可以直接 return response.data
    //   return response
    // } else {
    //   Message.error('系统繁忙，请稍后再试')
    // }
    Message.error('网络繁忙，请稍后再试')
    if(sessionStorage.uuidtk) router.push({path:'404',query:{name:'error'}})
    return response
  }
  
  // 封装数据返回成功提示函数---------------------------------------------------------------------------
  function successState (res) {
    if (!res.config.isHide) {
      tryHideFullScreenLoading()
    }
    // 统一判断后端返回的错误码(错误码与后台协商而定)
    if (res.data.code === '000000') {
      Message.error('faile')
      return res
    }
  }
  
 
 
 
  // 封装axios---------------------------------------------------------------------------
  function apiAxios (method, url, params, isHide) {
    let httpDefault = {
      method: method,
      baseURL: jumpUrl,
      // baseURL: process.env.baseUrl,
      url: url,
      isHide: isHide,//isHide为true则不显示loading遮罩,即不写此参数时显示请求拦截
      // `params` 是即将与请求一起发送的 URL 参数
      // `data` 是作为请求主体被发送的数据
      params: method === 'GET' || method === 'DELETE' ? params : null,
      data: method === 'POST' || method === 'PUT' ? qs.stringify(params) : null,
      timeout: 120000
    }
  
    // 注意**Promise**使用(Promise首字母大写)
    return new Promise((resolve, reject) => {
      axios(httpDefault)
        // 此处的.then属于axios
        .then((res) => {
          successState(res)
          resolve(res)
        }).catch((response) => {
          errorState(response)
          reject(response)
        })
    })
  }
  
  // 输出函数getAxios、postAxios、putAxios、delectAxios，供其他文件调用-----------------------------
 const fetch = { 
  getAxios : (url, params,isHide) => {
    return apiAxios('GET', url, params,isHide)
  },
  postAxios : (url, params,isHide) => {
    return apiAxios('POST', url, params,isHide)
  },
  putAxios : (url, params,isHide) => {
    return apiAxios('PUT', url, params,isHide)
  },
  delectAxios : (url, params,isHide) => {
    return apiAxios('DELECT', url, params,isHide)
  },
  baseURL: jumpUrl,
  // baseURL: process.env.baseUrl
  isLoachost: isLoachost
}
export default fetch