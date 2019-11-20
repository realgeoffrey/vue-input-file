# vue-uploadfile

上传文件、本地展示（Vue组件）

1. npm：<https://www.npmjs.com/package/vue-uploadfile>
2. demo：<https://realgeoffrey.github.io/vue-uploadfile/demo/index.html>

### 安装
1. Node.js安装

    ```bash
    npm install vue-uploadfile --save
    ```
2. 浏览器引用

    ```html
    <!-- 需要先引入vue：<script src="//unpkg.com/vue"></script> -->
    <script src="//unpkg.com/vue-uploadfile"></script>
    ```

### 注册组件
1. Node.js注册

    1. 全局注册

        ```javascript
        import Vue from 'vue'
        import vueUploadfile from 'vue-uploadfile'

        // 全局注册
        Vue.use(vueUploadfile, { component: 'VueUploadfile' }) // 组件名默认是：vue-uploadfile
        // 或：Vue.component('VueUploadfile', vueUploadfile)
        ```
    2. 局部注册

        ```javascript
        import vueUploadfile from 'vue-uploadfile'

        export default {
          components: {
            // 局部注册
            VueUploadfile: vueUploadfile
          }
        }
        ```
2. 浏览器注册

    1. 全局注册

        ```html
        <!-- 需要先引入vue：<script src="//unpkg.com/vue"></script> -->
        <!-- 需要先引入vue-uploadfile：<script src="//unpkg.com/vue-uploadfile"></script> -->

        <script>
        // 全局注册
        Vue.use(vueUploadfile, { component: 'vue-uploadfile' }) // 组件名默认是：vue-uploadfile
        // 或：Vue.component('vue-uploadfile', vueUploadfile)
        </script>
        ```
    2. 局部注册

        ```html
        <!-- 需要先引入vue：<script src="//unpkg.com/vue"></script> -->
        <!-- 需要先引入vue-uploadfile：<script src="//unpkg.com/vue-uploadfile"></script> -->

        <script>
        new Vue({
          components: {
            // 局部注册
            'vue-uploadfile': vueUploadfile
          }
        })
        </script>
        ```

### 用法
1. 参数

    ```vue
    <VueUploadfile
      accept="input的accept属性"
      :max-size="文件大小上限-M（0，无上限）"
      allow-blob-url="是否输出Blob URL（true）"
      allow-base64="是否输出base64（true）"
      @error="文件大小超过上限回调的方法，带参数{ msg }"
      @update="input的change事件后改变了file的回调的方法，带参数{ file, blobUrl, base64 }"
    />
    ```
2. 插槽

    ```vue
    <VueUploadfile
      v-slot="fileData"
    >
      文件-><br>
      {{ fileData.file && fileData.file.name }}<br>
      {{ fileData.blobUrl }}<br>
      {{ fileData.base64 }}
    </VueUploadfile>
    ```
