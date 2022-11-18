<template>
	<view>

		<view class="u-flex user-box u-p-t-10 bo u-p-l-30 u-p-r-20 u-p-b-30 u-margin-top-20">
			<view class="u-m-r-10 avimg">
				<oss-upload></oss-upload>
			</view>
			<view class="u-flex-1">
				<!-- <view class="u-font-18 u-p-b-20">{{$store.state.userInfo.name}}</view> -->
				<view class="u-font-18 u-p-b-20">{{user.name}}</view>
				<view class="u-font-14 u-tips-color">邮箱:{{user.email}}</view>
			</view>
			<!-- <view class="u-m-l-10 u-p-10">
				<u-icon name="scan" color="#969799" size="28"></u-icon>
			</view> -->
		</view>

		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item title="个人信息" @tap="toInfo"></u-cell-item>
			</u-cell-group>
		</view>
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item title="我的订单"></u-cell-item>
				<u-cell-item title="我的收藏"></u-cell-item>
				<u-cell-item title="地址管理"></u-cell-item>
				<u-cell-item title="账号安全"></u-cell-item>
				<u-cell-item title="关于我们"></u-cell-item>
			</u-cell-group>
		</view>
		<view class="button">
			<u-button type="primary" :ripple="true" @tap="out">退出登录</u-button>
		</view>
	</view>
</template>
<script>
	import {
		mapState,
		mapMutations,
		mapAction
	} from 'vuex'

	export default {
		data() {
			return {
				// user:{},
				// action: 'http:/laravel_shop_api.luwnto.oss-cn-beijing.aliyuncs.com/',
			}
		},
		async onLoad() {
			const user = await this.$u.api.getuser()
			// 将用户信息保存到vuex
			this.$store.commit('SETUSER', user)
			// this.user=this.$store.state.userInfo

		},
		computed: {
			...mapState({
				user: 'userInfo'
			})
		},
		methods: {
			//前往个人信息页面
			toInfo() {
				this.$router.push({
					name: 'baseInfo',
					params: {
						b: "666"
					}
				})
			},
			// 退出登录
			out() {
				uni.showModal({
					content: '登录',
					success: async (res) => {
						if (res.confirm) {
							await this.$u.api.logout()
							uni.removeStorageSync('token')
							uni.showToast({
								title: '退出登录成功',
								icon: 'none'
							})
							setTimeout(() => {
								uni.reLaunch({
									url: '/pages/index/index'
								})
							}, 1000)
						}
					}
				})

			}

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #ededed;
	}

	.button {
		// margin-top: 20rpx;
		width: 90%;
		margin: 25rpx auto;
		// margin-top: 10rpx;
		// margin-bottom: 400rpx !important;
	}

	.avimg {
		// border: 50%;
		width: 140rpx;
		height: 140rpx;
		// box-shadow: ;
		border-radius: 50%;
	}

	.avimg img {
		// border: 50%;
		width: 140rpx;
		height: 140rpx;
		// box-shadow: ;
		border-radius: 50%;
	}

	.user-box {
		background-color: #fff;
	}
</style>
