<template>
  <table cellspacing="0" cellpadding="0" class="cx-selector">
    <tbody>
      <tr>
        <td
          v-for="(item, key) in max"
          :key="key"
          :ref="(el) => setTdRef(key, el)"
          :data-index="hsKey"
          :class="[
            'cx-selector__item',
            `cx-selector__item${key}`,
            { 'cx-selector__item--active': isActive(key) },
            { 'cx-selector__item--stay': isStay(key) },
            { 'cx-selector__item--range': isInRange(key) },
            { 'cx-selector__item--left-sides': isLeftSide(key) },
            { 'cx-selector__item--right-sides': isRightSide(key) }
          ]"
          :style="{ cursor: disabled ? 'auto' : 'pointer', textAlign: 'center' }"
          @mousemove="onMouseMove(key)"
          @mouseleave="onMouseLeave(key)"
          @click="onClick(key, item)"
        >
          <div
            :ref="(el) => setDivRef(key, el)"
            :class="[
              'cx-selector__item-inner',
              getItemClass(key)
            ]"
          >
            <span>{{ item }}</span>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import type { CxSelectorProps, CxSelectorEmits, SelectedValue } from './types'

defineOptions({
  name: 'CxSelector'
})

const props = withDefaults(defineProps<CxSelectorProps>(), {
  hsKey: 0,
  disabled: false,
  value: 0,
  max: () => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  echo: () => []
})

const emit = defineEmits<CxSelectorEmits>()

// ============================================================
// Refs
// ============================================================

const tdRefs = ref<Record<number, HTMLElement>>({})
const divRefs = ref<Record<number, HTMLElement>>({})

function setTdRef(key: number, el: any) {
  if (el) tdRefs.value[key] = el as HTMLElement
}

function setDivRef(key: number, el: any) {
  if (el) divRefs.value[key] = el as HTMLElement
}

// ============================================================
// State
// ============================================================

const activeSet = ref<Set<number>>(new Set())
const staySet = ref<Set<number>>(new Set())
const rangeSet = ref<Set<number>>(new Set())
const leftSideSet = ref<Set<number>>(new Set())
const rightSideSet = ref<Set<number>>(new Set())

let selectedList: Array<{ item: number; index: number }> = []
let hoverStartIndex: number | null = null
let selectedDirection: 'right' | 'left' = 'right'

// ============================================================
// Class helpers
// ============================================================

function getItemClass(key: number): string {
  if (staySet.value.has(key) || activeSet.value.has(key)) {
    return 'cx-selector__item-inner--on'
  }
  return 'cx-selector__item-inner--off'
}

function isActive(key: number): boolean {
  return activeSet.value.has(key) && !staySet.value.has(key)
}

function isStay(key: number): boolean {
  return staySet.value.has(key)
}

function isInRange(key: number): boolean {
  return rangeSet.value.has(key)
}

function isLeftSide(key: number): boolean {
  return leftSideSet.value.has(key)
}

function isRightSide(key: number): boolean {
  return rightSideSet.value.has(key)
}

// ============================================================
// Mouse interactions
// ============================================================

function onMouseMove(index: number) {
  if (props.disabled) return

  activeSet.value.add(index)

  if (selectedList.length === 1) {
    const firstIndex = selectedList[0].index
    hoverStartIndex = firstIndex

    const newRange = new Set<number>()
    rightSideSet.value.clear()
    leftSideSet.value.clear()

    if (index > firstIndex) {
      selectedDirection = 'right'
      rightSideSet.value.add(firstIndex)
      for (let i = firstIndex; i <= index; i++) {
        newRange.add(i)
      }
    } else {
      selectedDirection = 'left'
      leftSideSet.value.add(firstIndex)
      for (let i = index; i <= firstIndex; i++) {
        newRange.add(i)
      }
    }
    rangeSet.value = newRange
  }
}

function onMouseLeave(index: number) {
  if (props.disabled) return
  if (!staySet.value.has(index)) {
    activeSet.value.delete(index)
  }

  if (selectedList.length === 1 && hoverStartIndex !== null) {
    rangeSet.value.clear()
    rightSideSet.value.clear()
    leftSideSet.value.clear()
    leftSideSet.value.add(selectedList[0].index)
  }
}

function onClick(index: number, item: number) {
  if (props.disabled) return

  if (selectedList.length < 2) {
    selectedList.push({ item, index })
    staySet.value.add(index)

    leftSideSet.value.add(selectedList[0].index)

    if (selectedList.length === 2) {
      const lastIdx = selectedList[1].index
      if (selectedDirection === 'right') {
        rightSideSet.value.add(lastIdx)
      } else {
        leftSideSet.value.add(lastIdx)
      }

      const result: SelectedValue =
        selectedDirection === 'right'
          ? { left: selectedList[0].item, right: selectedList[1].item, whole: selectedList }
          : { left: selectedList[1].item, right: selectedList[0].item, whole: selectedList }

      emit('selectedVal', result)
    }
  } else {
    // Reset
    nextTick(() => {
      staySet.value.clear()
      activeSet.value.clear()
      rangeSet.value.clear()
      leftSideSet.value.clear()
      rightSideSet.value.clear()

      selectedList = []
      hoverStartIndex = null

      selectedList.push({ item, index })
      staySet.value.add(index)
      leftSideSet.value.add(index)
    })
  }
}

// ============================================================
// Echo
// ============================================================

function echoView(echoArr: number[]) {
  if (!echoArr || echoArr.length === 0) return
  if (echoArr.length !== 2) {
    console.warn('[CxSelector] echo 数组长度必须为 2')
    return
  }

  const sorted = [...echoArr].sort((a, b) => a - b)
  const [start, end] = sorted

  staySet.value.add(start)
  staySet.value.add(end)
  leftSideSet.value.add(start)
  rightSideSet.value.add(end)

  const newRange = new Set<number>()
  for (let i = start; i <= end; i++) {
    newRange.add(i)
  }
  rangeSet.value = newRange
}

onMounted(() => {
  nextTick(() => {
    echoView(props.echo)
  })
})
</script>

<style scoped lang="scss">
.cx-selector {
  &__item {
    &-inner {
      width: 30px;
      height: 30px;
      box-sizing: border-box;
      line-height: 30px;
      transition: background-color 0.3s;

      &--on {
        background-color: #409eff;
        border-radius: 50%;
      }
    }

    &--range {
      background-color: #f2f6fc;
    }

    &--left-sides {
      border-radius: 50% 0 0 50%;
    }

    &--right-sides {
      border-radius: 0 50% 50% 0;
    }
  }
}
</style>
