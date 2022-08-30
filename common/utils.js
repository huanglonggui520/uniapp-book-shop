
const install = (Vue, vm) => {
	// 判断是否登录
	const isAuth = (isgologin=true) => {
		if(!uni.getStorageSync("token")){
		
			if(isgologin){
				uni.showToast({
					title:'请新登录',
					icon:"none"
				})
				setTimeout(()=>{
					uni.navigateTo({
						url:'/pages/auth/login/login'
					})
				},1000)
			}
			return true
		}else{
			return false
		}
	};
	vm.$u.utils = {isAuth};
}
export default {
	install
}