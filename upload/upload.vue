<template>
	<div class="am-upload">
		<slot></slot>
		<input type="file" :accept=accept :name=name @change=change ref='file' :multiple=multiple> 
	</div>
</template>
<script>
	export default {
		name:'am-upload',
		data(){
			return {
				formData:null,
				file:null
			}
		},
		props:{
			name:{type:String,default:'file'},
			action:{type:String,required:true},
			accept:String,
			multiple:{type:Boolean,default:false},
			maxsize:Number,
			minsize:Number,
			auto:{type:Boolean,default:true},
			header:Object
		},
		mounted(){
			
		},
		methods:{
			result(xhr){
				let name
				if(this.multiple){
					name=[]
					this.file.forEach((value)=>{
						name.push(value.name)
					})
				}else{
					name=this.file.name
				}
				return {
					status:xhr.status,
					name:name,
					data:JSON.parse(xhr.responseText)
				}
			},
			limitSize(){
				var Is=true;
				if(this.multiple){
					this.file.forEach((value)=>{
						if(!Is){return false}
						Is=this.compareSize(value.size)
					})
				}else{
					Is=this.compareSize(this.file.size)
				}

				return Is
			},
			compareSize(value){
				if((this.maxsize&&value/1000>this.maxsize)||(this.minsize&&value/1000<this.minsize)){
					return false
				}else{
					return true
				}
			},
			submit(){
				if(!this.limitSize()){
					console.error('大小超过限制')
					return false
				}

				var xhr=new XMLHttpRequest();
				if(this.header){
					Object.keys(this.header).forEach((value)=>{
						xhr.setRequestHeader(value,this.header[value]);
					})
				}
				xhr.onreadystatechange=()=>
				{	
					if(xhr.readyState==4){
						if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
							this.$emit('success',this.result(xhr))
						}else{
							this.$emit('error',this.result(xhr))
						}
					}
				}
				xhr.open("post",this.action,true);
				xhr.send(this.formData);
			},
			change(e){
				this.formData = new FormData();
				if(this.multiple){
					this.file=Array.from(this.$refs.file.files)
					this.file.forEach((value,index)=>{
						this.formData.append(this.name, value);
					})
				}else{
					this.file=this.$refs.file.files[0]
					this.formData.append(this.name, this.file);
				}
				this.$emit('preview',{file:this.file,submit:this.submit})
				if(this.auto){
					this.submit()
				}
				
			}
		}
	}
</script>
<style>
.am-upload{
	appearance: none;
	outline: none;
	background: none;
	position: relative;
	box-sizing:border-box;
	
	position: relative;
	
	
	-webkit-tap-highlight-color:transparent
}
.am-upload input{
	opacity: 0;
	font-size:0;
	position: absolute;top:0;left:0;
	width: 100%;height: 100%
}
</style>