<template>
	<div class="am-swiper" @touchmove.prevent=touchmove @touchstart=touchstart @touchend=touchend @click=click>
		<div class="am-swiper-main"  :class="activeClass" @transitionend=changeEnd ref="main" :style="
			'transform: translate3d('+(option.direction=='column'?'0,'+translate+'px':translate+'px,0')+',0);\
			flex-direction:'+(option.direction=='column'?'column':'row')+';\
			transition-duration:'+speed.now+'ms'
		">
			<div class="am-swiper-item am-swiper-item-loop" v-if="option.loop"  v-for="item in loop.start" key='key' 
				v-html="item.html" :class="activeIndex==item.index?'am-swiper-item-active':''"
				:style="
					'margin-right:'+option.spaceBetween+'px;\
					width:'+(option.slidesPerView?100/option.slidesPerView:100)+'%'
			"></div>
			<slot></slot>
			<div class="am-swiper-item am-swiper-item-loop" v-if="option.loop" v-for="item in loop.end" key='key' 
				v-html="item.html" :class="activeIndex==item.index?'am-swiper-item-active':''"
				:style="
					'margin-right:'+option.spaceBetween+'px;\
					width:'+(option.slidesPerView?100/option.slidesPerView:100)+'%'
			"></div>
		</div>
		<ul class="am-swiper-pagination" v-if="option.pagination">
			<li v-for="item in items" :class="activeIndex==item.index?'am-swiper-pagination-active':''" v-if="!item.loop"></li>
		</ul>

		<div class="am-swiper-scrollbar" v-if="option.scrollbar" ref="scrollbar" :class="scrollbar.class" v-show="!scrollbar.hide">
			<div class="am-swiper-scrollbar-drag" :style="
				'transform: translate3d('+scrollbar.left+'px,0,0);\
				width:'+scrollbar.width+'px;\
				transition-duration:'+speed.now+'ms'
			"></div>
		</div>
	</div>
