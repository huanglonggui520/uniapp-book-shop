<template>
	<view class="u-content">
		<u-parse :html="details"></u-parse>
	</view>
</template>

<script>
	export default {
		name:'ricetext',
		props:['details'],
		data() {
			return {
				
			}
		},
	}
</script>

<style lang="scss" scoped>
	
</style>