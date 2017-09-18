<template>
	<div class="am-radio" @click=clickVal v-if="show">
		<input type='radio' :checked=inputValue :value=val @change=setValue :disabled=disabled :style="'color:'+color"></input>
		<i :style="'background:'+color"></i>
		<span><slot></slot></span>
	</div>
</template>
<script>
	export default {
		name:'am-radio',
		data(){
			return {
				inputValue:false,
				show:false
			}
		},
		props:{
			val:[String, Number],
			value:{
				type:Boolean,
				default:false
			},
			disabled:{
				type:Boolean,
				default:false
			},
			color:{
				type:String,
				default:'#ff2d55'
			}
		},
		mounted(){
			this.show=true
		},
		created(){

		},
		methods:{
			clickVal(e){
				if(this.disabled){return false}
				this.inputValue=!this.inputValue
				if(e.target.tagName!='INPUT'){
					this.setValue()
				}
			},
			setValue(){
				if(this.$parent.$options.name=='am-radio-group'){
					this.$parent.addValue(this.val)
				}else{
					this.$emit('input',this.inputValue)
					this.$emit('change')
				}
				
			}
		},
		watch:{
			'value':function(val){
				this.inputValue=val
			}
		}
	}
</script>
<style>
.am-radio{
	position: relative;
	margin-right: 10px;
	-webkit-tap-highlight-color:transparent
}
.am-radio input{
	appearance: none;
	outline: none;
	background: none;
	margin: 0;padding:0;
	box-sizing:border-box;
	height: 20px;width: 20px;
	border:1px solid #ccc;
	border-radius: 50%;
	position: absolute;top:0;left:0;
	z-index: 5
}
.am-radio input:checked{
	border-color:currentColor;
}
.am-radio input+i{
	height: 12px;width:12px;
	position: absolute;top:4px;left:4px;
	border-radius: 50%;
	transition: transform 0.2s;
	transform: scale(0,0);
}
.am-radio input:checked+i{
	transform: scale(1,1);
}
.am-radio span{
	padding-left: 25px;
}
</style>