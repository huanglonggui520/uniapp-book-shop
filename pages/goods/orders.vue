<template>
	<view>
		<view class="preview" v-for="(item,index) in goods">
			<view>
				<u-image width="200rpx" height="200rpx" :src="https://cdn.uviewui.com/uview/example/fade.jpg"></u-image>
			</view>
			<view class="title">
				<view style="font-size: 35rpx;">javsshab安徽的</view>
				<view style="color: red;">¥44.00</view>
			</view>
			<view class="number">
				<text>×3</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"orders",
		props:['goods'],
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped lang="scss">
.zf{
		// width: 100;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		position: fixed;
		right: 20rpx;
		bottom: 20rpx;
		// display: fe;
	}
	.preview {
		margin-bottom: 100rpx;
		display: flex;
		margin-top: 20rpx;
		// position: relative;
		width: 100%;
		// padding: 20rpx;
		justify-content: center;

		.number {
			height: 100%;
			width: 50rpx;
			position: relative;

			text {
				color: red;
				position: absolute;
				// top: 0rpx;
				top: 160rpx;
				// bottom: rpx;
				// right: 10rpx;
			}

		}

		.title {
			flex: 1;
			display: flex;
			flex-direction: column;
			// align-items: sb;
			justify-content: space-between;
			margin-left: 20rpx;
		}
	}
</style>