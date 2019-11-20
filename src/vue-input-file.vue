<template>
  <span
    @click="$refs.inputDom.click()"
  >
    <!-- 上传 -->
    <input
      :accept="accept"
      @change="change($event.target.files[0], $event.target)"
      ref="inputDom"
      style="display: none;"
      type="file"
    >

    <!-- 展示 -->
    <slot :base64="base64" :blobUrl="blobUrl" :file="file">
      {{ file ? file.name : '未选择任何文件' }}
    </slot>
  </span>
</template>

<script>
const RATE = 1024 * 1024  // 字节和兆的换算关系

export default {
  props: {
    accept: { // 可接受的文件类型（https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/file#限制允许的文件类型）
      type: String,
      default: ''
    },
    maxSize: { // 可接受的文件大小上限（单位M）
      type: Number,
      default: 0
    },
    allowBlobUrl: { // 是否输出Blob URL
      type: Boolean,
      default: true
    },
    allowBase64: { // 是否输出base64（太大文件的base64会导致页面卡死、错误）
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      file: '', // File实例 或 ''
      blobUrl: '',  // Blob URL字符串（blob:http://地址 或 blob:https://地址 等）
      base64: '', // base64字符串

      reader: Object.freeze({ abort: () => {}, removeEventListener: () => {} })
    }
  },
  beforeDestroy () {
    this.destroyReader()
  },
  methods: {
    change (file, target) {
      this.destroyReader()

      if (file) {
        if (this.maxSize === 0 || file.size <= this.maxSize * RATE) {
          if (this.allowBase64) {
            this.file = file
            this.reader = new window.FileReader()
            this.reader.addEventListener('load', this.handleReaderLoad)

            this.reader.readAsDataURL(file)
          } else {
            this.update({
              file,
              blobUrl: this.allowBlobUrl ? window.URL.createObjectURL(file) : '',  // todo:释放Blob URL的时机
              base64: ''
            })
          }
        } else {
          target.value = ''
          this.$emit('error', { msg: `上传文件过大（≈${(file.size / RATE).toFixed(1)}M），请上传${this.maxSize}M以下的图片` })
          // this.update()
        }
      } else {
        // this.update()
      }
    },
    handleReaderLoad (e) {
      this.update({
        file: this.file,
        blobUrl: this.allowBlobUrl ? window.URL.createObjectURL(this.file) : '',  // todo:释放Blob URL的时机
        base64: e.target.result
      })

      this.destroyReader()
    },
    update ({ file = '', blobUrl = '', base64 = '' } = {}) {
      this.file = file
      this.blobUrl = blobUrl
      this.base64 = base64

      this.$emit('update', { file, blobUrl, base64 })

      this.$refs.inputDom.value = ''
    },
    destroyReader () {
      this.reader.abort()
      this.reader.removeEventListener('load', this.handleReaderLoad)
    }
  }
}
</script>
