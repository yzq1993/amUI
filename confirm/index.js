import Vue from 'vue';

const confirm = (options)=>{
	
	return new Promise((resolve, reject)=>{
		let confirm = Vue.extend(require('./confirm.vue'));
		options.callback=(status)=>{
			if(status){
				resolve()
			}else{
				reject()
			}
		}
		let instance=new confirm({
		    data: options
		});

		instance.$mount();
		document.body.appendChild(instance.$el);
	})
}
export default confirm
