<template>
	<view class="content">
		<!-- 轮播图 -->
		<view class="swiper">
			<u-swiper :list="list" mode="dot"></u-swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[]
			}
		},
		async onLoad() {
			console.log(this)
			const result=await this.$u.api.getIndex('/api/index')
			result.slides.forEach((item)=>{
				this.list.push(item.img_url)
			})
			
			// this.list=result.slides.url
			console.log(result.slides[0].img_url)
		},
		methods: {

		}
	}
</script>

<style>
	
</style>
