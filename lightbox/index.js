import Vue from 'vue';
const lightbox= (options)=>{
	let lightbox = Vue.extend(require('./lightbox.vue'));
	let data
	if(options.src){
		data=options
	}else{
		data={list:options}
	}

	let instance=new lightbox({
	    data: data
	});

	instance.$mount();
	document.body.appendChild(instance.$el);
}
export default lightbox