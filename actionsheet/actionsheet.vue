<template>
	<am-modal width='100%' position='bottom' bottom v-model=show @input=close :shadeClose=shadeClose>
	  	<ul class="am-actionsheet">
	  		<li v-for='item in value' @click=action(item)>{{item.name}}</li>
	  		<li v-if=cancel @click=clickCancel class="cancel">{{cancel===true?'取消':cancel}}</li>
	  	</ul>
	</am-modal>
  
</template>
<script>
import modal from '../modal'
export default {
	name:'actionsheet',
	data(){
		return{
			show:true,
			value:[],
			cancel:'取消',
			shadeClose:true
		}
	},
	created(){
		
	},
	components:{'am-modal':modal},
	methods:{
		action(item){
			if(typeof item.callback=='function'){
				item.callback()
			}
			if(!item.stay){
				this.show=false
			}
		},
		clickCancel(){
			this.show=false
		},
		close(){
			this.$destroy(true);
        	this.$el.parentNode.removeChild(this.$el);
		}
	}
}

</script>

<style>
.am-actionsheet{

	line-height: 45px;
	font-size: 16px;
	color:#999;
	background: #f1f1f1;
	list-style: none;
	margin:0;padding:0;
	text-align: center;
}

.am-actionsheet li{
	background: #fff;
	border-top: 1px solid #f1f1f1;
	-webkit-tap-highlight-color:transparent
}
.am-actionsheet li:first-child{
	border-top:0;
}
.am-actionsheet .cancel{
	margin-top: 10px
}
</style>