<template>
  <div class="am-tab">
  	<div class="am-tab-head">
  		<span v-for="item in label" :class="activeIndex==item._uid?'am-tab-head-active':''" @click=tabChange(item._uid) key='key'>{{item.label}}</span>
  	</div>
  	<div class="am-tab-main">
  		<slot></slot>
  	</div>
  </div>
</template>
<script>
export default {
	data(){
		return {
			label:[],
			activeIndex:0
		}
	},
	name:'am-tab',
	mounted(){
		this.setLabel()
	},
	methods:{
		setLabel(){
			this.$children.forEach((value)=>{
				if(value.$options.name!='am-tab-item'){return false}
				this.label.push({label:value.label,active:value.active,_uid:value._uid})
				if(value.active){
					this.activeIndex=value._uid
					this.changeItem(value._uid)
				}else if(this.label.length==1){
					this.activeIndex=value._uid
					this.changeItem(value._uid)
				}
			})
		},
		tabChange(key){
			this.activeIndex=key
			this.changeItem(key)
		},
		changeItem(id){
			this.$children.forEach((item)=>{
				if(item.$options.name!='am-tab-item'){return false}
				if(id==item._uid){
					item.currentActive=true
				}else{
					item.currentActive=false
				}
			})
		}
	}
}
</script>
<style>
.am-tab{
	background: #fff;
	color:#333;
}
.am-tab-head{
	display: flex;
	flex-direction: row;
	height: 40px;
	border-bottom:1px solid #f1f1f1;
}
.am-tab-head span{
	flex:1;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	-webkit-tap-highlight-color:transparent
}
.am-tab-head-active{
	color: #ff2d55;
	position: relative;
}
.am-tab-head-active:after{
	content: '';
	position:absolute;top:-1px;left:10%;
	height: 100%;width: 80%;
	border-bottom: 2px solid #ff2d55
}
.am-tab-main{
	width: 100%;
	overflow: hidden;
}
</style>