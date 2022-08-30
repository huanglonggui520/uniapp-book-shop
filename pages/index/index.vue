<template>
	<view class="content">
		<!-- <tabar></tabar> -->
		<!-- 轮播图 -->
		<view class="swiper">
			<u-swiper :list="list" mode="dot" height='320' name='img_url'></u-swiper>

		</view>
		<!-- tar排序 -->
		<u-sticky :offset-top='-12'>
			<view class="u-margin-top-x == u-m-t-12">
				<u-tabs :list="tablist" font-size="30" bar-width="60" u-sticky :is-scroll="false" :current="current"
					@change="change"></u-tabs>
			</view>
		</u-sticky>

		<!-- 商品列表 -->
		<view class="wrap u-skeleton">
			<u-row gutter="16" class="u-margin-top-100">
				<u-col span="6" v-for="(item,index) in  goods">

					<goods-cart :item='item'></goods-cart>

				</u-col>
			</u-row>
		</view>
		<text class="loading" v-show="isshow">
			{{toast}}
		</text>

		<u-back-top :scroll-top="scrollTop" :icon-style="{color: '#2979ff',fontSize:'60rpx'}"></u-back-top>
		<u-skeleton :loading="isloading" :animation="true"></u-skeleton>
	</view>
</template>

<script>
	// import goods-cart from '../'
	export default {
		data() {
			return {
				list: [],
				goods: [],
				toast: '加载更多...',
				isshow: false,
				pages: 1,
				scrollTop: 0,
				isloading: true,
				tablist: [{
						name: '畅销'
					},
					{
						name: '新书'
					},
					{
						name: '精选'
					}
				],
				current: 0
			}
		},
		onReachBottom() {
			// 下拉刷新
			console.log('下拉了')
			this.isshow = true
			this.pages = this.pages + 1
			// 获取商品
			this.getdata()
			// this.isshow=false
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onLoad() {

			// console.log(this.$refs.content)
			// this.isloading=true
			this.getdata()

		},
		methods: {
			change(index) {
				// 改变tab获取商品
				this.current = index;
				this.pages = 1
				this.goods = []
				this.getdata()
			},
			//获取页面数据
			async getdata() {

				const params = {
					pages: this.pages
				}
				if (this.current === 0) {
					params.sales = 1
				} else if (this.current === 1) {
					params.new = 1
				} else if (this.current === 2) {
					params.recommend = 1
				}
				const result = await this.$u.api.getIndex(params)

				// console.log(result)
				this.list = result.slides
				// this.goods.push(result.goods.data)
				this.goods = [...this.goods, ...result.goods.data]
				// this.list=result.slides.url
				this.isloading = false
				// console.log(result.goods.data)
				this.isshow = false
				// if(result.goods.data.length)
			}
		}
	}
</script>

<style scoped>
	.loading {
		/* margin-top: 20rpx; */
		/* margin: 0rpx auto; */
		font-size: 32rpx;
		color: darkgrey;
		/* height: 100px; */
		/* transform: t; */
		/* margin-bottom: 100rpx; */
		margin-left: 40%;
		/* margin-bottom: 100px; */
		/* transform: translateX(-50%); */
		/* width: 1; */
		
	}

	.content {
		margin-bottom: 10rpx;
	}

	.sticky {
		width: 750rpx;
		height: 120rpx;
		background-color: #2979ff;
		color: #fff;
		padding: 24rpx;
	}
</style>
