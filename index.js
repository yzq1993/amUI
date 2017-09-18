import Vue from 'vue';

import alert from './alert'
import confirm from './confirm'
import toast from './toast'
import loading from './loading'
import modal from './modal'
import picker from './picker'
import datepicker from './datepicker'
import citypicker from './citypicker'
import multipicker from './multipicker'
import {swiper,swiperItem} from './swiper'

import actionsheet from './actionsheet'
import shade from './shade'
import keyboard from './keyboard'
import spinner from './spinner'
import infinitescroll from './infinitescroll'
import amswitch from './switch'
import {radio,radioGroup} from './radio'
import {checkbox,checkboxGroup} from './checkbox'
import {tab,tabItem} from './tab'
import upload from './upload'
import lightbox from './lightbox'
import pullrefresh from './pullrefresh'
const components=[
	swiper,
	swiperItem,
	shade,
	modal,
	spinner,
	infinitescroll,
	amswitch,
	radio,
	radioGroup,
	checkbox,
	checkboxGroup,
	tab,
	tabItem,
	upload,
	pullrefresh
]


const jsComponents=[
	alert,
	confirm,
	toast,
	loading,
	picker,
	datepicker,
	citypicker,
	multipicker,
	actionsheet,
	keyboard,
	lightbox
]

export default  (Vue,options)=>{
	jsComponents.map(component => {
		Vue.prototype['$'+component.name]=component
	})
	components.map(component => {
		Vue.component(component.name, component);
	});
}

export {
	alert,
	confirm,
	loading,
	picker,
	datepicker,
	citypicker,
	multipicker,
	swiper,
	swiperItem,
	actionsheet,
	shade,
	toast,
	modal,
	keyboard,
	spinner,
	infinitescroll,
	amswitch,
	radio,
	radioGroup,
	checkbox,
	checkboxGroup,
	tab,
	tabItem,
	upload,
	lightbox,
	pullrefresh
}