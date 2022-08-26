<template>
	<view>
		<u-upload 
		:action="action" 
		 max-count="1"
		:before-upload="beforeUpload"
		:custom-btn='true'
		:show-progress='false'
		:form-data='forData'
		:multiple='false'
		 :deletable='false'
		:show-upload-list='true'
		>
		<u-avatar slot="addBtn" :src="$store.state.userInfo.avatar_url" size="140"></u-avatar>
		</u-upload>
	</view>
</template>

<script>
	export default {
		name:"oss-uploa00d",
		data() {
			return {
				action: 'http:/laravel_shop_api.luwnto.oss-cn-beijing.aliyuncs.com/',
				forData:{}
			};
		},
		async onLoad(){
			const user =await this.$u.api.getuser()
			// 将用户信息保存到vuex
			this.$store.commit('SETUSER',user)
		},
		methods: {
					beforeUpload(index, list) {
						// 只上传偶数索引的文件
						if(index % 2 == 0) return true;
						else return false;
					}
				}
	}
</script>

<style>

</style>