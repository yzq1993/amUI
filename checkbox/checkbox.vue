<template>
	<div class="am-checkbox" @click=clickVal v-if="show">
		<input type='checkbox' :checked=inputValue :value=val @change=setValue :disabled=disabled :style="'color:'+color"></input>
		<i></i>
		<span><slot></slot></span>
	</div>
</template>
<script>
	export default {
		name:'am-checkbox',
		data(){
			return {
				inputValue:false,
				show:false
			}
		},
		props:{
			val:[String, Number],
			name:String,
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
			this.inputValue=this.value
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
				if(this.$parent.$options.name=='am-checkbox-group'){
					if(this.inputValue){
						this.$parent.addValue(this.val)
					}else{
						this.$parent.removeValue(this.val)
					}
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
.am-checkbox{
	position: relative;
	margin-right: 10px;
	-webkit-tap-highlight-color:transparent
}
.am-checkbox input{
	appearance: none;
	outline: none;
	background: none;
	margin: 0;padding:0;
	box-sizing:border-box;
	height: 20px;width: 20px;
	border:1px solid #ccc;
	border-radius: 2px;
	position: absolute;top:0;left:0;
	z-index: 5
}
.am-checkbox input:checked{
	border-color:currentColor;
	background: currentColor
}
.am-checkbox input+i{
	height: 15px;width:8px;
	position: absolute;top:1px;left:6px;
	transform: rotate(45deg);
	border:2px solid #fff;
	border-top: 0;
	border-left: 0;
	box-sizing:border-box;
	transition: opacity 0.2s;
	opacity:0;
	z-index: 10
}
.am-checkbox input:checked+i{
	opacity:1;
}
.am-checkbox span{
	padding-left: 25px;
}
</style>