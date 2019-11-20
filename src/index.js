import vueUploadfile from './vue-uploadfile.vue'

vueUploadfile.install = (Vue, options = {}) => {
  Vue.component(options.component || 'vue-uploadfile', vueUploadfile)
}

export default vueUploadfile
