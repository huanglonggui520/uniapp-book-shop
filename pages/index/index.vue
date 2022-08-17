<template>
	<view class="content">
		<u-button>月落</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		async onLoad() {
			const r=await this.$u.get('https://api.shop.eduwork.cn/api/index')
			
				console.log(r)
			
			
		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
