/*
 * @Description: 一般写在axios中
 * @Autor: kangpeng
 * @Date: 2020-05-15 09:55:37
 * @LastEditors: kangpeng
 * @LastEditTime: 2020-05-15 09:57:56
 */ 

import axios from 'axios'
import { Message,Loading } from 'element-ui'

// 环境的切换

if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = '测试环境地址'
} else if (process.env.NODE_ENV == 'production') {
    axios.defaults.baseURL = '正式环境地址'
}

let loading //定义loading变量
let needLoadingRequestCount = 0
function startLoading() { //使用Element loading-start 方法
    loading = Loading.service({
        lock: true,
        text: '加载中……',
        background: 'rgba(0, 0, 0, 0)'
    })
}

function endLoading() { //使用Element loading-close 方法
    loading.close()
}

export function showFullScreenLoading() {
    if (needLoadingRequestCount === 0) {
        startLoading()
    }
    needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
    if (needLoadingRequestCount <= 0) return
    needLoadingRequestCount--
    if (needLoadingRequestCount === 0) {
        endLoading()
    }
}
// 设置请求超时
axios.defaults.timeout = 10000;

// post请求头设置
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 请求拦截
axios.interceptors.request.use(
    config => {
        showFullScreenLoading()
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 响应拦截
axios.interceptors.response.use(
    response => {
        if (response.status == 200) {
            tryHideFullScreenLoading()
            return Promise.resolve(response)
        } else {
            return Promise.reject(response)
        }
    },
    error => {
        tryHideFullScreenLoading()
        if (error.response.status) {
            switch (error.response.status) {
                // 401: 未登录
                case 401:
                    // router.replace({
                    //     path:'/login',
                    //     query:{
                    //         redirect:router.currentRoute.fullPath
                    //     }
                    // });
                    break;

                // 403：token过期
                case 403:
                    Message.warning('登录过期，请重新登录')
                    // 清除token
                    // Cookies.remove('token');
                    // setTimeout(() => {
                    //     router.replace({
                    //         path:'/login',
                    //         query:{
                    //             redirect:router.currentRoute.fullPath
                    //         }
                    //     })
                    // },1000);
                    break;

                // 404请求不存在
                case 404: 
                    Message.error('网络请求不存在')
                    break;
                default:
                    Message.error(error.response.data.message)
            }
            return Promise.reject(error.response)
        }
    }
);

// 封装get方法
export function get(url,params) {
    return new Promise((resolve,reject) => {
        axios.get(url,{
            params:params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    })
}

// 封装post方法
export function post(url,params) {
    return new Promise((resolve,reject) => {
        axios.post(url,params)
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err.data)
            })
    })
}