<template>
  <div class="demo-page">
    <el-card header="CxText — 文本省略组件" shadow="never">
      <el-alert type="info" :closable="false" show-icon style="margin-bottom: 16px">
        CxText 封装了 Element Plus ElText，在文本溢出时自动通过 ElTooltip 展示完整内容。
        支持单行省略、多行截断、透传 ElText 属性、自定义 Tooltip 等能力。
      </el-alert>

      <!-- 场景1：基础单行省略 + Tooltip -->
      <h3>场景1：基础单行省略 + Tooltip</h3>
      <div class="demo-block">
        <CxText style="width: 200px">
          这是一段非常非常长的文本内容，当容器宽度不足以展示全部内容时，会自动省略并显示 tooltip 提示完整内容
        </CxText>
      </div>

      <!-- 场景2：多行省略 -->
      <h3>场景2：多行省略（line-clamp）</h3>
      <div class="demo-block">
        <CxText :line-clamp="3" style="width: 300px">
          长段落文本内容。当文本超过三行时会被截断，并显示省略号。鼠标悬浮时通过 tooltip 展示完整内容。
          适用于卡片描述、评论列表等场景。这是一段需要被截断的长文本，请继续阅读以看到省略效果。
          可以尝试修改行数限制来查看不同的截断效果。
        </CxText>
      </div>

      <!-- 场景3：透传 ElText 属性 -->
      <h3>场景3：透传 ElText 属性（type/size/tag）</h3>
      <div class="demo-block">
        <div class="text-row">
          <CxText type="primary" size="large" tag="b" style="width: 150px">
            primary + large + bold：带样式的省略文本展示效果
          </CxText>
        </div>
        <div class="text-row">
          <CxText type="success" tag="i" style="width: 150px">
            success + italic：成功状态的斜体省略文本展示效果
          </CxText>
        </div>
        <div class="text-row">
          <CxText type="danger" size="small" style="width: 150px">
            danger + small：危险状态的小号省略文本展示效果
          </CxText>
        </div>
      </div>

      <!-- 场景4：自定义 Tooltip 属性 -->
      <h3>场景4：自定义 Tooltip 属性（placement/effect/showAfter）</h3>
      <div class="demo-block">
        <CxText
          :tooltip-props="{
            placement: 'bottom',
            effect: 'dark',
            showAfter: 500
          }"
          style="width: 200px"
        >
          自定义 tooltip 位置和样式。这里 tooltip 从底部弹出，延迟 500ms 显示。鼠标悬浮试试看效果。
        </CxText>
      </div>

      <!-- 场景5：自定义 Tooltip 内容 -->
      <h3>场景5：自定义 Tooltip 内容（#content 插槽）</h3>
      <div class="demo-block">
        <CxText style="width: 200px">
          <template #content>
            <div style="max-width: 300px">
              <strong>💡 提示：</strong>这是一段格式化的 tooltip 内容，
              与省略文本不同，可以包含 <em>富文本</em> 和更多信息。
            </div>
          </template>
          省略显示的文本，但 tooltip 展示更丰富的内容
        </CxText>
      </div>

      <!-- 场景6：表格列中使用 -->
      <h3>场景6：表格列中使用</h3>
      <div class="demo-block">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column label="名称" width="150">
            <template #default="{ row }">
              <CxText>{{ row.name }}</CxText>
            </template>
          </el-table-column>
          <el-table-column label="描述" width="200">
            <template #default="{ row }">
              <CxText :line-clamp="2">{{ row.description }}</CxText>
            </template>
          </el-table-column>
          <el-table-column label="地址" width="180">
            <template #default="{ row }">
              <CxText type="info">{{ row.address }}</CxText>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 场景7：动态行数限制 -->
      <h3>场景7：动态行数限制（radio 切换）</h3>
      <div class="demo-block">
        <el-radio-group v-model="lines" style="margin-bottom: 12px">
          <el-radio-button :value="0">单行</el-radio-button>
          <el-radio-button :value="2">两行</el-radio-button>
          <el-radio-button :value="4">四行</el-radio-button>
        </el-radio-group>
        <CxText :line-clamp="lines" style="width: 400px">
          {{ longText }}
        </CxText>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CxText from '@/components/CxText'

// 场景6：表格数据
const tableData = [
  {
    name: '短名称',
    description: '短描述',
    address: '北京市朝阳区'
  },
  {
    name: '这是一个超长的项目名称会在表格中自动省略',
    description: '一段很长的描述文本，超过两行后会自动截断并显示省略号，鼠标悬浮可以看到全文。这里继续补充内容确保溢出。',
    address: '上海市浦东新区世纪大道100号环球金融中心'
  },
  {
    name: '中等长度的名称',
    description: '这是一个中等长度的描述，可能不会溢出',
    address: '广州市天河区体育西路'
  }
]

// 场景7：动态行数
const lines = ref<number>(2)
const longText = `这是一段用于测试动态行数限制的长文本。你可以通过上方的单选按钮切换不同的行数限制。
  当选择单行时，文本会在一行内省略；当选择两行或四行时，文本会在对应行数处截断并显示省略号。
  鼠标悬浮在截断的文本上时，会通过 Tooltip 展示完整内容。此功能适用于卡片描述、评论列表等场景。
  继续增加文本长度以确保在各种行数限制下都能看到截断效果。`
</script>

<style scoped lang="scss">
.demo-page {
  padding: 16px;

  h3 {
    margin: 16px 0 8px;
    font-size: 15px;
    color: var(--el-text-color-primary);
  }
}

.demo-block {
  margin-bottom: 24px;
}

.text-row {
  margin-bottom: 8px;
}
</style>
