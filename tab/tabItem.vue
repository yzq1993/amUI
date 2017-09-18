<template>
  <div class="am-tab-item" :class="currentActive?'am-tab-item-active':''" v-if="show">
  	<slot></slot>
  </div>
</template>
<script>
export default {
	data(){
		return {
			currentActive:false,
			show:false
		}
	},
	props:{
		label:String,
		active:{
			type:Boolean,
			default:false
		}
	},
	name:'am-tab-item',
	mounted(){
		this.show=true
	},
	methods:{
		
	}
}
</script>
<style>
.am-tab-item{
	position:absolute;top:0;left:0;
	width: 100%;
	transform: translate3d(-100%,0,0);
	transition: transform 0.2s;
}
.am-tab-item-active{
	position: relative;
	transform: translate3d(0,0,0);

}
</style>