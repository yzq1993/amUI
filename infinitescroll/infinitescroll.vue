<template>
	<div class="am-infinitescroll" ref="list" @scroll=scrollBottom() :style="'height:'+height">
		<slot name='list'></slot>
		<slot name='loadingTip' v-if="isLoading"></slot>
		<div class="am-infinitescroll-loadingTip" v-if="!$slots.loadingTip&&isLoading"></div>
		<slot name='doneTip' v-if="isDone"></slot>
		<div class="am-infinitescroll-doneTip" v-if="!$slots.doneTip&&isDone">{{doneTip}}</div>
	</div>
</template>
<script>
	export default {
		name:'am-infinitescroll',
		data(){
			return {
				isLoading:false,
				isDone:false,
				flag:true,
				clientHeight:0,
				distanceNum:0
			}
		},
		props:{
			distance:{
				default:'40px'
			},
			height:{
				required:true,
				default:'100%'
			},
			doneTip:{
				type:String,
				default:'没有其他数据了'
			}
		},
		mounted(){
			console.log(this.$slots)
			this.clientHeight=this.$refs.list.clientHeight
			this.distanceNum=this.toNum(this.distance)
		},
		methods:{
			toNum(val){
				return parseInt(val)
			},
			finishLoad(){
				this.isLoading=false
			},
			loadedDone(){
				this.isLoading=false
				this.isDone=true
			},
			scrollBottom(){
				if (this.isLoading || this.isDone) return false;
				if(!this.flag){return false}
				this.flag=false;
				setTimeout(()=>{
					let top=this.$refs.list.scrollTop,
						height=this.$refs.list.scrollHeight
					if(height-this.clientHeight-top<=this.distanceNum){
						this.$emit('infinite',{finishLoad:this.finishLoad,loadedDone:this.loadedDone})
						this.isLoading=true
					}
					this.flag=true;
				},100)
			}
		}
	}
</script>
<style>
.am-infinitescroll{
	overflow-y: auto;
	-webkit-overflow-scrolling:touch
}
.am-infinitescroll-loadingTip{
	border:1px solid #999;
	border-radius: 50%;
	height:20px;width: 20px;
	border-right-color: transparent;
	margin:0 auto;
	animation: aminfinitescroll 0.8s linear infinite;
}
.am-infinitescroll-doneTip{
	font-size: 12px;
	color:#ccc;
	text-align: center;
	line-height: 20px
}
@keyframes aminfinitescroll {
	0%{transform: rotate(0)}
	100% {transform: rotate(360deg)}
}
</style>