<template>
  <div class="demo-page">
    <el-card header="CxDescriptions 示例" shadow="never">
      <!-- 场景1：基础用法 -->
      <h3>场景1：基础用法</h3>
      <div class="cx-descriptions-demo__section">
        <CxDescriptions :data="basicData" :schema="basicSchema" />
      </div>

      <!-- 场景2：带边框 -->
      <h3>场景2：带边框</h3>
      <div class="cx-descriptions-demo__section">
        <CxDescriptions :data="basicData" :schema="basicSchema" border />
      </div>

      <!-- 场景3：多列 -->
      <h3>场景3：多列（column=3）</h3>
      <div class="cx-descriptions-demo__section">
        <CxDescriptions :data="multiData" :schema="multiSchema" :column="3" />
      </div>

      <!-- 场景4：可折叠 -->
      <h3>场景4：可折叠</h3>
      <div class="cx-descriptions-demo__section">
        <CxDescriptions
          :data="basicData"
          :schema="basicSchema"
          collapsible
          :default-collapsed="true"
          @update:collapsed="onCollapsed"
        />
        <p v-if="collapsedMsg" style="margin-top: 8px; color: #909399">{{ collapsedMsg }}</p>
      </div>

      <!-- 场景5：分组 -->
      <h3>场景5：分组展示</h3>
      <div class="cx-descriptions-demo__section">
        <CxDescriptions :data="groupData" :groups="groups" />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CxDescriptions } from '@/components/CxDescriptions'

defineOptions({
  name: 'CxDescriptionsDemo'
})

const basicData = ref({
  name: '张三',
  age: 28,
  address: '北京市朝阳区某某路 100 号'
})

const basicSchema = [
  { field: 'name', label: '姓名' },
  { field: 'age', label: '年龄' },
  { field: 'address', label: '地址' }
]

const multiData = ref({
  name: '李四',
  age: 32,
  email: 'lisi@example.com',
  phone: '13800138000',
  department: '技术部',
  position: '高级工程师'
})

const multiSchema = [
  { field: 'name', label: '姓名' },
  { field: 'age', label: '年龄' },
  { field: 'email', label: '邮箱' },
  { field: 'phone', label: '电话' },
  { field: 'department', label: '部门' },
  { field: 'position', label: '职位' }
]

const groupData = ref({
  name: '王五',
  age: 26,
  email: 'wangwu@example.com',
  phone: '13900139000',
  province: '广东省',
  city: '深圳市',
  district: '南山区'
})

const groups = [
  {
    title: '基本信息',
    items: [
      { field: 'name', label: '姓名' },
      { field: 'age', label: '年龄' }
    ]
  },
  {
    title: '联系方式',
    items: [
      { field: 'email', label: '邮箱' },
      { field: 'phone', label: '电话' }
    ]
  },
  {
    title: '地址信息',
    items: [
      { field: 'province', label: '省份' },
      { field: 'city', label: '城市' },
      { field: 'district', label: '区县' }
    ]
  }
]

const collapsedMsg = ref('')

function onCollapsed(val: boolean) {
  collapsedMsg.value = val ? '描述列表已折叠' : '描述列表已展开'
}
</script>

<style scoped lang="scss">
.cx-descriptions-demo {
  &__section {
    margin-bottom: 24px;
    padding: 16px;
    background: var(--el-fill-color-lighter);
    border-radius: 4px;
  }
}
</style>
