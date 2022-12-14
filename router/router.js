// router.js
import {RouterMount,createRouter} from 'uni-simple-router';

const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,  
	routes: [...ROUTES],
	
});
//全局路由前置守卫
router.beforeEach((to, from, next) => {
	// console.log('1234567890',from)
	console.log('888',to)
	if(to.path==='/pages/auth/login/login'){
		uni.setStorageSync('topath',from.fullPath)
	}
	if(to.meta.auth){
		console.log('需要登录')
		if(uni.getStorageSync('token')){
			next()
		}else{
			// next({
			// 	path:'/pages/auth/login/login',
			// })
			//重定向到登录页面
			uni.showToast({
				title:'请先登录',
				icon:'none'
			})
			setTimeout(()=>{
				uni.navigateTo({
					url:'/pages/auth/login/login'
				})
			},1500)
			
			
		}
		
	}
	else{
		next()
	}
});
// 全局路由后置守卫
router.afterEach((to, from) => {
	
    // console.log('跳转结束',router.patt)
})

export {
	router,
	RouterMount
}