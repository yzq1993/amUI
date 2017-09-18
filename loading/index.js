import Vue from 'vue';
let loading = Vue.extend(require('./loading.vue'));
let instance
export default {
	name:'loading',
	open:(options)=>{
		if(typeof options !='object'){
			options={msg:options}
		}
		instance=new loading({
		    data: options
		});
		instance.$mount();
		document.body.appendChild(instance.$el);
	},
	close:_=>{
		if(!instance){return false}
		instance.$destroy(true);
		instance.$el.parentNode.removeChild(instance.$el);
	}
}