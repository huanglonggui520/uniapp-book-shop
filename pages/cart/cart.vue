<template>
	<view style="padding-bottom: 100rpx;">
		<view class="cart" v-for="(item,index) in cartslist" :key="index">
			<view class="carts">
				<view class="check">
					<u-checkbox-group>
						<u-checkbox @change="checkboxChange(item)" shape="circle" v-model="item.is_checked"
							:name="item.goods.title">
						</u-checkbox>
					</u-checkbox-group>
				</view>
				<view>
					<u-image width="200rpx" height="200rpx" mode='aspectFit' :src="item.goods.cover_url"></u-image>
				</view>
				<view class="title">
					<view>
						<view class="stitle">{{item.goods.title}}</view>
						<view class="gcart">{{item.goods.description}}</view>
					</view>
					<view class="btm">
						<view>
							<text style="font-size: 16rpx;color: #D71836;">¥</text>
							<text style="font-size: 24rpx;color: #D71836;">{{item.goods.price}}</text>
						</view>
						<view class="buttom">
							<u-number-box v-model="item.num" @change="valChange"></u-number-box>
							<view @tap="deletecart(item)">
								<u-icon name="trash-fill" color='red' size='40rpx'></u-icon>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="zf">
			<view class="zf-l">
				<u-checkbox-group>
					<u-checkbox @change="checkboxChangezf" v-model="zfvalue" shape="circle" name='all'>全选</u-checkbox>
				</u-checkbox-group>
			</view>
			<view class="zf-r">
				<view>合计</view>
				<view style="color: #D71836;">¥{{totalmoney}}</view>
				<view class="zf-g" @tap="sumit"> &nbsp;去结算</view>
			</view>
		</view>

	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

				check: [],
				cartslist: [],
				value: 0,
				zfvalue: false
			}
		},
		computed: {
			totalmoney() {
				var total = 0
				this.cartslist.forEach((item) => {
					if (item.is_checked) {
						total += item.num * item.goods.price
					}
				})
				return total
			}
		},
		async onShow() {
			await this.getcartlist()
			// console.log('catrslist', this.cartslist)
		},
		methods: {
			sumit(){
				this.$router.push({
					path:'/pages/preview/preview'
				})
			},
			async getcartlist() {
				const cartslist = await this.$u.api.getcartslist()
				this.cartslist = cartslist.data
			},
			checkboxChangezf(e) {
				// 点击让其全选或者全不选
				if (e.value) {
					this.cartslist.forEach((item) => {
						item.is_checked = 1
					})
					// console.log(this.cartslist)
				} else {
					this.cartslist.forEach((item) => {
						item.is_checked = 0
					})
				}
			},
			add(item) {
				// console.log(item)
			},
			// 选中某个复选框时，由checkbox时触发
			checkboxChange(e) {
				// // console.log(e.is_checked)
				// const arr=this.cartslist.filter(item =>{
				// 	return item.is_checked
				// })
				// console.log(arr)
			},
			valChange(e) {
				// console.log('当前值为: ' + e.value)
			},
			async deletecart(e) {
				await this.$u.api.deletecart(e.id)
				uni.showToast({
					title: '删除成功！',
					icon: "success"
				})
				this.getcartlist()
			}
		}
	}
</script>

<style scoped lang="scss">
	.cart {
		padding: 30rpx;
		margin-top: 20rpx;

		.carts {
			display: flex;
			margin-bottom: 100rpx;
			// border: 1rpx solid #B9B7B6;
			// border-radius: 10rpx;
			// background-color: red;
			align-items: center;
			justify-content: space-around;

			.check {}

			.title {
				display: flex;
				// background-color: red;
				// flex: 1;
				width: 400rpx;
				height: 200rpx;
				flex-direction: column;
				justify-content: space-between;
				align-items: flex-start;

				.stitle {
					font-size: 25rpx;
				}

				.gcart {
					font-size: 24rpx;
					color: #84817F;
				}

			}
		}
	}

	.zf-g {
		background-color: red;
		padding: 0rpx 30rpx;
		border-radius: 35rpx;
		margin-left: 20rpx;
	}

	.zf {
		display: flex;
		line-height: 50rpx;
		align-items: center;
		padding: 0rpx 30rpx;
		position: fixed;
		width: 100%;
		background-color: #FCF8F8;
		bottom: 50px;
		// right: 20rpx;
		justify-content: space-between;

		.zf-r {
			display: flex;
		}
	}

	.buttom {
		display: flex;
		align-items: center;
	}

	.btm {
		display: flex;
		// background-color: red ;
		width: 370rpx;
		justify-content: space-between;
		// font:  sans-serif;
		// flex: 1;
		// justify-content: ;
	}
</style>
