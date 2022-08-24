import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
//准备actions对象——响应组件中用户的动作
const actions = {
	
}
//准备mutations对象——修改state中的数据
const mutations = {
	// 保存用户信息
	SETUSER(state,value){
		
		state.userInfo=value
		console.log(state,value)
	}
}
//准备state对象——保存具体的数据
const state = {
	userInfo:{}
}

//创建并暴露store
export default new Vuex.Store({
	actions,
	mutations,
	state
})