</template>
<script>
	export default {
		name:'am-swiper',
		data(){
			return {
				items:[],
				itemsLen:0,
				start:{
					move:'',//滑动时手指的位置
					translate:'',//触摸时开始的位移
					position:'',//触摸时手指开始的位置,
					index:''//触摸时activeIndex值
				},
				speed:{
					init:300,
					now:0
				},
				activeClass:'',
				touchmoveflag:true,
				
				autoIntel:null,

				loop:{
					start:[],
					end:[],
					num:1
				},

				istouch:false,
				activeIndex:0,
				translate:0,//获取位移
				changeStatus:false,//是否在过渡
				scrollNextStatus:false,//是否在向后滑
				scrollPrveStatus:false,//是否在向前滑
				lockSwipesStatus:false,//是否锁定Swiper
				lockTouchStatus:false,//是否禁止触摸
				isBegin:false,//是否最后一个
				isEnd:false,//是否第一个
				scrollbar:{
					width:0,
					left:0,//滚动条位移
					hide:false,//滚动条是否隐藏
					class:'',
				},
			}
		},
		props:['option'],
		created(){
			
		},
		mounted(){
			this.updateItems()
			this.init()
		},
		methods:{
			init(){
				this.activeIndex=this.option.initslide||0
				this.lockTouchStatus=!!this.option.lockTouch
				
				setTimeout(()=>{
					this.setTranslate(this.activeIndex,0)
					if(this.activeIndex==0){
						this.isBegin=true
					}else if(this.activeIndex==this.itemsLen-1){
						this.isEnd=true
					}
					this.$emit('init',this.swiper())//初始化
				},0)
				this.startAutoplay()
			},
			updateItems(callback){
				this.$nextTick(()=>{
					this.items=this.$children.map((value,index)=>{
						if(value.$options.name == 'am-swiper-item'){
							return {
								index:index,
								size:this.updataItemSize(value.$el),
								position:this.updataItemPosition(value.$el)
							}
						}
					})
					this.itemsLen=this.items.length
					this.setLoopItem()
					this.scrollbarInit()
					if(typeof callback=='function'){
						callback()
					}
				})
			},
			updataItemPosition($el){
				let position=this.option.direction=='column'?$el.offsetTop:$el.offsetLeft
				if(this.option.slidesOffsetBefore){
					position=position-this.option.slidesOffsetBefore
				}
				if(this.option.centeredSlides){
					let mainWidth=this.$refs.main.clientWidth;
					position=position-(mainWidth-this.updataItemSize($el))/2
				}
				return position
			},
			updataItemSize($el){
				return this.option.direction=='column'?$el.clientHeight:$el.clientWidth
			},
			update(){
				if(this.changeStatus){
					console.error('请在过渡结束后更改item')
				}
				this.updateItems(()=>{
					if(this.activeIndex==0){
						this.isBegin=true
						this.isEnd=false
					}else if(this.activeIndex==this.itemsLen-1){
						this.isBegin=false
						this.isEnd=true
					}else{
						this.isBegin=false
						this.isEnd=false
					}
				})
			},
			setLoopItem(){
				if(this.option.loop){
					let m=this.$children.filter(value=>value.$options.name=='am-swiper-item'),len=m.length,start,end
					for(let i=this.option.loopItem||this.loop.num;i>0;i--){
						start=m[len-i].$el
						end=m[i-1].$el
						this.loop.start.push({html:start.innerHTML,index:len-i})
						this.loop.end.unshift({html:end.innerHTML,index:i-1})
					}
					this.$nextTick(()=>{
						let arr=this.$refs.main.children,isLoop,indexItem=0
						this.items=Array.from(arr).map((value)=>{
							isLoop=value.className.indexOf('am-swiper-item-loop')
							return {
								index:isLoop==-1?this.items[indexItem++].index:null,
								loop:isLoop!=-1,
								size:this.updataItemSize(value),
								position:this.updataItemPosition(value)
							}
						})
					})
				}
			},
			changeEnd(callback){
				if(this.option.loop){
					this.setTranslate(this.activeIndex,0)
				}

				if(this.changeStatus){
					this.$emit('changeEnd',this.swiper())//切换结束
					this.changeStatus=false
				}
				if(this.scrollNextStatus){
					this.$emit('scrollNextEnd',this.swiper())//向后切换结束
					this.scrollNextStatus=false
				}else if(this.scrollPrveStatus){
					this.$emit('scrollPrveEnd',this.swiper())//向前切换结束
					this.scrollPrveStatus=false
				}
				if(this.isBegin){
					this.$emit('reachBeginEnd',this.swiper())
				}
				if(this.isEnd){
					this.$emit('reachLastEnd',this.swiper())
				}
				this.hideScrollbar()
				if(typeof callback =='function'){
					callback()
				}
			},
			startAutoplay(){
				if(this.option.autoplay){
					if((this.option.speed||this.speed.init)>=this.option.autoplay){console.error('自动切换时间需大于切换速度');}
					this.autoIntel=setInterval(()=>{
						if(this.activeIndex==this.itemsLen-1&&!this.option.loop){return false}
						this.scrollNext()
						this.$emit('autoplay',this.swiper())//自动切换
					},this.option.autoplay)
				}
			},
			stopAutoplay(){
				if(this.option.autoplay&&this.autoIntel){
					clearInterval(this.autoIntel)
				}
			},
			touchstart(event){
				if(this.lockTouchStatus){return false}
				if(this.changeStatus){
					let size=this.option.loopItem||this.loop.num
					if(this.activeIndex<size||this.activeIndex>=this.itemsLen-size){
						this.setTranslate(this.activeIndex,0)
					}
				}
				this.showScrollbar()
				this.activeClass=''
				if(this.option.direction=='column'){
					this.start.position=event.targetTouches[0].pageY
				}else{
					this.start.position=event.targetTouches[0].pageX 
				}
				
				this.stopAutoplay()
				this.start.translate=-this.translate
				this.start.index=this.activeIndex
				this.$emit('touchstart',this.swiper(),event)//碰触
			},
			touchmove(event){
				if(this.lockTouchStatus){return false}
				if(this.lockSwipesStatus){return false}
				if(!this.touchmoveflag){return false}
				this.touchmoveflag=false
				setTimeout(()=>{
					this.speed.now=0
					if(this.option.direction=='column'){
						this.start.move=event.targetTouches[0].pageY
					}else{
						this.start.move=event.targetTouches[0].pageX 
					}

					this.translate=-(this.start.translate+this.start.position-this.start.move)
					this.moveScrollbar(this.start.position-this.start.move)
					if(this.option.touchChange){
						this.activeIndex=this.getIndex(this.translate)
						this.setLoopIndex()
					}
					this.touchmoveflag=true
					this.$emit('touchmove',this.swiper(),event)//手指滑动
				},15)
			},
			touchend(event){
				if(this.lockTouchStatus){return false}
				setTimeout(()=>{
					this.scrollTo(this.getIndex(this.translate))
					this.startAutoplay()
					this.$emit('touchend',this.swiper(),event)//手指释放
				},20)
			},
			getIndex(left){
				let m=0
				this.items.forEach((value,index)=>{
					if(left<-(value.position-value.size/2)){
						m=index
					}
				})
				if(this.option.loop){
					m=m-(this.option.loopItem||this.loop.num)
				}
				return m
			},
			setLoopIndex(){
				if(this.option.loop){
					if(this.activeIndex>=this.itemsLen){
						this.activeIndex=this.activeIndex-this.itemsLen
					}else if(this.activeIndex<=-1){
						this.activeIndex=this.itemsLen+this.activeIndex
					}
				}
			},
			scrollTo(index,callback,speed){

				if(this.lockSwipesStatus){return false}
				this.showScrollbar()
				

				speed=speed||this.option.speed||this.speed.init
				this.setTranslate(index,speed)
				this.setLoopIndex()
				let preIndex=this.activeIndex
				this.emitEvent(preIndex)
				this.setScrollbar(preIndex)
				if(typeof callback =='function'){
					callback()
				}
			},
			emitEvent(preIndex){
				if(this.start.index==preIndex){return false}
				if(this.activeIndex==0){
					this.isBegin=true
					this.isEnd=false
					this.$emit('reachBeginStart',this.swiper())//开始切换到第一个
				}else if(this.activeIndex==this.itemsLen-1){
					this.isEnd=true
					this.isBegin=false
					this.$emit('reachLastStart',this.swiper())//开始切换到最后一个
				}else{
					this.isEnd=false
					this.isBegin=false
				}
				this.changeStatus=true
				this.$emit('changeStart',this.swiper())//开始切换

				if(this.activeIndex==preIndex+1){
					this.scrollNextStatus=true
					this.$emit('scrollNextStart',this.swiper())//开始向后切换
				}else if(this.activeIndex==preIndex-1){
					this.scrollPrveStatus=true
					this.$emit('scrollPrveStart',this.swiper())//开始向前切换
				}
			},
			setTranslate(index,speed){
				if(speed){
					this.speed.now=speed
					this.activeClass='am-swiper-item-move'
				}else{
					this.speed.now=0
					this.activeClass=''
				}
				this.activeIndex=index
				if(this.option.loop){
					index=index+(this.option.loopItem||this.loop.num)
					if(index>=this.items.length){
						index=this.items.length-1
						
					}
					this.translate=-this.items[index].position
				}else{
					let scrollWidth=this.option.direction=='column'?this.$refs.main.scrollHeight:this.$refs.main.scrollWidth
					let clientWidth=this.option.direction=='column'?this.$refs.main.clientHeight:this.$refs.main.clientWidth

					if(this.option.slidesOffsetAfter){scrollWidth=scrollWidth+this.option.slidesOffsetAfter}
					if(clientWidth+this.items[index].position<=scrollWidth){
						this.translate=-this.items[index].position
					}else{
						this.translate=clientWidth-scrollWidth
					}
				}
			},
			scrollbarInit(){
				if(this.option.scrollbar){
					this.scrollbar.width=this.$refs.scrollbar.clientWidth/this.itemsLen
					this.scrollbar.left=this.scrollbar.width*this.activeIndex
					this.scrollbar.hide=this.option.scrollbarHide
				}
			},
			setScrollbar(index){
				if(this.option.scrollbar){
					this.scrollbar.left=this.scrollbar.width*this.activeIndex
				}
			},
			moveScrollbar(left){
				if(this.option.scrollbar){
					let main=this.option.direction=='column'?this.$refs.main.scrollHeight:this.$refs.main.scrollWidth
					this.scrollbar.left=this.scrollbar.width*this.start.index+left/main*this.$refs.scrollbar.clientWidth
				}
			},
			hideScrollbar(){
				if(this.option.scrollbar&&this.option.scrollbarHide){
					this.scrollbar.class='hide'
				}
			},
			showScrollbar(){
				if(this.option.scrollbar){
					if(this.scrollbar.hide){
						this.scrollbar.hide=false
					}
					this.scrollbar.class=''
				}
			},
			scrollNext(callback){
				if(this.itemsLen>=this.activeIndex+1){
					this.scrollTo(this.activeIndex+1,callback)
				}
			},
			scrollPrve(callback){
				if(this.activeIndex>=0){
					this.scrollTo(this.activeIndex-1,callback)
				}
			},
			lockSwipes(){
				this.lockSwipesStatus=true
			},
			unlockSwipes(){
				this.lockSwipesStatus=false
			},
			lockTouch(){
				this.lockTouchStatus=true
			},
			unlockTouch(){
				this.lockTouchStatus=false
			},
			click(){
				this.$emit('click',this.swiper())
			},
			swiper(){
				return{
					activeIndex:this.activeIndex,
					translate:this.translate,
					isBegin:this.isBegin,
					isEnd:this.isEnd,
					scrollTo:this.scrollTo,
					scrollNext:this.scrollNext,
					scrollPrve:this.scrollPrve,
					stopAutoplay:this.stopAutoplay,
					startAutoplay:this.startAutoplay,
					lockSwipes:this.lockSwipes,
					unlockSwipes:this.unlockSwipes,
					lockTouch:this.lockTouch,
					unlockTouch:this.unlockTouch,
					update:this.update,
					changeStatus:this.changeStatus,//是否在过渡
					scrollNextStatus:this.scrollNextStatus,//是否在向后滑
					scrollPrveStatus:this.scrollPrveStatus,//是否在向前滑
					lockSwipesStatus:this.lockSwipesStatus,//是否锁定Swiper
				}
			}
		}
	}
