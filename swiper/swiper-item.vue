<template>
	<div class="am-swiper-item" :class="active?'am-swiper-item-active':''" :style=styleObject>
		<slot></slot>
	</div>
</template>
<script>
	export default {
		name:'am-swiper-item',
		data(){
			return {
				active:false,
				styleObject:{
					width:'',
					height:'',
					'margin-bottom':'',
					'margin-right':'',
				}
			}
		},
		created(){
			this.setActive()
			this.setNum()
			this.setSpace()
		},
		methods:{
			setSpace(){
				let space=this.$parent.option.spaceBetween
				if(!space){return false}
				if(this.$parent.option.direction=='column'){
					this.styleObject['margin-bottom']=space+'px'
				}else{
					this.styleObject['margin-right']=space+'px'
				}
			},
			setActive(){
				let index=this.$parent.activeIndex
				if(this==this.$parent.$children[index]){
					this.active=true
				}else{
					this.active=false
				}
			},
			setNum(){
				let num=this.$parent.option.slidesPerView
				if(!num){return false}
				if(this.$parent.option.direction=='column'){
					this.styleObject['height']=100/num+'%'
				}else{
					this.styleObject['width']=100/num+'%'
				}
			}
		},
		watch:{
			'$parent.activeIndex':function(){
				this.setActive()
			},
			'$parent.option.slidesPerView':function(){
				this.setNum()
			},
			'$parent.option.spaceBetween':function(){
				this.setSpace()
			},
			'$parent.option.direction':function(){
				for(let item in this.styleObject){
					this.styleObject[item]=''
				}
				this.setNum()
				this.setSpace()

			},
		}

	}
</script>
<style>
	.am-swiper-item{
		width:100%;height: 100%;
		flex-shrink:0;
	}
</style>