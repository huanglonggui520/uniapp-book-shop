// /common/http.interceptor.js

// 这里的vm，就是我们在vue文件里面的this，所以我们能在这里获取vuex的变量，比如存放在里面的token变量
const install = (Vue, vm) => {
	// 此为自定义配置参数，具体参数见上方说明
	Vue.prototype.$u.http.setConfig({
		baseUrl: 'https://api.shop.eduwork.cn',
		method: 'POST',
			// 设置为json，返回后会对数据进行一次JSON.parse()
			dataType: 'json',
			showLoading: true, // 是否显示请求中的loading
			loadingText: '加载中...', // 请求loading中的文字提示
			loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
			originalData: true, // 是否在拦截器中返回服务端的原始数据
			loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
		// ......
	});
	
	// 请求拦截，配置Token等参数
	Vue.prototype.$u.http.interceptor.request = (config) => {
		// 引用token
		// 方式一，存放在vuex的token，假设使用了uView封装的vuex方式
		// 见：https://uviewui.com/components/globalVariable.html
		// config.header.token = vm.token;
		
		// 方式二，如果没有使用uView封装的vuex方法，那么需要使用$store.state获取
		// config.header.token = vm.$store.state.token;
		
		// 方式三，如果token放在了globalData，通过getApp().globalData获取
		// config.header.token = getApp().globalData.username;
		
		// 方式四，如果token放在了Storage本地存储中，拦截是每次请求都执行的
		// 所以哪怕您重新登录修改了Storage，下一次的请求将会是最新值
		// const token = uni.getStorageSync('token');
		// config.header.token = token;
		config.header.Authorization = 'Bearer'+uni.getStorageSync('token');
		
		// 可以对某个url进行特别处理，此url参数为this.$u.get(url)中的url值
		if(config.url == '/api/auth/login') config.header.noToken = true;
		// 最后需要将config进行return
		return config;
		// 如果return一个false值，则会取消本次请求
		// if(config.url == '/user/rest') return false; // 取消某次请求
	
	}
	// 响应拦截，判断状态码是否通过
	Vue.prototype.$u.http.interceptor.response = (res) => {
		const {statusCode,data}=res
		if(statusCode < 400){
			// vm.$u.toast("成功")
			return data
		}
		else if(statusCode===401) {
			// 两种情况 token验证未通过 账号密码错误
			if(data.message==="Unauthorized"){
				vm.$u.toast("账号或密码错误")
				return false
			}else{
			vm.$u.toast("验证失败,请重新登录")
			setTimeout(() => {
				// 此为uView的方法，详见路由相关文档
					vm.$u.route('/pages/auth/login/login')
				}, 1500)
			return false}
		}else if(statusCode===400) {
			vm.$u.toast(data.message)
			return false
		}else 
		//  请求参数未通过验证
		if(statusCode===422){
			// console.log('422',res)
			const {errors}=data
			const err=Object.values(errors)[0][0]
			vm.$u.toast(err)
			return false
		}
}
	// 挂着patch请求
	vm.$u.patch=(url,params={})=>{
		const _params={
			...params,
			_method:'PATCH'
		}
		return vm.$u.post(url,_params)
	}
}

export default {
	install
}
