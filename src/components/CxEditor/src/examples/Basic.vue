<template>
  <div class="cx-editor-example-basic">
    <h3>富文本编辑器</h3>
    <CxEditor v-model="content" placeholder="请输入公告内容" />
    <p class="cx-editor-example-basic__output">
      <strong>HTML 输出：</strong>
      <code>{{ content }}</code>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CxEditor from '../CxEditor.vue'

defineOptions({ name: 'CxEditorExampleBasic' })

const content = ref('<p>请在此编辑内容</p>')
</script>

<style scoped lang="scss">
.cx-editor-example-basic {
  &__output {
    margin-top: 16px;
    font-size: 13px;

    code {
      display: block;
      margin-top: 4px;
      padding: 8px;
      background: #f5f7fa;
      border-radius: 4px;
      word-break: break-all;
    }
  }
}
</style>
