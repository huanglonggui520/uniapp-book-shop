<template>
	<view>
		<view class="details">
			<view class="topimg">
				<u-image width="100%" height="600rpx" mode="aspectFit" :src="goods.cover_url"></u-image>
			</view>
			<view class="title">
				<text>
					{{goods.title}}
				</text>
			</view>
			<view class="price">
				<text class="prices">¥ {{goods.price}}</text>
				<text class="xiaoliang">销量 {{goods.sales}}</text>
			</view>
			<view class='u-margin-top-20'>
				<u-tabs :list="list" bar-width="100" :is-scroll="false" :current="current" @change="change"></u-tabs>
			</view>
			<view class="u-margin-top-10">
				<view v-if="current===0">
					<ricetext :details='goods.details'></ricetext>
				</view>

				<view v-if='current===1'>
					<u-empty text="暂无评论" v-show="commentList.length===0" mode="list"></u-empty>
					<view class="comment" v-for="(res, index) in commentList" :key="res.id">

						<view class="left">
							<image :src="res.user.avatar_url" mode="aspectFill"></image>
						</view>
						<view class="right">
							<view class="top">
								<view class="name">{{ res.user.name }}</view>
								<view class="like" :class="{ highlight: res.isLike }">
									<view class="num">{{ res.likeNum }}</view>
									<!-- 		<u-icon v-if="!res.isLike" name="D" :size="30" color="#9a9a9a" @click="getLike(index)"></u-icon>
									d<u-icon v-if="res.isLike" name="thumb-up-fill" :size="30" @click="getLike(index)"></u-icon> -->
								</view>
							</view>
							<view class="content">{{ res.content }}</view>

							<view class="bottom">
								{{ res.created_at }}
								<view class="reply">回复</view>
							</view> -->
						</view>
					</view>
				</view>

				<view>
					<recommended :goods="like_goods" v-if='current===2'></recommended>
				</view>
			</view>
		</view>
		<view class="navigation">
			<view class="left">
				<view class="item u-text-center" @tap="collect">
					<view v-if="iscollect">
						<u-icon name="star-fill" :size="40" color="red"></u-icon>
						<view class="text u-line-1" style="color: red;">已收藏</view>
					</view>
					<view v-if="!iscollect">
						<u-icon name="star" :size="40"></u-icon>
						<view class="text u-line-1">收藏</view>
					</view>
				</view>
				<view class="item car" @tap="gocart">
					<u-badge class="car-num" :count="cartsList.length" type="error" :offset="[-3, -6]"></u-badge>
					<u-icon name="shopping-cart" :size="40" :color="$u.color['contentColor']"></u-icon>
					<view class="text u-line-1">购物车</view>
				</view>
			</view>
			<view class="right">
				<view class="cart btn u-line-1" @tap="addcarts">加入购物车</view>
				<view class="buy btn u-line-1">立即购买</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						name: '商品详情'
					},
					{
						name: '商品评论',
						count: 5
					},
					{
						name: '相关商品'
					}
				],
				current: 0,
				commentList: [],
				goods: {},
				like_goods: [],
				iscollect: null,
				cartsList: [] //购物车数据
			}
		},
		onLoad() {
			// 获取商品详情信息

			console.log('goods', this.goods)
			this.getgoods()
			this.getcartsnum()

		},
		methods: {
			gocart() {
				this.$router.push({
					path: '/pages/cart/cart'
				})
			},
			async getcartsnum() {
				// 判断是否登录，如果登录则获取购物车列表，false表示不需要跳转
				if (this.$u.utils.isAuth(false)) return
				// 获取购物车列表
				const cartslist = await this.$u.api.getcarts()
				this.cartsList = cartslist.data
			},
			change(index) {
				this.current = index;
			},
			async getgoods() {
				// 获取商品详情信息,使用路由query参数获取商品id
				const id = this.$route.query.id
				const good = await this.$u.api.getgood(id)
				this.goods = good.goods
				this.iscollect = good.goods.is_collect
				this.commentList = good.goods.comments
				this.like_goods = good.like_goods
			},
			// 收藏功能
			async collect() {
				// 判断有没有登录

				if (this.$u.utils.isAuth()) return
				// 已经登录，请求收藏取消收藏
				await this.$u.api.collect(this.goods.id)
				if (this.iscollect) {
					uni.showToast({
						title: "已取消收藏",
						icon: "success"
					})
					this.iscollect = 0
				} else {
					uni.showToast({
						title: "已收藏",
						icon: "success"
					})
					this.iscollect = 1
				}
			},
			// 添加购物车
			async addcarts() {
				const params = {
					goods_id: this.goods.id
				}
				await this.$u.api.addcarts(params)
				this.$u.toast('添加成功')
				this.getcartsnum()
			}
		}
	}
