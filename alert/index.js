import Vue from 'vue';
const alert= (options)=>{
	return new Promise((resolve, reject)=>{
		let alert = Vue.extend(require('./alert.vue'));

		options.callback=resolve
		let instance=new alert({
		    data: options
		});

		instance.$mount();
		document.body.appendChild(instance.$el);
	})
}
export default  alert