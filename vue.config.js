//vue.config.js
const TransformPages = require('uni-read-pages')
const {webpack} = new TransformPages()
// 使用uni-read-pages可以先pages中添加属性
module.exports = {
	configureWebpack: {
		plugins: [
			new webpack.DefinePlugin({
				ROUTES: webpack.DefinePlugin.runtimeValue(() => {
					const tfPages = new TransformPages({
						// 向pages.json添加新的属性
						includes: ['path', 'name', 'aliasPath','meta','params','query']
					});
					return JSON.stringify(tfPages.routes)
				}, true )
			})
		]
	}
}