</script>
<style scoped lang="scss">
	.comment {
		display: flex;
		padding: 20rpx;

		.left {
			image {
				width: 64rpx;
				height: 64rpx;
				border-radius: 50%;
				background-color: #f2f2f2;
			}
		}

		.right {
			flex: 1;
			padding-left: 20rpx;
			font-size: 30rpx;

			.top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 10rpx;

				.name {
					color: #5677fc;
				}

				.like {
					display: flex;
					align-items: center;
					color: #9a9a9a;
					font-size: 26rpx;

					.num {
						margin-right: 4rpx;
						color: #9a9a9a;
					}
				}

				.highlight {
					color: #5677fc;

					.num {
						color: #5677fc;
					}
				}
			}

			// .content {
			// 	margin-bottom: 10rpx;
			// }
			.reply-box {
				background-color: rgb(242, 242, 242);
				border-radius: 12rpx;

				.item {
					padding: 20rpx;
					border-bottom: solid 2rpx $u-border-color;

					.username {
						font-size: 24rpx;
						color: #999999;
					}
				}

				.all-reply {
					padding: 20rpx;
					display: flex;
					color: #5677fc;
					align-items: center;

					.more {
						margin-left: 6rpx;
					}
				}
			}

			.bottom {
				margin-top: 20rpx;
				display: flex;
				font-size: 24rpx;
				color: #9a9a9a;

				.reply {
					color: #5677fc;
					margin-left: 10rpx;
				}
			}
		}
	}

	.price {
		display: flex;
		margin-top: 20rpx;
		justify-content: space-between;
	}

	.prices {
		color: crimson;
		margin-left: 15rpx;
		font-size: 35rpx
	}

	.u-content {
		margin-top: 30rpx;
	}

	.xiaoliang {
		font-size: 26rpx;
		color: #A6A4A2;
	}

	.title {
		font-size: 44rpx;
		padding: 0;
		/* 		text-align: center;
 */
		/* color: white; */
		/* background-color: #FF6A00; */
	}

	.details {
		// padding: 90rpx;
		padding: 5rpx 20rpx 110rpx 20rpx;
		// padding;
		// margin-bottom: 1000px;
	}

	.navigation {
		display: flex;
		// margin-top: 100px;
		// margin-top: 100rpx;
		bottom: 0rpx;
		right: 0rpx;
		left: 0rpx;
		position: fixed;
		justify-content: space-around;
		border: solid 2rpx #f2f2f2;
		// justify-content: space-between !important;
		// padding-right: 12rpx !important;
		background-color: #ffffff;

		// padding: 16rpx 0;
		.left {
			display: flex;
			font-size: 20rpx;

			.item {
				margin: 0 30rpx;

				&.car {
					text-align: center;
					position: relative;

					.car-num {
						position: absolute;
						top: -10rpx;
						right: -10rpx;
					}
				}
			}
		}

		.right {
			display: flex;
			font-size: 28rpx;
			align-items: center;

			.btn {
				line-height: 66rpx;
				padding: 0 30rpx;
				border-radius: 36rpx;
				color: #ffffff;
			}

			.cart {
				background-color: #ed3f14;
				margin-right: 30rpx;
				margin-left: 25rpx;
			}

			.buy {
				background-color: #ff7900;
				padding: 0 40rpx;

			}
		}
	}
</style>
