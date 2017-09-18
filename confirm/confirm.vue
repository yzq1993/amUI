<template>
  	<am-modal width='80%' height='auto' @input=close v-model=show :shadeClose=shadeClose>
  		<div class="am-confirm">
	  		<h2 v-if="title" class="am-title">{{title}}</h2>
	  		<p class="am-text">{{msg}}</p>
	  		<div class="am-btns"><button @click=success>确 定</button><button @click=cancel>取 消</button></div>
  		</div>
  	</am-modal>
</template>
<script>
import modal from '../modal'
export default {
	name:'confirm',
	data(){
		return{
			show:true,
			title:null,
			msg:null,
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
			this.callback(true)
		},
		cancel(){
			this.show=false
			this.callback(false)
		},
		close(){
			this.$destroy(true);
        	this.$el.parentNode.removeChild(this.$el);
		}
	}
}
</script>

<style>
.am-confirm{
	background: #fff;
	text-align: center;
	border-radius: 5px;
	overflow: hidden;
	color:#333;
}
.am-confirm .am-title{
	margin:0;
	padding-top: 10px;
	font-weight: bold;
	font-size:18px;
	line-height: 30px;
	box-sizing: content-box;
}
.am-confirm .am-text{
	padding:10px 20px;
	font-size:16px;
	line-height: 30px;
	margin:0;
	box-sizing: content-box;
}
.am-confirm .am-btns{
	font-size:16px;
	line-height: 40px;
	border-top:1px solid #eee;
	display: flex;
}
.am-confirm .am-btns button{
	width: 50%;height:40px;
	appearance: none;
	border-radius: 0;
	background: none;
	outline: none;
	border:none;
	-webkit-tap-highlight-color:transparent
}
.am-confirm .am-btns button:first-child{
	background: #ff2d55;
	color:#fff;
}
</style>