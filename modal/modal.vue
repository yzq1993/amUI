<template>
  <div class="am-modal" v-show="show" :style=modelStyle()>
  	<am-shade @click=closeShade v-model="shadeShow"></am-shade>
  	<div class="am-modal-box" :class="'am-model-'+position+' '+activeClass" :style=boxStyle() @transitionend=changeEnd>
  		<slot></slot>
  	</div>
  </div>
</template>
<script>
import shade from '../shade'
export default {
	data(){
		return {
			show:false,
			activeClass:null,
			style:{
				modal:{},
				box:{}
			},
			shadeShow:true
		}
	},
	name:'am-modal',
	components:{'am-shade':shade},
	props:{
		value:{
			type:Boolean,
			default:true
		},
		position:{
			validator(value) {
                return ['top','bottom', 'center', 'left', 'right'].indexOf(value) > -1;
            },
            default: 'center'
		},
		height: {
            type: String,
            default: 'auto'
        },
        width: {
            type: String,
            default: 'auto'
        },
        shadeClose:{
        	type:Boolean,
			default:true
        },
        top:{
        	type:[Boolean,String],
			default:false
        },
        right:{
        	type:[Boolean,String],
			default:false
        },
        bottom:{
        	type:[Boolean,String],
			default:false
        },
        left:{
        	type:[Boolean,String],
			default:false
        }
	},
	watch:{
		value(val){
			if(val){
				this.show=true
				this.addActive()
				
			}else{
				this.close()
			}
		}
	},
	created(){
		this.show=this.value
		if(this.show){
			this.addActive()
		}
	},
	methods:{
		isFalse(value){
			return !(value===false)
			//return value === ''||value==='0'||value!==false
		},
		modelStyle(){
			let obj={}
			if(!this.isFalse(this.top)&&!this.isFalse(this.right)&&!this.isFalse(this.bottom)&&!this.isFalse(this.left)){
				obj={display:'flex','justify-content':'center','align-items':'center'}
			}
			return obj
		},
		boxStyle(){
			let obj={}
			obj={height:this.height,width:this.width}
			if(this.isFalse(this.top)||this.isFalse(this.right)||this.isFalse(this.bottom)||this.isFalse(this.left)){
				obj.position = 'absolute'
				if(this.isFalse(this.top)){
					obj.top=this.top||0
				}
				if(this.isFalse(this.right)){
					obj.right=this.right||0
				}
				if(this.isFalse(this.bottom)){
					obj.bottom=this.bottom||0
				}
				if(this.isFalse(this.left)){
					obj.left=this.left||0
				}
			}
			return obj
		},
		addActive(){
			document.body.style.overflowY = 'hidden'
			this.activeClass=''
			this.shadeShow=true
			setTimeout(()=>{
				this.activeClass='am-model-active-'+this.position
			},0)
		},
		changeEnd(){
			if(!this.activeClass){
				this.show=false
				this.$emit('input',false)
				document.body.style.overflowY = 'auto'
			}
		},
		close(){
			this.shadeShow=false
			this.activeClass=''
		},
		closeShade(){
			if(!this.shadeClose){return false}
			this.close()
		}
	}
}
</script>
<style>
.am-modal{
	position: fixed;top:0;left:0;
	height:100%;width:100%;
	
	z-index: 10000;
}
.am-modal-box{
	transition: transform 0.2s;
	overflow: hidden;
}
.am-modal-box.am-model-center{
	transform: scale(0,0);

}
.am-modal-box.am-model-active-center{
	transform: scale(1,1);
}
.am-modal-box.am-model-top{
	transform: translate3d(0,-1000px,0);
}
.am-modal-box.am-model-active-top{
	transform: translate3d(0,0,0);
}
.am-modal-box.am-model-bottom{
	transform: translate3d(0,1000px,0);
}
.am-modal-box.am-model-active-bottom{
	transform: translate3d(0,0,0);
}
.am-modal-box.am-model-left{
	transform: translate3d(-1000px,0,0);
}
.am-modal-box.am-model-active-left{
	transform: translate3d(0,0,0);
}
.am-modal-box.am-model-right{
	transform: translate3d(1000px,0,0);
}
.am-modal-box.am-model-active-right{
	transform: translate3d(0,0,0);
}
</style>