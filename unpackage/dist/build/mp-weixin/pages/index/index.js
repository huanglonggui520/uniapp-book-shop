(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"2ab9":function(n,e,t){"use strict";t.d(e,"b",(function(){return r})),t.d(e,"c",(function(){return o})),t.d(e,"a",(function(){return u}));var u={uSwiper:function(){return t.e("uview-ui/components/u-swiper/u-swiper").then(t.bind(null,"11a8"))},uTabs:function(){return t.e("uview-ui/components/u-tabs/u-tabs").then(t.bind(null,"4a7b"))},uRow:function(){return t.e("uview-ui/components/u-row/u-row").then(t.bind(null,"f134"))},uCol:function(){return t.e("uview-ui/components/u-col/u-col").then(t.bind(null,"5daf"))},uImage:function(){return t.e("uview-ui/components/u-image/u-image").then(t.bind(null,"3ef9"))}},r=function(){var n=this,e=n.$createElement;n._self._c},o=[]},"32c5":function(n,e,t){"use strict";(function(n){t("393d");u(t("66fd"));var e=u(t("ccc5"));function u(n){return n&&n.__esModule?n:{default:n}}wx.__webpack_require_UNI_MP_PLUGIN__=t,n(e.default)}).call(this,t("543d")["createPage"])},"45ca":function(n,e,t){},bf07:function(n,e,t){"use strict";var u=t("45ca"),r=t.n(u);r.a},ccc5:function(n,e,t){"use strict";t.r(e);var u=t("2ab9"),r=t("fabc");for(var o in r)"default"!==o&&function(n){t.d(e,n,(function(){return r[n]}))}(o);t("bf07");var c,i=t("f0c5"),a=Object(i["a"])(r["default"],u["b"],u["c"],!1,null,"10bb1f80",null,!1,u["a"],c);e["default"]=a.exports},d483:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u=r(t("a34a"));function r(n){return n&&n.__esModule?n:{default:n}}function o(n,e,t,u,r,o,c){try{var i=n[o](c),a=i.value}catch(f){return void t(f)}i.done?e(a):Promise.resolve(a).then(u,r)}function c(n){return function(){var e=this,t=arguments;return new Promise((function(u,r){var c=n.apply(e,t);function i(n){o(c,u,r,i,a,"next",n)}function a(n){o(c,u,r,i,a,"throw",n)}i(void 0)}))}}var i={data:function(){return{list:[],tablist:[{name:"畅销"},{name:"新书"},{name:"精选"}],current:0}},onReachBottom:function(){console.log("666")},onLoad:function(){var n=this;return c(u.default.mark((function e(){var t;return u.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return console.log(n),e.next=3,n.$u.api.getIndex("/api/index");case 3:t=e.sent,t.slides.forEach((function(e){n.list.push(e.img_url)})),console.log(t);case 6:case"end":return e.stop()}}),e)})))()},methods:{change:function(n){this.current=n}}};e.default=i},fabc:function(n,e,t){"use strict";t.r(e);var u=t("d483"),r=t.n(u);for(var o in u)"default"!==o&&function(n){t.d(e,n,(function(){return u[n]}))}(o);e["default"]=r.a}},[["32c5","common/runtime","common/vendor"]]]);