<template>
	<div class="am-lightbox" >
		<div class="am-lightbox-head">{{cureent}}/{{src.length}}</div>
		<am-swiper :option=swiper @changeStart=changeStart  @click=close>
			<am-swiper-item v-for="item in src" key="key" >
				<div class="am-lightbox-img">
					<img :src="item" >
				</div>
			</am-swiper-item>
		</am-swiper>
		<p v-if="list.length">{{list[cureent-1].msg}}</p>
		<p v-else>{{msg}}</p>
	</div>
</template>
<script>
import {swiper,swiperItem} from '../swiper'
export default {
	name:'lightbox',
	data(){
		return{
			cureent:1,
			list:[],
			swiper:{
				loop:true,
				loopItem:2,
			},
			src:[],
			msg:''
		}
	},
	components:{'am-swiper':swiper,'am-swiper-item':swiperItem},
	created(){
		if(this.list.length>0){
			this.src=this.list.map((value)=>{
				return value.src
			})
		}
		document.body.style.overflowY = 'hidden'
	},
	mounted(){
		
	},
	methods:{
		changeStart(e){
			this.cureent=e.activeIndex+1
		},
		close(){
			this.$destroy(true);
        	this.$el.parentNode.removeChild(this.$el);
        	document.body.style.overflowY = 'auto'
		}
	}
}
</script>

<style>
.am-lightbox{
	position: fixed;top:0;left:0;
	height: 100%;width: 100%;
	background: #000;
	z-index: 10000;
	display: flex;
	flex-direction: column;
}
.am-lightbox-head{
	height: 40px;
	text-align: center;
	color: #fff;
	font-size: 14px;
	line-height: 40px
}
.am-lightbox .am-swiper{
	flex:1;
}
.am-lightbox .am-swiper-item{
	display: flex;
	flex-direction: column;
}
.am-lightbox .am-lightbox-img{
	flex:1;
}


.am-lightbox img{
	max-width: 100%;
	max-height: 100%;
	display: block;
}
.am-lightbox p{
	background: rgba(0,0,0,0.3);
	color: #fff;
	margin:0;
	width: 100%;
	min-height: 30px;
	padding:0 10px;
	box-sizing: border-box;
	line-height: 30px
}
</style>