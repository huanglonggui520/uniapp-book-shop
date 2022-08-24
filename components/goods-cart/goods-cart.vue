<template>
	<view>
		<view class="goods ">
			<u-image  width="100%" height="300rpx" mode :src="item.cover_url" class="u-skeleton-fillet">
				<view slot="error" style="font-size: 24rpx;">图片加载失败</view>
			</u-image>
			<view class="u-line-1 title u-skeleton-fillet">{{item.title ? item.title : '商称'}}</view>
			<view class="goods-money">
				<text class="goods-money-title u-skeleton-fillet">
					<text class="goods-money-f">¥</text>
					<text class="goods-money-t" >{{item.price ? item.price : '商品价格'}}</text>
				</text>
				<text class="iconfont icon-shoucang sc u-skeleton-fillet">
					 <text>{{item.collects_count ? item.collects_count : '收藏人数'}}</text>
				</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"goods-cart",
		props:{
			item:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped>
.goods-money-f{
		font-size: 16rpx;
		color: red;
		margin-right: 4rpx;
	}
	.goods-money-t{
		font-size: 18rpx;
		margin-right: 10rpx;
		color: red;
	}
	.sc {
		/* color: red; */
		font-size: 18rpx;
	}
	.sc text{
		color: #63707D;
	}
	.title{
		font-size: 22rpx;
		color: #76828E;
		margin-top: 10rpx;
	}
	.u-row{
		/* padding: 30rpx; */
		padding: 0rpx 20rpx;
	}
	.goods-money{
		line-height: 16rpx;
		margin-top: 6rpx;
		/* font-size: 16rpx */
	}
	.goods{
		/* text-align: center; */
		/* box-shadow: 10rpx 10rpx 5rpx rgb(0, 0, 0,.1); */
		box-shadow:1px 1px 5px rgb(0, 0, 0,.2);
		
		text-align: center;
		/* width: 60%; */
		padding: 26rpx;
		/* box-sizing: content-box; */
		/* margin-left: 10rpx; */
		margin-bottom: 10rpx;
		/* width: 350rpx; */
	}
	.wrap{
		margin-top: 30rpx;
		
		box-sizing: content-box;
	}
	.u-col{
		 /* padding: 3rpx !important; */
		text-align: center !important;
	}
	.wrap img{
		z-index: 999;
		object-fit: contain !important;
		/* width: 400rpx; */
		width: 60% !important; 
		/* min-width: 200rpx; */
		/* height: 40rpx !important; */
	}
</style>