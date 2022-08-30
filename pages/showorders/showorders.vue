<template>
	<view class="show">
		<view class="top">
			<view style="font-size: 35rpx;">
				共计9件商品
			</view>
			<view>
				<u-tag text="未付款" type="error" mode='dark'/>
			</view>
		</view>
		<view style="margin-top: 40rpx;">
			<view class="title-n">{{name}} {{phone}}</view>
			<view class="address u-line-1">{{address}}</view>
		</view>
		<view class="preview" v-for="(item,index) in goods">
			<view>
				<u-image width="200rpx" height="200rpx" :src="item.cover_url"></u-image>
			</view>
			<view class="title">
				<view style="font-size: 35rpx;">{{item.title}}</view>
				<view style="color: red;">¥{{title.price}}</view>
			</view>
			<view class="number">
				<text>×3</text>
			</view>
		</view>
		<view style="font-size: 35rpx;">
			<view>订单编号：{{order_no}}</view>
			<view>下单时间：{{time}}</view>
			<!-- <view>商品</view> -->
		</view>
		<view class="zf">
			<view>
				<text>合计：</text>
				<text style="color: red;margin-right: 20rpx;">¥23</text>
			</view>
			<view>
				<u-button type="error"  shape="circle" >立即付款</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orders:{},
				address:'',
				phone:null,
				goods:[],
				order_no:'',
				time:'',
				name:'',
				status:null
			}
		},
		async onLoad(e){
				const order=this.$route.params.id
				const orders=await this.$u.api.showorders(order)
				const {goods,id,created_at,status,address}=orders
				console.log(address)
				this.address=address.province+address.city+address.county
				this.phone=address.phone
				this.name=address.name
				this.time=created_at
				this.goods=goods
				this.status=status
				console.log(orders)
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
	.title-n{
		font-size: 35rpx;
		color: #000;
	}
	.address{
		font-size: 35rpx;
		width: 650rpx;
		color: #727070;
		margin-bottom: 50rpx;
	}
	.top{
		display: flex;
		margin-top: 20rpx;
		justify-content: space-between;
	}
	.show{
		padding: 20rpx;
	}
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
