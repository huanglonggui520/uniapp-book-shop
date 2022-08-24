<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">欢迎登录</view>
			<u-form-item label="邮箱" label-width='160rpx'><input class="u-border-bottom" type="text" v-model="email" placeholder="请输入邮箱" /></u-form-item>
			<u-form-item label="密码" label-width='160rpx'><input class="u-border-bottom" type="password" v-model="password" placeholder="请输入密码" /></u-form-item>
			<button @tap="submit" :style="[inputStyle]" class="getCaptcha">登录</button>
			<view class="alternative">
				<view class="password">找回密码</view>
				<view class="issue" @tap="register">注册账号</view>
			</view>
		</view>
		
</view>

</template>

<script>
export default {
	data() {
		return {
			email: 'test@a.com',
			password:'123123'
		}
	},
	onLoad(){
		this.$store.dispatch('setuser')
		
	},
	computed: {
		inputStyle() {
			let style = {};
			if(this.$u.test.email(this.email) && this.password) {
				style.color = "#fff";
				style.backgroundColor = this.$u.color['warning'];
			}
			return style;
		}
	},
	methods: {
		// 登录
		async submit() {
			
			if(!this.$u.test.email(this.email) || !this.password) return 
			const params={
				email:this.email,
				password:this.password
			}
			const result =await this.$u.api.login(params)
			//缓存token
			uni.setStorageSync('token', result.access_token);
			uni.showToast({
				title:'登录成功',
				icon:"success"
			})
			// 请求用户信息
			const user =await this.$u.api.getuser()
			// 将用户信息保存到vuex
			this.$store.commit('SETUSER',user)
			// 回源跳转
			const path=uni.getStorageSync('topath')
			setTimeout(()=>{
					uni.redirectTo({
						url:path==='/pages/auth/login/login' ? '/pages/home/home' : path
					})
			},1500)
		},
		register(){
			uni.navigateTo({
				url:'/pages/auth/register/register'
			})
		}
		
	}
};
</script>

<style lang="scss" scoped>
	.u-border-bottom{
		margin-bottom: 20rpx !important;
		font-size: 35rpx;
	}
.wrap {
	font-size: 28rpx;
	.content {
		width: 600rpx;
		margin: 80rpx auto 0;

		.title {
			text-align: center;
			font-size: 60rpx;
			font-weight: 500;
			margin-bottom: 100rpx;
		}
		input {
			text-align: left;
			margin-bottom: 10rpx;
			padding-bottom: 6rpx;
		}
		.tips {
			color: $u-type-info;
			margin-bottom: 60rpx;
			margin-top: 8rpx;
		}
		.getCaptcha {
			background-color: rgb(253, 243, 208);
			color: $u-tips-color;
			border: none;
			font-size: 30rpx;
			padding: 12rpx 0;
			
			&::after {
				border: none;
			}
		}
		.alternative {
			color: $u-tips-color;
			display: flex;
			justify-content: space-between;
			margin-top: 30rpx;
		}
	}
	.buttom {
		.loginType {
			display: flex;
			padding: 350rpx 150rpx 150rpx 150rpx;
			justify-content:space-between;
			
			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				color: $u-content-color;
				font-size: 28rpx;
			}
		}
		
		.hint {
			padding: 20rpx 40rpx;
			font-size: 20rpx;
			color: $u-tips-color;
			
			.link {
				color: $u-type-warning;
			}
		}
	}
}
</style>
