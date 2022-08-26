<template>
	<view>
		
		
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item :arrow='false' title="头像">
					<u-avatar :src="user.avatar_url"></u-avatar>
				</u-cell-item>
			</u-cell-group>
		</view>
		
		<view class="u-m-t-20" title-width='30'>
			<u-cell-group>
				
				<u-cell-item   title="昵称" title-width='200'  @tap='count = 1 '><u-input @blur='basename' v-model="name" focus type="text" placeholder='请输入你的昵称' :border="false" v-if="count===1"/><text v-else>{{name}}</text></u-cell-item>
				<!-- <u-cell-item  title="邮箱"  title-width='200' @tap='count = 2'><u-input v-model="email" @blur='basename' focus type="text" :border="false" placeholder='请输入邮箱' v-if="count===2"/><text v-else>{{email}}</text></u-cell-item> -->
				<!-- <u-cell-item  title="密码"></u-cell-item> -->
				<!-- <u-cell-item  title="手机号" title-width='200' @tap='count = 3'><u-input v-model="phone" @blur='basename' focus type="number" :border="false" v-if="count===3" placeholder='请输入号码'/><text v-else>{{phone}}</text></u-cell-item> -->
			</u-cell-group>
		</view>
		<view class="button">
			<!-- <u-button type="primary" :ripple="true" @tap='submit'>确定</u-button> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
				show:true,
				name:'',
				user:{},
				count:0,
				phone:null,
				email:''
			}
		},
		computed:{
		// ...mapState[{sum:'userInfo'}]	
		},
		async onLoad(option) {
			// console.log('opt',this.$route)
			const user =await this.$u.api.getuser()
			this.$store.commit('SETUSER',user)
			this.user=this.$store.state.userInfo
			this.name=this.user.name
			this.email=this.user.email
			this.phone=this.user.phone
		},
		methods: {
				 basename1(){
					this.count=0
					console.log(this.name)
					// const params={
					// 	name:this.name
					// }
					
					// const result = await this.$u.api.baseuser(params)
					// const user =await this.$u.api.getuser()
					// // 将用户信息保存到vuex
					// this.user=user
					// this.$store.commit('SETUSER',user)
				},
				async basename(){
					this.count=0
					const params={
						name:this.name
					}
					const result = await this.$u.api.baseuser(params)
					const user =await this.$u.api.getuser()
					// 将用户信息保存到vuex
					
					this.user=user
					// user={}
					this.$store.commit('SETUSER',user)
					
					// console.log('+++',this.$store.state.userInfo)
				}
				}
		}
	
</script>

<style lang="scss">
page{
	background-color: #ededed;
}
.button{
	// margin-top: 20rpx;
	width: 90%;
	margin: 20px auto;
}

.user-box{
	background-color: #fff;
}
</style>
