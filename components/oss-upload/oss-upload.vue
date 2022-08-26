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
		 width='0'
		 height='0'
		 ref="remove"
		 @on-success='onsuccess'
		 :deletable='false'
		:show-upload-list='true'
		>
		<u-avatar slot="addBtn" :src="user.avatar_url" size="140"></u-avatar>
		</u-upload>
	</view>
</template>

<script>
	// 小程序很能会没有this
	let _this={}
	export default {
		name:"oss-upload",
		data() {
			return {
				action: 'http:/laravel_shop_api.luwnto.oss-cn-beijing.aliyuncs.com/',
				forData:{},
				filename:''
			};
		},
		created(){
				_this=this
		},
		computed:{
			user(){
				return this.$store.state.userInfo
			}
		},
		async onLoad(){
			const user =await this.$u.api.getuser()
			// 将用户信息保存到vuex
			this.$store.commit('SETUSER',user)
		},
		methods: {
					async beforeUpload(index, list) {
						// 只上传偶数索引的文件
						// 获取上传到oss的参数
						// 条件编译，如果在H5端，上传文件名字在file里，则在list.name取
						// #ifdef H5
						const filename=list[0].file.name
						// #endif
						// 如果不是H5则在path里取
						// #ifndef H5
						const filename=list[0].path.name
						// #endif
						const fullname=filename.slice(filename.lastIndexOf('.'))
						// console.log(fullname)
						// 上传服务器唯一的文件名
						_this.filename=_this.$u.guid(20)+fullname
						const ossToken=await _this.$u.api.getoss()
						_this.action=ossToken.host
						// key上传的唯一图片名字
						_this.forData={
							'key' : _this.filename,
							'policy':  ossToken.policy,
							'OSSAccessKeyId': ossToken.accessid, 
							'success_action_status' : '200', //让服务端返回200,不然，默认会返回204
							'signature':ossToken.signature,
						}
						// console.log(ossToken)
						 return false;
					},
					async onsuccess(data, index, lists, name){
						const params={
							avatar:this.filename
						}
						await this.$u.api.baseavatar(params)
						const user =await this.$u.api.getuser()
						// 将用户信息保存到vuex
						this.$store.commit('SETUSER',user)
						// 移除list里图片，不让list里有预览图片,显示自定义上传按钮
						this.$refs.remove.remove(0)
						
					}
				}
	}
</script>

<style>

</style>