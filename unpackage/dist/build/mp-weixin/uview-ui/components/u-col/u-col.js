(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uview-ui/components/u-col/u-col"],{"09e5":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u={name:"u-col",props:{span:{type:[Number,String],default:12},offset:{type:[Number,String],default:0},justify:{type:String,default:"start"},align:{type:String,default:"center"},textAlign:{type:String,default:"left"},stop:{type:Boolean,default:!0}},data:function(){return{gutter:20}},created:function(){this.parent=!1},mounted:function(){this.parent=this.$u.$parent.call(this,"u-row"),this.parent&&(this.gutter=this.parent.gutter)},computed:{uJustify:function(){return"end"==this.justify||"start"==this.justify?"flex-"+this.justify:"around"==this.justify||"between"==this.justify?"space-"+this.justify:this.justify},uAlignItem:function(){return"top"==this.align?"flex-start":"bottom"==this.align?"flex-end":this.align}},methods:{click:function(t){this.$emit("click")}}};e.default=u},"3f8c":function(t,e,n){},"45ad":function(t,e,n){"use strict";var u=n("3f8c"),i=n.n(u);i.a},"5daf":function(t,e,n){"use strict";n.r(e);var u=n("da71"),i=n("9ec9");for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);n("45ad");var a,f=n("f0c5"),s=Object(f["a"])(i["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],a);e["default"]=s.exports},"9ec9":function(t,e,n){"use strict";n.r(e);var u=n("09e5"),i=n.n(u);for(var r in u)"default"!==r&&function(t){n.d(e,t,(function(){return u[t]}))}(r);e["default"]=i.a},da71:function(t,e,n){"use strict";var u;n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return u}));var i=function(){var t=this,e=t.$createElement,n=(t._self._c,Number(t.gutter));t.$mp.data=Object.assign({},{$root:{m0:n}})},r=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uview-ui/components/u-col/u-col-create-component',
    {
        'uview-ui/components/u-col/u-col-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("5daf"))
        })
    },
    [['uview-ui/components/u-col/u-col-create-component']]
]);