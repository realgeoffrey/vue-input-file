# vue-input-file

上传文件、本地展示（Vue组件）

1. npm：<https://www.npmjs.com/package/vue-input-file>
2. demo：<https://realgeoffrey.github.io/vue-input-file/demo/index.html>

### 安装
1. Node.js安装

    ```bash
    npm install vue-input-file --save
    ```
2. 浏览器引用

    ```html
    <!-- 需要先引入vue：<script src="//unpkg.com/vue"></script> -->
    <script src="//unpkg.com/vue-input-file"></script>
    ```

### 注册组件
1. Node.js注册

    1. 全局注册

        ```javascript
        import Vue from 'vue'
        import vueInputFile from 'vue-input-file'

        // 全局注册
        Vue.use(vueInputFile, { component: 'InputFile' }) // 组件名默认是：vue-input-file
        // 或：Vue.component('InputFile', vueInputFile)
        ```
    2. 局部注册

        ```javascript
        import vueInputFile from 'vue-input-file'

        export default {
          components: {
            // 局部注册
            InputFile: vueInputFile
          }
        }
        ```
2. 浏览器注册

    1. 全局注册

        ```html
        <!-- 需要先引入vue：<script src="//unpkg.com/vue"></script> -->
        <!-- 需要先引入vue-input-file：<script src="//unpkg.com/vue-input-file"></script> -->

        <script>
        // 全局注册
        Vue.use(vueInputFile, { component: 'vue-input-file' }) // 组件名默认是：vue-input-file
        // 或：Vue.component('vue-input-file', vueInputFile)
        </script>
        ```
    2. 局部注册

        ```html
        <!-- 需要先引入vue：<script src="//unpkg.com/vue"></script> -->
        <!-- 需要先引入vue-input-file：<script src="//unpkg.com/vue-input-file"></script> -->

        <script>
        new Vue({
          components: {
            // 局部注册
            'vue-input-file': vueInputFile
          }
        })
        </script>
        ```

### 用法
1. 参数

    ```vue
    <InputFile
      accept="input的accept属性（''）"
      :max-size="文件大小上限-M（0，无上限）"
      allow-blob-url="是否输出Blob URL（true）"
      allow-base64="是否输出base64（true）"
      @error="文件大小超过上限回调的方法，带参数{ msg }"
      @update="input提交文件成功后回调的方法，带参数{ file, blobUrl, base64 }"
    />
    ```

    >Tips：事件`update`会在提交完成后执行，就算与上一次提交相同文件也会再次执行；用户取消提交、文件大小超过上限终止提交（`error`触发）都不会触发`update`；`v-slot`插槽的内容与事件`update`同时更新。
2. 插槽

    ```vue
    <InputFile
      v-slot="fileData"
    >
      文件-><br>
      {{ fileData.file && fileData.file.name }}<br>
      {{ fileData.blobUrl }}<br>
      {{ fileData.base64 }}
    </InputFile>
    ```
