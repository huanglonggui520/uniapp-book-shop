<!-- <template>
	<view>
		<router-view></router-view>
	</view>
</template> -->

<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
	// 轮播图指示灯颜色
	.u-indicator-item-dot-active{
		background-color: #5589FA !important
	}
	

</style>
