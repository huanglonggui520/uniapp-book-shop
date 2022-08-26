<template>
<view class="wrap">
		<u-row gutter="12">
			<u-col span="6" v-for="(item,index) in goods.length !==0 ? goods : [{},{},{},{},{},{}]">

					<goods-cart :item='item'></goods-cart>
			</u-col>
		</u-row>
		
	</view>
</template>
<script>
	export default {
		name:'recommended',
		props:['goods'],
		data() {
			return {
				
			}
		},
	}
</script>
<style scoped lang="scss">
	.wrap {
		padding: 24rpx;
	}

	.u-row {
		margin: 40rpx 0;
	}

	
</style>