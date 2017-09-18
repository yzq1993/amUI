import Vue from 'vue';
const toast= (options)=>{
	let toast = Vue.extend(require('./toast.vue'));

	if(typeof options !='object'){
		options={msg:options}
	}
	let instance=new toast({
	    data: options
	});

	instance.$mount();
	document.body.appendChild(instance.$el);
	
}
export default toast