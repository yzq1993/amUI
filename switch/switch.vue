<template>
	<input type="checkbox" class="am-switch" v-model=inputValue :style="'height:'+height+';width:'+width+';color:'+color" @change=setValue :disabled=disabled :name=name></input>
</template>
<script>
	export default {
		name:'am-switch',
		data(){
			return {
				inputValue:false
			}
		},
		props:{
			name:{
				type:String,
				default:''
			},
			value:{
				type:Boolean,
				default:true
			},
			height:{
				type:String,
				default:'30px'
			},
			width:{
				type:String,
				default:'50px'
			},
			color:{
				type:String,
				default:'#ff2d55'
			},
			disabled:{
				type:Boolean,
				default:false
			}
		},
		created(){
			this.inputValue=this.value
		},
		methods:{
			setValue(){
				this.$emit('input',this.inputValue)
				this.$emit('change')
			}
		}
	}
</script>
<style>
.am-switch{
	appearance: none;
	outline: none;
	background: none;
	border:1px solid #eee;
	border-radius: 15px;
	position: relative;
	
	background:#eee;
	box-sizing:border-box;
}
.am-switch:checked{
	border-color:currentColor;
	background: currentColor
}
.am-switch:after{
	content: '';
	height: 28px;width:28px;
	box-shadow:0 0 2px rgba(0,0,0,.4);
	position: absolute;top:0;left:0;
	border-radius: 50%;
	background: #fff;
	transition: left 0.3s;
	box-sizing:border-box;
}
.am-switch:before{
	content: '';
	position: absolute;top:0;left:0;
	height: 100%;width:100%;
	background: #fff;
	border-radius: 15px;
	transition: transform 0.3s;
	transform: scale(1,1);
	box-sizing:border-box;
}
.am-switch:checked:before{
	transform: scale(0,0);
}
.am-switch:checked:after{
	left:20px;
}
</style>