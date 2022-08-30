<template>
	<view style="padding: 20rpx;">

		<view @tap='goaddress'>
			<u-cell-group >
				<u-cell-item icon="map">
					<view slot='title'>
						<view class="u-line-1" style="color: black;font-size: 30rpx;width: 550rpx;">{{showaddress}}</view>
						<view>{{name}} {{phone}}</view>
					</view>
				</u-cell-item>
			</u-cell-group>
		</view>
		<view class="preview" v-for="(item,index) in carts">
			<view>
				<u-image width="200rpx" height="200rpx" :src="item.goods.cover_url"></u-image>
			</view>
			<view class="title">
				<view style="font-size: 35rpx;">{{item.goods.title}}</view>
				<view style="color: red;">¥{{item.goods.price}}</view>
			</view>
			<view class="number">
				<text>×{{item.num}}</text>
			</view>
			
		</view>
		<!-- <orders :goods='goods'></orders> -->
		<!-- <u-divider></u-divider> -->
		<view class="zf">
			<view>
				<text>合计：</text>
				<text style="color: red;margin-right: 20rpx;">¥{{total}}</text>
			</view>
			<view>
				<u-button type="error" :custom-style="customStyle" shape="circle" @tap='submit'>提交订单并支付</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				customStyle:{
					width:'300rpx'
				},
				carts:[],
				address:[],
				showaddress:"",
				city:'',
				county:'',
				name:'',
				province:'',
				phone:null,
				total:0,
				addressid:null,
				goods:{},
			}
		},
		async onShow(){
			// 拿到地址
			let toatlm=0
			const addresslist=await this.$u.api.getpreview()
			this.carts=addresslist.carts
			let {city,address,county,phone,name,province,id}=addresslist.address[0]
			this.showaddress=province+city+county+address
			this.name=name
			this.phone=phone
			this.addressid=id
			// 计算价格
			this.carts.forEach(item =>{
				toatlm=toatlm+item.num*item.goods.price
			})
			this.total=toatlm
			// console.log('090',addresslist)
		},
		methods: {
			async submit(){
				
				const orders=await this.$u.api.submitorder({address_id:this.addressid})
					let orderid=orders.order_no
					// console.log(orders)
					this.$router.replace({
						name:"showorders",
						params:{
							id:orders.id
						}
					})
					
			},
			goaddress(){
				console.log('0000')
				uni.navigateTo({
					url:'/pages/address/address'
				})
			}
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
