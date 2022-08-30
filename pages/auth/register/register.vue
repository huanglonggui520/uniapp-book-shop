<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">欢迎注册商城</view>
			<u-form-item label="昵称" label-width='160rpx'>
				<u-input v-model="name" type="text" :border="false" />
			</u-form-item>
			<u-form-item label="邮箱" label-width='160rpx'>
				<u-input v-model="email" type="text" :border="false" />
			</u-form-item>
			<u-form-item label="密码" label-width='160rpx'>
				<u-input v-model="password" type="password" :border="false" />
			</u-form-item>
			<u-form-item label="确认密码" label-width='160rpx'>
				<u-input v-model="password_confirmation" type="password" :border="false" />
			</u-form-item>
			<!-- <u-input v-model="value" :type="type" :border="border" /> -->
			<!-- <u-upload :action="action" on-success='success'  on-error='error' ref="uUpload" :file-list="fileList" max-count="1" :auto-upload="false"></u-upload> -->
			<button @tap="submit" class="getCaptcha">注册</button>

		</view>

	</view>

</template>

<script>
	export default {
		data() {
			return {
				email: '2764564604@a.com',
				password: '123123',
				name: '云游天下',
				// header:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYXBpLnNob3AuZWR1d29yay5jblwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTY2MTMxNjM0MCwiZXhwIjoxNjYxNjc2MzQwLCJuYmYiOjE2NjEzMTYzNDAsImp0aSI6IktqMDVaczFVa0tnUUtQTzMiLCJzdWIiOjIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.QbIJ9dx7GJ2oYxD59oDUMbwhcnH1JpfRFpDGhwcL_yY',
				password_confirmation: '123123',
			}
		},
		onLoad() {


		},
		computed: {

		},
		methods: {
			// 注册
			async submit() {
				uni.showLoading({
					title: '加载中...'
				});
				if (this.$u.test.isEmpty(this.name)) return this.$u.toast('昵称不能为空')
				if (this.$u.test.isEmpty(this.email) && this.$u.test.email(this.email)) return this.$u.toast('邮箱格式不正确')
				if (this.$u.test.isEmpty(this.password)) return this.$u.toast('密码不能为空')
				if (this.$u.test.isEmpty(this.password_confirmation)) return this.$u.toast('确认密码不能为空')
				if (this.password !== this.password_confirmation) return this.$u.toast('两次密码不一致')
				const params = {
					name: this.name,
					email: this.email,
					password_confirmation: this.password_confirmation,
					password: this.password_confirmation
				}
				const result = await this.$u.api.register(params)
				uni.hideLoading();
				// console.log('3322',result)
				uni.showToast({
					title: '注册成功',
					icon: 'success'
				})
				setTimeout(() => {
					uni.redirectTo({
						url: '/pages/auth/login/login'
					});
				}, 1500)

			}

		}
	};
</script>

<style lang="scss" scoped>
	.u-border-bottom {
		margin-bottom: 25rpx !important;
		font-size: 35rpx;
	}

	.wrap {
		font-size: 28rpx;
	
	.content {
			width: 600rpx;
			margin: 80rpx auto 0;

			.title {
				text-align: left;
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
				background-color: #5589FA;
				color: white;
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
				justify-content: space-between;

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
