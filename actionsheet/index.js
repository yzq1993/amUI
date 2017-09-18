import Vue from 'vue';
const actionsheet=(options={})=>{

	let actionsheet = Vue.extend(require('./actionsheet.vue'));

	let instance=new actionsheet({
	    data: options
	});
	instance.$mount();
	document.body.appendChild(instance.$el);
}
export default actionsheet