</script>
<style>
	.am-swiper{
		overflow: hidden;
		position: relative;
	}
	.am-swiper-main{
		display: flex;
		flex-direction: row;
		height: 100%;width: 100%;
	}
	.am-swiper-main.am-swiper-item-move{
		transition: transform 0.3s;
	}
	.am-swiper-pagination{
		position: absolute;bottom:10px;
		left:50%;
		transform: translateX(-50%);
		list-style: none;
		display: flex;
		margin: 0;
		padding: 0
	}
	.am-swiper-pagination li{
		height:8px;width:8px;
		background: #000;
		opacity: 0.3;
		margin:6px;
		border-radius: 50%
	}
	.am-swiper-pagination li.am-swiper-pagination-active{
		background: #007aff;
		opacity: 1;
	}
	.am-swiper-scrollbar{
		position: absolute;left:2%;bottom:3px;
		height: 4px;width: 96%;
		border-radius: 8px;
		background: rgba(0,0,0,0.1);
		overflow: hidden;
		transition: opacity 0.3s;
	}
	.am-swiper-scrollbar.hide{
		opacity:0;
	}
	.am-swiper-scrollbar-drag{
		position: absolute;top:0;left:0;
		width:150px;height: 100%;
		border-radius: 8px;
		background: rgba(0,0,0,0.3);
	}
</style>