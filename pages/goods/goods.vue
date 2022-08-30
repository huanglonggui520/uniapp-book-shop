<template>
	<view class="u-wrap">

		<!-- <u-sticky class="back" offset-top='0'> -->
		<view class="u-search-box">
			<u-search @search='search' @custom="search" placeholder="请输入你想要的商品名称" v-model="keyword"></u-search>
		</view>
		<!-- </u-sticky> -->
		<view class="u-menu-wrap">
			<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop">
				<view v-for="(item,index) in categories" :key="index">
					<view v-for="(item2,index1) in item.children" :key="index1" class="u-tab-item"
						:class="[current==index+'-'+index1 ? 'u-tab-item-active' : '']" :data-current="index+'-'+index1"
						@tap.stop="swichMenu(index+'-'+index1,item2.id)">
						<text class="u-line-1">{{item2.name}}</text>
					</view>
				</view>
			</scroll-view>
			<!-- <block v-for="(item,index) in categories"  :key="index"> -->
			<!-- <view v-for="(item1,index1) in item.children" :key="index1"> -->
			<scroll-view scroll-y style="height: 100%;" @scrolltolower="addgoods" class="u-p-b-40">
				<view class="page-view">
					<view class="class-item">
						<!-- <view class="item-title">
									<text>{{item1.name}}</text>
								</view> -->
						<view>
							<u-empty text="暂时没有商品了" mode="data" margin-top='20' v-if="isempty"></u-empty>
							<view class="item-container">

								<view class="thumb-box u-text-center u-p-l-30 u-m-b-30 u-m-t-30" style="width: 50%"
									v-for="(item2, index2) in goods" :key="index2" @tap="godetails(item2.id)">
									<!-- <image class="item-menu-image" :src="item2.cover_url" mode=""></image> -->

									<u-image class="item-menu-image" :src="item2.cover_url" height="140rpx"
										width="140rpx" mode=''></u-image>
									<view class="item-menu-name u-line-1" style="width: 200rpx;">{{item2.title}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="loading" v-show="isshow">{{title}}</view>
			</scroll-view>
			<!-- </view> -->
			<!-- </block> -->

		</view>
	</view>
</template>

<script>
	// import classifyData from "@/common/classify.data.js";
	export default {
		data() {
			return {
				isshow: false,
				title: '正在加载中...',
				scrollTop: 0, //tab标题的滚动条位置
				current: 'no', // 预设当前项的值
				menuHeight: 0, // 左边菜单的高度
				goods: [],
				page: 1,
				id: null,
				keyword: '',
				isempty: false,
				categories: [],
				menuItemHeight: 0, // 左边菜单item的高度
			}
		},
		async onLoad() {
			await this.getgoods()
			console.log(this.goods)
		},
		watch: {
			keyword() {
				if (!this.keyword) {
					this.getgoods()
				}
				this.current = 'no'
			}
		},
		methods: {
			async addgoods() {
				this.isshow = true
				this.page = this.page + 1
				const goods = await this.$u.api.getgoods({
					category_id: this.id,
					page: this.page
				})
				const good = goods.goods.data
				if (!good.length) {
					this.title = '没有更多商品了...'
				}
				this.goods = [...this.goods, ...good]
				this.isshow = false
				this.title = '正在加载中...'
			},
			async search(value) {
				if (!this.keyword) return this.$u.toast('搜索内容不能为空')
				this.getgoods()
				this.current = 'no'
				// this.current='2-2-2'
			},
			godetails(id) {
				console.log(id)
				this.$router.push({
					path: '/pages/details/details',
					query: {
						id: id,
					}
				})
			},
			async getgoods(id) {
				const params = {
					category_id: id,
					title: this.keyword,
					page: this.page
				}
				const goods = await this.$u.api.getgoods(params)
				this.categories = goods.categories
				this.goods = goods.goods.data
				console.log(this.goods.length)
				this.isempty = this.goods.length ? false : true
				return goods.goods.data

			},
			getImg() {
				return Math.floor(Math.random() * 35);
			},
			// 点击左边的栏目切换
			async swichMenu(index, id) {
				this.page = 1
				this.id = id
				this.getgoods(id)
				if (index == this.current) return;
				this.current = index;
				// 如果为0，意味着尚未初始化
				if (this.menuHeight == 0 || this.menuItemHeight == 0) {
					await this.getElRect('menu-scroll-view', 'menuHeight');
					await this.getElRect('u-tab-item', 'menuItemHeight');
				}
				// 将菜单菜单活动item垂直居中
				this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
			},
			// 获取一个目标元素的高度
			getElRect(elClass, dataVal) {
				new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.' + elClass).fields({
						size: true
					}, res => {
						// 如果节点尚未生成，res值为null，循环调用执行
						if (!res) {
							setTimeout(() => {
								this.getElRect(elClass);
							}, 10);
							return;
						}
						this[dataVal] = res.height;
					}).exec();
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-wrap {
		height: calc(100vh);
		overflow-y: hidden;
		/* #ifdef H5 */
		height: calc(100vh - var(--window-top));
		/* #endif */
		display: flex;
		flex-direction: column;
	}

	.u-search-box {
		padding: 18rpx 30rpx;
	}

	.u-menu-wrap {
		flex: 1;
		display: flex;
		overflow: hidden;
	}

	.u-search-inner {
		background-color: rgb(234, 234, 234);
		border-radius: 100rpx;
		display: flex;
		align-items: center;
		padding: 10rpx 16rpx;
	}

	.u-search-text {
		font-size: 26rpx;
		color: $u-tips-color;
		margin-left: 10rpx;
	}

	.u-tab-view {
		width: 200rpx;
		height: 100%;
	}

	.u-tab-item {
		height: 110rpx;
		background: #f6f6f6;
		width: 190rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		color: #444;
		font-weight: 400;
		line-height: 1;
	}

	.u-tab-item-active {
		position: relative;
		color: #000;
		font-size: 30rpx;
		font-weight: 600;
		background: #fff;
	}

	.u-tab-item-active::before {
		content: "";
		position: absolute;
		border-left: 4px solid $u-type-primary;
		height: 32rpx;
		left: 0;
		top: 39rpx;
	}

	.u-tab-view {
		height: 100%;
	}

	.right-box {
		background-color: rgb(250, 250, 250);
	}

	.page-view {
		padding: 16rpx;
	}

	.back {
		background-color: #fff
	}

	.class-item {
		margin-bottom: 30rpx;
		background-color: #fff;
		padding: 16rpx;
		border-radius: 8rpx;
	}

	.item-title {
		font-size: 26rpx;
		color: $u-main-color;
		font-weight: bold;
	}

	.item-menu-name {
		font-weight: normal;
		font-size: 26rpx;
		color: $u-main-color;
	}

	.item-container {
		display: flex;
		flex-wrap: wrap;
	}

	.thumb-box {
		width: 33.333333%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin-top: 20rpx;
	}

	.loading {
		// width: 40%;
		// margin: 0 auto;
		// width: 40%;
		padding-left: 200rpx;
	}

	.item-menu-image {
		width: 120rpx;
		height: 120rpx;
	}
</style>
