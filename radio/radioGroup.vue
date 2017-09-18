<template>
	<div class="am-radio-group">
		<slot></slot>
	</div>
</template>
<script>
	export default {
		name:'am-radio-group',
		data(){
			return {
				inputValue:''
			}
		},
		props:{
			name:String,
			value:[String, Number],
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
				this.update(this.inputValue)
			},
			update(val){
				this.$children.forEach((value)=>{
					if(value.$options.name!="am-radio"){return false}
					if(value.val==val){
						value.inputValue=true
					}else{
						value.inputValue=false
					}
				})
			},
			addValue(val){
				this.inputValue=val
				this.setValue()
			},
			setValue(){
				this.update(this.inputValue)
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
.am-radio-group{
	
}
</style>