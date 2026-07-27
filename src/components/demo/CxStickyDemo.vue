<template>
  <div class="demo-page">
    <el-card header="CxSticky 示例" shadow="never">
      <el-alert type="info" :closable="false" show-icon style="margin-bottom: 16px">
        向下滚动下方区域查看吸顶效果，改变 sticky 状态时控制台会输出日志。
      </el-alert>

      <!-- 可滚动容器 -->
      <div class="cx-sticky-demo__scroll-container">
        <!-- 场景1：基础用法 -->
        <h3>场景1：基础用法 — top="0"</h3>
        <div class="cx-sticky-demo__section">
          <p class="cx-sticky-demo__tip">滚动时蓝色区域会吸附在滚动容器顶部</p>
          <div class="cx-sticky-demo__placeholder">
            <p>区域1 — 向下滚动查看吸顶效果</p>
          </div>
          <CxSticky :top="0" @change="handleChange">
            <div class="cx-sticky-demo__sticky-box">
              区域2 — 吸顶内容 (top=0)
            </div>
          </CxSticky>
          <div class="cx-sticky-demo__placeholder">
            <p>区域3 — 下方内容，继续滚动</p>
          </div>
          <div class="cx-sticky-demo__placeholder">
            <p>区域4 — 更多内容</p>
          </div>
        </div>

        <!-- 场景2：自定义偏移 -->
        <h3>场景2：自定义偏移 — top="60"</h3>
        <div class="cx-sticky-demo__section">
          <p class="cx-sticky-demo__tip">蓝色区域距离滚动容器顶部 60px 处吸附</p>
          <div class="cx-sticky-demo__placeholder">
            <p>上方内容</p>
          </div>
          <CxSticky :top="60" @change="handleChange">
            <div class="cx-sticky-demo__sticky-box">
              吸顶内容 (top=60)
            </div>
          </CxSticky>
          <div class="cx-sticky-demo__placeholder">
            <p>下方内容</p>
          </div>
          <div class="cx-sticky-demo__placeholder">
            <p>更多内容</p>
          </div>
        </div>

        <!-- 场景3：底部吸附 -->
        <h3>场景3：底部吸附 — bottom="0"</h3>
        <div class="cx-sticky-demo__section cx-sticky-demo__section--tall">
          <p class="cx-sticky-demo__tip">蓝色区域始终吸附在滚动容器底部</p>
          <div class="cx-sticky-demo__placeholder">
            <p>上方内容 — 滚动查看底部吸附</p>
          </div>
          <CxSticky :bottom="0" @change="handleChange">
            <div class="cx-sticky-demo__sticky-box">
              底部吸附内容
            </div>
          </CxSticky>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { CxSticky } from '@/components/CxSticky'

defineOptions({
  name: 'CxStickyDemo'
})

function handleChange(status: boolean) {
  console.log('[CxSticky] change:', status)
}
</script>

<style scoped lang="scss">
.cx-sticky-demo {
  &__scroll-container {
    max-height: 70vh;
    overflow: auto;
    border: 1px solid var(--el-border-color-light);
    border-radius: 4px;
    padding: 16px;
    background: var(--el-fill-color-lighter);
  }

  &__section {
    margin-bottom: 24px;
    padding: 16px;
    background: var(--el-bg-color);
    border-radius: 4px;

    &--tall {
      min-height: 500px;
    }
  }

  &__tip {
    margin: 0 0 8px;
    font-size: 14px;
    color: var(--el-text-color-secondary);
  }

  &__placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 160px;
    margin-bottom: 12px;
    background: var(--el-color-info-light-9);
    border-radius: 4px;

    p {
      margin: 0;
      font-size: 14px;
      color: var(--el-text-color-secondary);
    }
  }

  &__sticky-box {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    margin-bottom: 12px;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    background: var(--el-color-primary);
    border-radius: 4px;
  }
}
</style>
