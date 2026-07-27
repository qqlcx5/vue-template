<template>
  <div class="demo-page">
    <el-card header="CxDictTag 示例" shadow="never">
      <!-- 场景1：基础用法 -->
      <h3>场景1：基础用法</h3>
      <div class="cx-dict-tag-demo__section">
        <p>单值映射：</p>
        <CxDictTag :dict-data="dictData" value="1" />
      </div>

      <!-- 场景2：多值 -->
      <h3>场景2：多值展示</h3>
      <div class="cx-dict-tag-demo__section">
        <p>数组值：</p>
        <CxDictTag :dict-data="dictData" :value="['1', '2', '4']" />
      </div>

      <!-- 场景3：可关闭 -->
      <h3>场景3：可关闭</h3>
      <div class="cx-dict-tag-demo__section">
        <p>点击 Tag 上的关闭按钮触发 close 事件：</p>
        <CxDictTag :dict-data="dictData" :value="closeValue" closable @close="handleClose" />
        <p v-if="closeMsg" style="margin-top: 8px; color: #909399">{{ closeMsg }}</p>
      </div>

      <!-- 场景4：限制显示数量 -->
      <h3>场景4：限制显示数量（max=2）</h3>
      <div class="cx-dict-tag-demo__section">
        <p>超出 max 的项会被折叠：</p>
        <CxDictTag :dict-data="dictData" :value="['1', '2', '4', '3', '5']" :max="2" />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CxDictTag } from '@/components/CxDictTag'

defineOptions({
  name: 'CxDictTagDemo'
})

const dictData = [
  { value: '1', label: '正常', color: '#67c23a' },
  { value: '2', label: '停用', color: '#f56c6c' },
  { value: '3', label: '待审核', color: '#e6a23c' },
  { value: '4', label: '草稿', color: '#909399' },
  { value: '5', label: '已归档', color: '#409eff' }
]

const closeValue = ref<Array<string | number>>(['1', '2', '3'])
const closeMsg = ref('')

function handleClose(val: string | number) {
  closeMsg.value = `已关闭 value="${val}" 的标签`
  closeValue.value = closeValue.value.filter(v => v !== val)
}
</script>

<style scoped lang="scss">
.cx-dict-tag-demo {
  &__section {
    margin-bottom: 24px;
    padding: 16px;
    background: var(--el-fill-color-lighter);
    border-radius: 4px;
  }
}
</style>
