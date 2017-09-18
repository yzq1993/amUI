<template>
	<div class="am-spinner" :style="'width:'+width+';height:'+height">
		<div class="am-spinner-box">
			<span @click=minus>-</span>
			<input type="number" v-model=count :readonly=readonly>
			<span @click=add>+</span>
		</div>
	</div>
</template>
<script>
	export default {
		name:'am-spinner',
		data(){
			return {
				count:''
			}
		},
		props:{
			value:{
				type:Number,
				default:1
			},
			step:{
				type:Number,
				default:1
			},
			max:{
				type:Number,
			},
			min:{
				type:Number,
			},
			disable:{
				type:Boolean,
				default:false
			},
			width:{
				type:String,
				default:'100px'
			},
			height:{
				type:String,
				default:'30px'
			},
			readonly:{
				type:Boolean,
				default:false
			}
		},

		created(){
			if(this.max&&this.value>this.max||this.min&&this.value<this.min){
				console.warn('请设置合适的默认值')
			}
			this.count=this.value
		},
		methods:{
			add(){
				if(this.disable){return false}
				if(!this.max||this.count+this.step<=this.max){
					this.count+=this.step
				}
				this.$emit('input', this.count);
			},
			minus(){
				if(this.disable){return false}
				if(!this.min||this.count-this.step>=this.min){
					this.count-=this.step
				}
				this.$emit('input', this.count);
			}
		},
	}
</script>
<style>
.am-spinner-box{
	display: flex;
	border:1px solid #eee;
	height:100%;
	box-sizing: border-box;
}
.am-spinner span{
	width: 25%;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #eee;
	color:#333;
	-webkit-tap-highlight-color:transparent
}
.am-spinner input{
	width: 50%;
	border:none;
	background: none;
	appearance: none;
	outline: none;
	text-align: center
}
</style>