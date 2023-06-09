import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import userApi from './mockServeData/user'
import permissionApi from './mockServeData/permission'
import detailApi from './mockServeData/detail'

Mock.mock('/home/getData', homeApi.getStatisticalData)
Mock.mock(/user\/add/, 'post', userApi.createUser)
Mock.mock(/user\/edit/, 'post', userApi.updateUser)

Mock.mock(/user\/getUser/, 'get', userApi.getUserList)
Mock.mock(/user\/del/, 'post', userApi.deleteUser)
// 可以拦截ajax请求,通过制定数据模板，可以返回接口响应数据用于模拟后端响应接口


Mock.mock(/mall\/add/, 'post', detailApi.createDetail)
Mock.mock(/mall\/edit/, 'post', detailApi.updateDetail)

Mock.mock(/mall\/getDetail/, 'get', detailApi.getDetailList)
Mock.mock(/mall\/del/, 'post', detailApi.deleteDetail)

//定义拦截器
Mock.mock(/permission\/getMenu/, 'post', permissionApi.getMenu)
