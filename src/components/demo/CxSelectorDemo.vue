<template>
  <div class="demo-page">
    <el-card header="CxSelector — 区间选择器组件" shadow="never">
      <el-alert type="info" :closable="false" show-icon style="margin-bottom: 16px">
        CxSelector 是一个双端点范围选择器，用户通过两次点击（起点 + 终点）选择连续数值区间。
        支持 hover 预览、选中高亮、区间着色、回显、禁用等能力。
      </el-alert>

      <!-- 场景1：基础用法 -->
      <h3>场景1：基础用法（max 数组 + selectedVal 事件）</h3>
      <div class="demo-block">
        <p class="demo-hint">请点击两个数值选择区间</p>
        <CxSelector :max="scores" @selected-val="onSelect1" />
        <el-tag v-if="result1" type="success" style="margin-top: 8px">
          已选区间：{{ result1.left }} ~ {{ result1.right }}
        </el-tag>
      </div>

      <!-- 场景2：回显已有区间 -->
      <h3>场景2：回显已有区间（echo 属性）</h3>
      <div class="demo-block">
        <p class="demo-hint">初始回显 [2, 5] 区间</p>
        <CxSelector
          :max="levels"
          :echo="[2, 5]"
          @selected-val="onSelect2"
        />
        <el-tag v-if="result2" type="info" style="margin-top: 8px">
          新选区间：{{ result2.left }} ~ {{ result2.right }}
        </el-tag>
      </div>

      <!-- 场景3：禁用状态 -->
      <h3>场景3：禁用状态（disabled）</h3>
      <div class="demo-block">
        <CxSelector :max="[1, 2, 3, 4, 5]" disabled />
      </div>

      <!-- 场景4：自定义数值范围 -->
      <h3>场景4：自定义数值范围</h3>
      <div class="demo-block">
        <p class="demo-hint">选择难度区间（3~15）</p>
        <CxSelector
          :max="[3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]"
          @selected-val="onSelect4"
        />
        <el-tag v-if="result4" type="warning" style="margin-top: 8px">
          难度区间：{{ result4.left }} ~ {{ result4.right }}
        </el-tag>
      </div>

      <!-- 场景5：同一页面多个实例 -->
      <h3>场景5：同一页面多个实例（hsKey 区分）</h3>
      <div class="demo-block">
        <div class="multi-instance">
          <div>
            <p class="demo-hint">实例 A（hsKey=1）</p>
            <CxSelector :hs-key="1" :max="range1" @selected-val="onSelect5a" />
            <el-tag v-if="result5a" style="margin-top: 8px">
              A：{{ result5a.left }} ~ {{ result5a.right }}
            </el-tag>
          </div>
          <div>
            <p class="demo-hint">实例 B（hsKey=2）</p>
            <CxSelector :hs-key="2" :max="range2" @selected-val="onSelect5b" />
            <el-tag v-if="result5b" type="success" style="margin-top: 8px">
              B：{{ result5b.left }} ~ {{ result5b.right }}
            </el-tag>
          </div>
        </div>
      </div>

      <!-- 场景6：selectedVal 事件获取完整选择信息 -->
      <h3>场景6：selectedVal 事件获取完整选择信息（left/right/whole）</h3>
      <div class="demo-block">
        <p class="demo-hint">选择后查看完整的选择信息</p>
        <CxSelector :max="options" @selected-val="onSelect6" />
        <div v-if="result6" class="result-detail">
          <el-descriptions :column="1" border size="small" style="margin-top: 12px; max-width: 500px">
            <el-descriptions-item label="left（较小值）">{{ result6.left }}</el-descriptions-item>
            <el-descriptions-item label="right（较大值）">{{ result6.right }}</el-descriptions-item>
            <el-descriptions-item label="whole（完整选中项）">
              <pre>{{ JSON.stringify(result6.whole, null, 2) }}</pre>
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CxSelector from '@/components/CxSelector'
import type { SelectedValue } from '@/components/CxSelector'

// 场景1
const scores = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const result1 = ref<SelectedValue | null>(null)
function onSelect1(val: SelectedValue) {
  result1.value = val
}

// 场景2
const levels = [1, 2, 3, 4, 5, 6, 7, 8]
const result2 = ref<SelectedValue | null>(null)
function onSelect2(val: SelectedValue) {
  result2.value = val
}

// 场景4
const result4 = ref<SelectedValue | null>(null)
function onSelect4(val: SelectedValue) {
  result4.value = val
}

// 场景5
const range1 = [0, 1, 2, 3, 4]
const range2 = [10, 20, 30, 40, 50]
const result5a = ref<SelectedValue | null>(null)
const result5b = ref<SelectedValue | null>(null)
function onSelect5a(val: SelectedValue) {
  result5a.value = val
}
function onSelect5b(val: SelectedValue) {
  result5b.value = val
}

// 场景6
const options = [100, 200, 300, 400, 500, 600]
const result6 = ref<SelectedValue | null>(null)
function onSelect6(val: SelectedValue) {
  result6.value = val
  console.log('区间:', val.left, '~', val.right)
  console.log('选中项:', val.whole)
}
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

.demo-hint {
  margin: 0 0 8px;
  font-size: 13px;
  color: var(--el-text-color-secondary);
}

.multi-instance {
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
}

.result-detail {
  pre {
    margin: 0;
    font-size: 12px;
    white-space: pre-wrap;
    word-break: break-all;
  }
}
</style>
