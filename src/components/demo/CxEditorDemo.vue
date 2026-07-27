<template>
  <div class="demo-page">
    <el-card header="CxEditor 示例" shadow="never">
      <el-alert type="info" :closable="false" show-icon style="margin-bottom: 16px">
        基于 wangEditor 封装的富文本编辑器组件，支持 v-model 双向绑定。
      </el-alert>

      <!-- 场景1：基础用法 -->
      <h3>场景1：基础用法</h3>
      <div class="cx-editor-demo__section">
        <CxEditor v-model="content" @change="handleChange" />
        <p class="cx-editor-demo__preview" style="margin-top: 12px">
          绑定值：{{ content }}
        </p>
      </div>

      <!-- 场景2：只读模式 -->
      <h3>场景2：只读模式</h3>
      <div class="cx-editor-demo__section">
        <CxEditor v-model="readonlyContent" readonly />
      </div>

      <!-- 场景3：自定义高度 -->
      <h3>场景3：自定义高度（height=300px）</h3>
      <div class="cx-editor-demo__section">
        <CxEditor v-model="tallContent" :height="300" />
      </div>

      <!-- 场景4：自定义占位文本 -->
      <h3>场景4：自定义占位文本</h3>
      <div class="cx-editor-demo__section">
        <CxEditor v-model="placeholderContent" placeholder="请输入文章正文..." />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CxEditor } from '@/components/CxEditor'

defineOptions({
  name: 'CxEditorDemo'
})

const content = ref('<p>这是默认内容</p>')
const readonlyContent = ref('<p><strong>只读内容</strong>：选中这段文字看是否能编辑</p>')
const tallContent = ref('<p>高度为 300px 的编辑器</p>')
const placeholderContent = ref('')

function handleChange(value: string) {
  console.log('[CxEditor] 内容变化：', value)
}
</script>

<style scoped lang="scss">
.cx-editor-demo {
  &__section {
    margin-bottom: 24px;
    padding: 16px;
    background: var(--el-fill-color-lighter);
    border-radius: 4px;
  }

  &__preview {
    font-size: 13px;
    color: var(--el-text-color-secondary);
    word-break: break-all;
  }
}
</style>
