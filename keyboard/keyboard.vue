<template>
	<am-modal width='100%' position='bottom' bottom v-model=show @input=remove :shadeClose=shadeClose>
		<div class="am-keyboard">
		  	<h2>{{title}}</h2>
		  	<ul class="am-keyboard-psd">
		  		<li v-for="item in value">{{item}}</li>
		  	</ul>
		  	<ul class="am-keyboard-box">
		  		<li v-for="(item,key) in num" :key=key @click=clickBoxs(key,item)
		  			:class="(key==9?'am-keyboard-close':'')+(key==11?'am-keyboard-cancel':'')"
		  		>{{item}}</li>
		  	</ul>
	  	</div>
	</am-modal>
</template>
<script>
import modal from '../modal'
export default {
	name:'keyboard',
	data(){
		return{
			title:'请输入密码',
			password:'',
			isClose:true,
			show:true,
			shadeClose:false,
			value:[],
			num:[],
			disorder:false,//打乱
			size:4
		}
	},
	components:{'am-modal':modal},
	created(){
		this.initValue()
		this.createArr()
	},
	methods:{
		initValue(){
			for(let i=0;i<this.size;i++){
				this.value.push('')
			}
		},
		createArr(){
			for(let i=0;i<10;i++){
				this.num.push(i)
			}
			if(this.disorder){
				this.num.sort(function(){ return 0.5 - Math.random()})
			}
			let a=this.num[9]
			this.num.splice(9,1,'',a,'')
		},
		clickBoxs(key,item){
			if(this.password.length==this.size){return false}
			if(key==9){
				this.show=false
			}else if(key==11){
				this.value.splice(this.password.length-1,1,'')
				this.password=this.password.slice(0,this.password.length-1)
			}else{
				this.password+=item
				this.value.splice(this.password.length-1,1,item)
				if(this.password.length==this.size){
					this.success(this.password)
					return false
				}
			}
		},
		remove(){
			this.$destroy(true);
        	this.$el.parentNode.removeChild(this.$el);
		}
	}
}
</script>

<style>
.am-keyboard{
	color:#333;
	line-height: 50px;
	background: #f7f7f7
}
.am-keyboard h2{
	padding: 0;margin:0;
	font-size: 16px;
	font-weight: blod;
	text-align: center;

}
.am-keyboard ul{
	padding:0;margin:0;
	list-style: none
}
.am-keyboard ul.am-keyboard-psd{
	height: 50px;
	margin:0 20px 10px;
	background:#fff;
	border:1px solid #f1f1f1;
	display: flex;
	box-sizing: content-box;
}
.am-keyboard-psd li{
	position: relative;
	flex:1;
	text-align: center;
	line-height: 50px;

}
.am-keyboard-psd li:after{
	content: '';
	position: absolute;top:25%;right:0;
	height: 50%;width:1px;
	background: #f1f1f1

}
.am-keyboard-box{
	display: flex;
	flex-wrap: wrap;
}

.am-keyboard-box li{
	background: #fff;
	box-sizing: border-box;
	width: 33.3%;
	height: 50px;
	text-align: center;
	font-size: 18px;
	border-top:1px solid #f1f1f1;
	border-left:1px solid #f1f1f1;
	-webkit-tap-highlight-color:transparent
}
.am-keyboard-box .am-keyboard-close{
	background: #f7f7f7
}
.am-keyboard-box .am-keyboard-close:after{
	content: '取 消';
	font-size: 14px;
}
.am-keyboard-box .am-keyboard-cancel{
	background: #f7f7f7;
	display: flex;
	justify-content: center;
	align-items: center;
}
.am-keyboard-box .am-keyboard-cancel:after{
	content: '';
	font-size: 14px;
	display: block;
	height: 24px;width:24px;
	background: url('./cancel.svg') no-repeat;
	background-size: 100% 100%;
}
</style>