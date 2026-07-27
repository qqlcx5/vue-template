<template>
  <el-select
    clearable
    filterable
    :placeholder="placeholder"
    popper-class="cx-animate-selector__popper"
    :model-value="modelValue"
    :filter-method="filterMethod"
    class="cx-animate-selector"
    @clear="onClear"
  >
    <template #empty>
      <div class="tw-w-70">
        <el-scrollbar
          noresize
          height="212px"
          :view-style="{ overflow: 'hidden' }"
          class="tw-border-t tw-border-[#e5e7eb]"
        >
          <ul class="tw-flex tw-flex-wrap tw-justify-around tw-mb-1!">
            <li
              v-for="(animate, index) in filteredAnimates"
              :key="index"
              class="cx-animate-selector__item"
              :class="{ 'cx-animate-selector__item--active': modelValue === animate }"
              @mouseenter.prevent="onMouseEnter(index)"
              @mouseleave.prevent="onMouseLeave"
              @click="onChangeIcon(animate)"
            >
              <h4
                :class="[
                  'animate__animated',
                  animateHoverMap[index]?.loading ? `animate__${animate} animate__infinite` : ''
                ]"
              >
                {{ animate }}
              </h4>
            </li>
          </ul>
          <el-empty
            v-show="filteredAnimates.length === 0"
            :description="`${searchVal} 动画不存在`"
            :image-size="60"
          />
        </el-scrollbar>
      </div>
    </template>
  </el-select>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { animates } from './animate'
import type { CxAnimateSelectorProps, CxAnimateSelectorEmits } from './types'

defineOptions({
  name: 'CxAnimateSelector'
})

const props = withDefaults(defineProps<CxAnimateSelectorProps>(), {
  placeholder: '请选择动画'
})

const emit = defineEmits<CxAnimateSelectorEmits>()

const modelValue = defineModel<string>({ default: '' })

const searchVal = ref('')
const filteredAnimates = ref<string[]>([...animates])
const copyAnimatesList = [...animates]

const animateHoverMap = ref<Record<number, { loading: boolean }>>({})

function onChangeIcon(animate: string) {
  modelValue.value = animate
}

function onClear() {
  modelValue.value = ''
}

function filterMethod(value: string) {
  searchVal.value = value
  filteredAnimates.value = copyAnimatesList.filter((i) => i.includes(value))
}

function onMouseEnter(index: number) {
  animateHoverMap.value[index] = animateHoverMap.value[index]?.loading
    ? { loading: false }
    : { loading: true }
}

function onMouseLeave() {
  animateHoverMap.value = {}
}
</script>

<style>
@import "animate.css";
.cx-animate-selector__popper {
  min-width: 0 !important;
}
</style>

<style scoped lang="scss">
.cx-animate-selector {
  width: 100%;
}

.cx-animate-selector__item {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 4px;
  border: 1px solid #e5e7eb;
  width: 130px;
  height: 100px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    color: var(--el-color-primary);
    transition-duration: 700ms;
  }

  &--active {
    border-color: var(--el-color-primary);
    color: var(--el-color-primary);
  }
}
</style>
