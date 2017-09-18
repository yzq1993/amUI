<template>
	<div class="am-pullrefresh" :style="{height:height}">
		<div class="am-pullrefresh-list"  :style="{height:height}" ref="list" @touchmove.stop=touchmove @touchend=touchend>
			<div class="am-pullrefresh-tip am-pullrefresh-pullTip" v-if="status==1||status==2">{{status==1?pullTip:releTip}}</div>
			<div class="am-pullrefresh-tip am-pullrefresh-loading" v-if="status==3"></div>
			<div class="am-pullrefresh-tip am-pullrefresh-doneTip" v-if="status==4">{{doneTip}}</div>
			<slot name='list'></slot>
		</div>
	</div>
</template>
<script>
	export default {
		name:'am-pullrefresh',
		data(){
			return {
				canLoad:false,
				status:1,
				scrollTop:0,
				setInterval:null,
				isScroll:false
			}
		},
		props:{
			height:{
				required:true,
				default:'100%'
			},
			pullTip:{
				type:String,
				default:'下拉即可刷新...'
			},
			releTip:{
				type:String,
				default:'释放即可刷新...'
			},
			doneTip:{
				type:String,
				default:'加载完成'
			},
			distan:{
				type:Number,
				default:40
			}
		},
		mounted(){
			this.$refs.list.scrollTop=this.distan
		},
		methods:{
			isSupport(){
				return '-webkit-overflow-scrolling' in document.documentElement.style
			},
			touchmove(){
				this.scrollTop=this.$refs.list.scrollTop
				if(!this.canLoad){
					if(this.scrollTop<=-10){
						this.status=2
					}else{
						this.status=1
					}
				}
			},
			touchend(){
				if(this.status==2){
					this.canLoad=true
					this.status=3
					this.$refs.list.scrollTop=0
					this.$emit('refresh',{loaded:this.loaded})
				}
				if(this.status==1&&this.$refs.list.scrollTop<this.distan){
					this.scrollTo(this.distan)
					setTimeout(()=>{
						this.$refs.list.scrollTop=this.distan
					},1000)
				}
			},
			loaded(){
				this.status=4
				setTimeout(()=>{
					this.scrollTo(this.distan,()=>{
						this.status=1
						this.canLoad=false
					})
				},500)
			},
			scrollTo(h,cb){
				let top=this.$refs.list.scrollTop
				let d=(top-h)/10
				if(this.setInterval){clearInterval(this.setInterval)}
				this.setInterval=setInterval(()=>{
					top-=d
					if(top<=h){
	                    this.$refs.list.scrollTop=top
	                }else{
	                	this.$refs.list.scrollTop=h
	                	clearInterval(this.setInterval)
	                	if(typeof cb =='function'){
	                		cb()
	                	}
	                }
				},10)
			}
		}
	}
</script>
<style>
.am-pullrefresh{
	overflow:hidden;
}
.am-pullrefresh-list{
	overflow-y: auto;
	-webkit-overflow-scrolling:touch;
}
.am-pullrefresh-tip{
	font-size: 12px;
	color:#ccc;
	text-align: center;
	line-height: 20px;
	margin-bottom: 20px
}
.am-pullrefresh-loading{
	border:1px solid #999;
	border-radius: 50%;
	height:20px;width: 20px;
	border-right-color: transparent;
	margin:0 auto 20px;
	animation: ampullrefreshscroll 0.8s linear infinite;
}
@keyframes ampullrefreshscroll {
	0%{transform: rotate(0)}
	100% {transform: rotate(360deg)}
}
</style>