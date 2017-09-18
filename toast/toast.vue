<template>
	<div class="am-toast">
		<div class="am-toast-box" :class=activeClass>
			<img v-if=icon :src=icon>
			<p>{{msg}}</p>
		</div>
	</div>
</template>
<script>
export default {
	name:'alert',
	data(){
		return{
			icon:null,
			msg:null,
			time:1500,
			activeClass:''
		}
	},
	created(){
		setTimeout(()=>{
			this.activeClass='am-toast-active'
		},0)
		setTimeout(()=>{
			this.close()
		},this.time)
	},
	mounted(){
		
	},
	methods:{
		close(){
			if(typeof this.callback == 'function'){
				this.callback()
			}
			this.$destroy(true);
        	this.$el.parentNode.removeChild(this.$el);
		}
	}
}
</script>

<style>
.am-toast{
	position: fixed;top:0;left:0;
	height: 100%;width:100%;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 10000
}
.am-toast-box{
	background: rgba(0,0,0,0.7);
	border-radius: 3px;
	padding:6px 10px;
	min-width: 80px;
	text-align: center;
	transform: scale(0,0);
	transition: transform 0.1s;
}
.am-toast-box.am-toast-active{
	transform: scale(1,1);
}


.am-toast-box p{
	margin:0;padding:0;
	color:#fff;
	font-size: 14px
}
.am-toast-box img{
	height: 100px;width:100px;
	display: block;
}
</style>