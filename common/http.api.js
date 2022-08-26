// /common/http.api.js

// 如果没有通过拦截器配置域名的话，可以在这里写上完整的URL(加上域名部分)
// let indexUrl = '/api/index';
// let indexUrl = '/ebapi/public_api/index';

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
	// 获取首页数据/api/auth/register
	const getIndex = (params = {}) => vm.$u.get('api/index', params);
	const login = (params = {}) => vm.$u.post('api/auth/login', params);
	const getuser = (params = {}) => vm.$u.get('api/user', params);
	const register = (params = {}) => vm.$u.post('api/auth/register', params);
	const baseuser = (params = {}) => vm.$u.put('api/user', params);
	const logout = (params = {}) => vm.$u.post('/api/auth/logout', params);
	const getoss = (params = {}) => vm.$u.get('/api/auth/oss/token', params);
	const baseavatar = (params = {}) => vm.$u.post('/api/user/avatar', params);
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	const getgood = (goods = {}) => vm.$u.get(`/api/goods/${goods}`);
	const collect = (goods = {}) => vm.$u.post(`/api/collects/goods/${goods}`);
	vm.$u.api = {getIndex,login,collect,getuser,register,baseuser,getgood,logout,getoss,baseavatar};
}
export default {
	install
}