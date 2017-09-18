<template>
	<div class="am-loading">
		<div class="am-loading-box" :class=activeClass>
			<img v-if=icon :src=icon>
			<div v-else :class='"iconType"+iconType'></div>
			<p v-if=msg>{{msg}}</p>
		</div>
	</div>
</template>
<script>
export default {
	name:'loading',
	data(){
		return{
			icon:null,
			msg:null,
			activeClass:'',
			iconType:1
		}
	},
	created(){
		setTimeout(()=>{
			this.activeClass='am-loading-active'
		},0)
	},
	mounted(){
		
	},
	methods:{
		close(){
			this.$destroy(true);
        	this.$el.parentNode.removeChild(this.$el);
		}
	}
}
</script>

<style>
.am-loading{
	position: fixed;top:0;left:0;
	height: 100%;width:100%;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 10000
}
.am-loading-box{
	background: rgba(0,0,0,0.7);
	border-radius: 3px;
	padding:10px;
	text-align: center;
	transform: scale(0,0);
	transition: transform 0.1s;
}
.am-loading-box.am-loading-active{
	transform: scale(1,1);
}
.am-loading-box p{
	margin:0;padding:0;
	color:#fff;
	font-size: 14px;
	margin-top: 5px;
	min-width:80px;
}
.am-loading-box img{
	height: 100px;width:100px;
	display: block;
}
.am-loading-box div{
	position: relative;
	height: 40px;width:40px;
	
	margin:0 auto;
	animation: amLodingScroll 0.8s linear infinite;
}
.am-loading-box div.iconType1{
	border-radius: 50%;
	border:3px solid #fff;
}
.am-loading-box div.iconType2{
	border:3px solid #fff;
	border-right-color:transparent;
	border-radius: 50%;
}
.am-loading-box div.iconType1:after{
	content: '';
	position: absolute;top:0;left:0;
	height: 10px;width: 10px;
	border-radius: 50%;
	background: #fff
}
@keyframes amLodingScroll {
	0%{transform: rotate(0)}
	100% {transform: rotate(360deg)}
}
</style>