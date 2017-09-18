
import Vue from 'vue';
let keyboard = Vue.extend(require('./keyboard.vue'));
let instance
export default {
	name:'keyboard',
	open:(options)=>{
		return new Promise((resolve)=>{
			options.success=resolve
			instance=new keyboard({
			    data: options
			});
			instance.$mount();
			document.body.appendChild(instance.$el);
		})
		
	},
	close:_=>{
		if(!instance){return false}
		instance.show=false;
	}
}