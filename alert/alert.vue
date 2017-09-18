<template>
	<am-modal  width='80%' height='auto' v-model=show @input=close :shadeClose=shadeClose>
  		<div class="am-alert">
	  		<h2 class="am-title" v-if="title" >{{title}}</h2>
		  	<p class="am-text" >{{msg}}</p>
		  	<div class="am-btn" @click=success >{{btntext}}</div>
	  	</div>
  	</am-modal>
</template>
<script>
import modal from '../modal'
export default {
	name:'alert',
	data(){
		return{
			show:true,
			title:null,
			msg:null,
			btntext:'确 定',
			shadeClose:true
		}
	},
	created(){
		
	},
	mounted(){
		
	},
	components:{'am-modal':modal},
	methods:{
		success(){
			this.show=false
			this.callback()
		},
		close(){
			this.$destroy(true);
        	this.$el.parentNode.removeChild(this.$el);
		}
	}
}
</script>

<style>

.am-alert{
	background: #fff;
	text-align: center;
	border-radius: 5px;
	overflow: hidden;
	color:#333;
}

.am-alert .am-title{
	margin:0;
	padding-top: 10px;
	font-weight: bold;
	font-size:18px;
	line-height: 30px;
	box-sizing: content-box;
}
.am-alert .am-text{
	padding:10px 20px;
	font-size:16px;
	line-height: 30px;
	margin:0;
	box-sizing: content-box;
}
.am-alert .am-btn{
	color:#26a2ff;
	font-size:16px;
	line-height: 40px;
	border-top:1px solid #eee;
	-webkit-tap-highlight-color:transparent
}
</style>