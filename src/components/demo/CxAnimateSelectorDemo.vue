<template>
  <div class="demo-page">
    <el-card header="CxAnimateSelector — 动画选择器组件" shadow="never">
      <el-alert type="info" :closable="false" show-icon style="margin-bottom: 16px">
        CxAnimateSelector 基于 Element Plus el-select 封装，提供可视化动画选择面板。
        支持从 animate.css 动画效果中预览并选择，通过 v-model 双向绑定。
      </el-alert>

      <!-- 场景1：基础用法 v-model 双向绑定 -->
      <h3>场景1：基础用法（v-model 双向绑定）</h3>
      <div class="demo-block">
        <CxAnimateSelector v-model="animateName" style="width: 300px" />
        <div style="margin-top: 12px">
          <el-tag v-if="animateName" type="success">
            当前选中动画：{{ animateName }}
          </el-tag>
          <el-tag v-else type="info">未选择动画</el-tag>
        </div>
        <div v-if="animateName" class="preview-area">
          <div :class="['preview-box', 'animate__animated', `animate__${animateName}`]" :key="animateName">
            动画预览
          </div>
        </div>
      </div>

      <!-- 场景2：自定义 placeholder -->
      <h3>场景2：自定义 placeholder</h3>
      <div class="demo-block">
        <CxAnimateSelector v-model="animate2" placeholder="选择入场动画效果" style="width: 300px" />
        <el-tag v-if="animate2" style="margin-top: 8px">
          已选择：{{ animate2 }}
        </el-tag>
      </div>

      <!-- 场景3：完整表单场景 -->
      <h3>场景3：完整表单场景（入场动画 + 出场动画 + 预览）</h3>
      <div class="demo-block">
        <el-form :model="form" label-width="100px" style="max-width: 600px">
          <el-form-item label="入场动画">
            <CxAnimateSelector v-model="form.enterAnimation" placeholder="请选择入场动画" />
          </el-form-item>
          <el-form-item label="出场动画">
            <CxAnimateSelector v-model="form.leaveAnimation" placeholder="请选择出场动画" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="previewEnter">预览入场</el-button>
            <el-button @click="previewLeave">预览出场</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
        <div class="preview-stage">
          <Transition
            enter-active-class=""
            leave-active-class=""
            @before-enter="onBeforeEnter"
            @enter="onEnter"
            @before-leave="onBeforeLeave"
            @leave="onLeave"
          >
            <div v-if="showPreview" class="preview-box-large" :class="currentAnimClass">
              动画预览区域
            </div>
          </Transition>
        </div>
      </div>

      <!-- 场景4：搜索过滤说明 -->
      <h3>场景4：搜索过滤说明</h3>
      <el-alert
        type="warning"
        :closable="false"
        show-icon
        style="margin-bottom: 16px"
      >
        点击选择器展开下拉面板后，在输入框中键入关键词（如 fade、bounce、zoom）即可过滤动画列表。
        组件内置 filterable，无需额外配置。
      </el-alert>
      <div class="demo-block">
        <CxAnimateSelector v-model="animate4" placeholder="试试输入 fade 搜索" style="width: 300px" />
      </div>

      <!-- 场景5：鼠标悬停预览说明 -->
      <h3>场景5：鼠标悬停预览说明</h3>
      <el-alert
        type="warning"
        :closable="false"
        show-icon
        style="margin-bottom: 16px"
      >
        展开下拉面板后，将鼠标移动到某个动画卡片上，该卡片上的动画名称会以循环播放方式预览效果。
        鼠标移开后动画停止。点击卡片即选中该动画。
      </el-alert>

      <!-- 场景6：清空选择说明 -->
      <h3>场景6：清空选择说明</h3>
      <el-alert
        type="warning"
        :closable="false"
        show-icon
        style="margin-bottom: 16px"
      >
        选择器自带 clearable，选中动画后点击选择框右侧的清除图标可清空当前选中值。
        v-model 绑定的变量会被设为空字符串。
      </el-alert>
      <div class="demo-block">
        <CxAnimateSelector v-model="animate6" placeholder="选择后可清空" style="width: 300px" />
        <el-button v-if="animate6" link type="danger" style="margin-top: 8px" @click="animate6 = ''">
          手动清空
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import CxAnimateSelector from '@/components/CxAnimateSelector'

// 场景1
const animateName = ref('')

// 场景2
const animate2 = ref('')

// 场景3：表单
const form = ref({
  enterAnimation: '',
  leaveAnimation: ''
})
const showPreview = ref(false)
const currentAnimClass = ref('')

function previewEnter() {
  if (!form.value.enterAnimation) return
  currentAnimClass.value = `animate__animated animate__${form.value.enterAnimation}`
  showPreview.value = false
  nextTick(() => {
    showPreview.value = true
  })
}

function previewLeave() {
  if (!form.value.leaveAnimation) return
  currentAnimClass.value = `animate__animated animate__${form.value.leaveAnimation}`
  showPreview.value = false
  nextTick(() => {
    showPreview.value = true
  })
}

function resetForm() {
  form.value.enterAnimation = ''
  form.value.leaveAnimation = ''
  showPreview.value = false
}

function onBeforeEnter(el: Element) {
  // enter hook
}
function onEnter(el: Element) {
  // enter hook
}
function onBeforeLeave(el: Element) {
  // leave hook
}
function onLeave(el: Element) {
  // leave hook
}

// 场景4
const animate4 = ref('')

// 场景6
const animate6 = ref('')
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

.preview-area {
  margin-top: 16px;
}

.preview-box {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 20px 40px;
  background: #f5f5f5;
  border-radius: 8px;
  font-size: 16px;
  color: #303133;
}

.preview-stage {
  margin-top: 16px;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-box-large {
  padding: 40px 80px;
  text-align: center;
  background: #ecf5ff;
  border-radius: 8px;
  font-size: 18px;
  color: #409eff;
}
</style>
