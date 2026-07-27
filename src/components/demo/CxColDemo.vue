<template>
  <div class="demo-page">
    <el-card header="CxCol — 栅格布局组件" shadow="never">
      <el-alert type="info" :closable="false" show-icon style="margin-bottom: 16px">
        CxCol 是基于 el-col 的封装，通过 value 属性同时设置 xs/sm/md/lg/xl 断点，简化栅格使用。
      </el-alert>

      <!-- 场景1：等分三列布局 -->
      <h3>场景1：等分三列布局（value=8）</h3>
      <el-row :gutter="16" style="margin-bottom: 16px">
        <CxCol :value="8">
          <div class="grid-content bg-purple-light">col-8</div>
        </CxCol>
        <CxCol :value="8">
          <div class="grid-content bg-purple">col-8</div>
        </CxCol>
        <CxCol :value="8">
          <div class="grid-content bg-purple-dark">col-8</div>
        </CxCol>
      </el-row>

      <!-- 场景2：默认占满全宽 -->
      <h3>场景2：默认占满全宽（value=24）</h3>
      <el-row :gutter="16" style="margin-bottom: 16px">
        <CxCol>
          <div class="grid-content bg-purple-dark">col-24（默认值，占满整行）</div>
        </CxCol>
      </el-row>

      <!-- 场景3：offset 偏移 -->
      <h3>场景3：offset 偏移</h3>
      <el-row :gutter="16" style="margin-bottom: 16px">
        <CxCol :value="6">
          <div class="grid-content bg-purple">col-6</div>
        </CxCol>
        <CxCol :value="6" :offset="6">
          <div class="grid-content bg-purple-light">col-6 offset-6</div>
        </CxCol>
      </el-row>

      <!-- 场景4：push/pull 位置调整 -->
      <h3>场景4：push/pull 位置调整</h3>
      <el-row :gutter="16" style="margin-bottom: 16px">
        <CxCol :value="12" :push="6">
          <div class="grid-content bg-purple-dark">col-12 push-6</div>
        </CxCol>
        <CxCol :value="6" :pull="6">
          <div class="grid-content bg-purple">col-6 pull-6</div>
        </CxCol>
      </el-row>

      <!-- 场景5：span 覆盖 value -->
      <h3>场景5：span 覆盖 value（通过 v-bind 透传 el-col 属性）</h3>
      <el-row :gutter="16" style="margin-bottom: 16px">
        <CxCol :value="8" :span="12">
          <div class="grid-content bg-purple-light">value=8 但 span=12 覆盖 → col-12</div>
        </CxCol>
        <CxCol :value="8" :span="12">
          <div class="grid-content bg-purple">value=8 但 span=12 覆盖 → col-12</div>
        </CxCol>
      </el-row>

      <!-- 场景6：搜索表单栅格布局 -->
      <h3>场景6：搜索表单栅格布局场景</h3>
      <el-form :model="searchForm" inline label-width="80px" style="margin-bottom: 16px">
        <el-row :gutter="16" style="width: 100%">
          <CxCol :value="8">
            <el-form-item label="名称">
              <el-input v-model="searchForm.name" placeholder="请输入名称" clearable />
            </el-form-item>
          </CxCol>
          <CxCol :value="8">
            <el-form-item label="状态">
              <el-select v-model="searchForm.status" placeholder="请选择" clearable style="width: 100%">
                <el-option label="启用" value="enabled" />
                <el-option label="禁用" value="disabled" />
              </el-select>
            </el-form-item>
          </CxCol>
          <CxCol :value="8">
            <el-form-item label="日期">
              <el-date-picker
                v-model="searchForm.date"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style="width: 100%"
              />
            </el-form-item>
          </CxCol>
          <CxCol :value="24">
            <div style="text-align: right; padding-right: 8px">
              <el-button type="primary" @click="onSearch">查询</el-button>
              <el-button @click="onReset">重置</el-button>
            </div>
          </CxCol>
        </el-row>
      </el-form>

      <!-- 场景7：多种栅格组合 -->
      <h3>场景7：多种栅格组合（4列 + 2列 + 混合）</h3>
      <el-row :gutter="16" style="margin-bottom: 16px">
        <CxCol :value="6">
          <div class="grid-content bg-purple-dark">col-6</div>
        </CxCol>
        <CxCol :value="6">
          <div class="grid-content bg-purple">col-6</div>
        </CxCol>
        <CxCol :value="6">
          <div class="grid-content bg-purple-light">col-6</div>
        </CxCol>
        <CxCol :value="6">
          <div class="grid-content bg-purple-dark">col-6</div>
        </CxCol>
      </el-row>
      <el-row :gutter="16" style="margin-bottom: 16px">
        <CxCol :value="12">
          <div class="grid-content bg-purple">col-12</div>
        </CxCol>
        <CxCol :value="6">
          <div class="grid-content bg-purple-light">col-6</div>
        </CxCol>
        <CxCol :value="6">
          <div class="grid-content bg-purple-dark">col-6</div>
        </CxCol>
      </el-row>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
import CxCol from '@/components/CxCol'

const searchForm = reactive({
  name: '',
  status: '',
  date: [] as string[]
})

function onSearch() {
  ElMessage.success(`查询条件：${JSON.stringify(searchForm)}`)
}

function onReset() {
  searchForm.name = ''
  searchForm.status = ''
  searchForm.date = []
  ElMessage.info('已重置')
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

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  line-height: 36px;
  text-align: center;
  color: #fff;
  font-size: 13px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #b3c0d1;
}

.bg-purple-light {
  background: #d3dce6;
  color: #333;
}
</style>
