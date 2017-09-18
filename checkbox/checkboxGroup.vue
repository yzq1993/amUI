<template>
	<div class="am-checkbox-group">
		<slot></slot>
	</div>
</template>
<script>
	export default {
		name:'am-checkbox-group',
		data(){
			return {
				inputValue:''
			}
		},
		props:{
			name:String,
			value:[String, Number, Array],
			color:{
				type:String,
				default:'#ff2d55'
			}
		},
		mounted(){
			this.init()
		},
		methods:{
			init(){
				this.inputValue=this.value
				this.inputValue.forEach((value)=>{
					this.update(value)
				})
			},
			update(val){
				this.$children.forEach((value)=>{
					if(value.$options.name!="am-checkbox"){return false}
					if(value.val==val){
						value.inputValue=true
					}
				})
			},
			addValue(val){
				this.inputValue.push(val)
				this.setValue()
			},
			removeValue(val){
				this.inputValue=this.inputValue.filter((value)=>{
					return value!=val
				})
				this.setValue()
			},
			setValue(){
				this.inputValue.forEach((value)=>{
					this.update(value)
				})
				this.$emit('input',this.inputValue)
				this.$emit('change')
			}
		},
		watch:{
			'value':function(){
				this.init()
			}
		}
	}
</script>
<style>
.am-checkbox-group{
	
}
</style>