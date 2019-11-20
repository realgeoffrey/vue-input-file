import vueInputFile from './vue-input-file.vue'

vueInputFile.install = (Vue, options = {}) => {
  Vue.component(options.component || 'vue-input-file', vueInputFile)
}

export default vueInputFile
