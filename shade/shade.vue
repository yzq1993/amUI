<template>
  <div class="am-shade" @click.prevent=close @touchmove.prevent :class=hideClass>
  	
  </div>
</template>
<script>
export default {
	data(){
		return {
			hideClass:''
		}
	},
	name:'am-shade',
	props:{
		value:{
			type:Boolean,
			default:true
		},
	},
	watch:{
		value(val){
			if(!val){
				this.hideClass="am-shade-hide"
			}else{
				this.hideClass=""
			}
		}
	},
	methods:{
		close(){
			this.$emit('click')
		}
	}
}
</script>
<style>
.am-shade{
	position: absolute;height:100%;width:100%;
	top:0;left:0;
	background: rgba(0,0,0,0.3);
	-webkit-backdrop-filter:saturate(180%) blur(4px) brightness(2);
	opacity: 1;
	transition: opacity 0.2s;
	-webkit-tap-highlight-color:transparent
}
.am-shade-hide{
	opacity: 0
}
</style>