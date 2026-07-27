<template>
  <div
    class="cx-flicker"
    :class="modeClass"
    :style="cssVars"
  />
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue'

defineOptions({
  name: 'CxFlicker'
})

const props = defineProps({
  /** 宽度 */
  width: {
    type: String,
    default: '12px'
  },
  /** 高度 */
  height: {
    type: String,
    default: '12px'
  },
  /** 圆角：0 为方形，50% 或不传为圆形 */
  borderRadius: {
    type: [Number, String] as PropType<number | string>,
    default: '50%'
  },
  /** 闪烁颜色 */
  background: {
    type: String,
    default: undefined
  },
  /** 闪烁范围，默认 2，值越大闪烁范围越大（pulse 模式） */
  scale: {
    type: [Number, String] as PropType<number | string>,
    default: '2'
  },
  /** 闪烁模式：pulse-脉冲扩散 / blink-明暗闪烁 / glow-霓虹光晕 */
  mode: {
    type: String as PropType<'pulse' | 'blink' | 'glow'>,
    default: 'pulse'
  }
})

const cssVars = computed(() => ({
  '--cx-flicker-width': props.width,
  '--cx-flicker-height': props.height,
  '--cx-flicker-background': props.background ?? 'var(--el-color-primary)',
  '--cx-flicker-border-radius':
    typeof props.borderRadius === 'number' ? `${props.borderRadius}px` : props.borderRadius,
  '--cx-flicker-scale': props.scale
}))

const modeClass = computed(() => `cx-flicker--${props.mode}`)
</script>

<style lang="scss">
// 【全局】keyframes 必须定义在非 scoped 块中，确保 animation 引用能正确匹配
@keyframes cx-flicker-pulse {
  0% {
    transform: scale(0.5);
    opacity: 1;
  }
  30% {
    opacity: 1;
  }
  100% {
    transform: scale(var(--cx-flicker-scale));
    opacity: 0;
  }
}

@keyframes cx-flicker-blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.15;
  }
}

@keyframes cx-flicker-glow {
  0%,
  100% {
    box-shadow: 0 0 4px 0 var(--cx-flicker-background);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 14px 4px var(--cx-flicker-background);
    transform: scale(1.15);
  }
}
</style>

<style scoped lang="scss">
.cx-flicker {
  width: var(--cx-flicker-width);
  height: var(--cx-flicker-height);
  background: var(--cx-flicker-background);
  position: relative;
  border-radius: var(--cx-flicker-border-radius);

  &::before,
  &::after {
    content: '';
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
    border-radius: var(--cx-flicker-border-radius);
  }

  &::after {
    background: var(--cx-flicker-background);
  }

  // 脉冲扩散（默认）
  &--pulse {
    &::before,
    &::after {
      animation: cx-flicker-pulse 1.2s ease-out infinite;
    }
  }

  // 明暗闪烁
  &--blink {
    animation: cx-flicker-blink 1s ease-in-out infinite;

    &::before,
    &::after {
      display: none;
    }
  }

  // 霓虹光晕
  &--glow {
    animation: cx-flicker-glow 1.5s ease-in-out infinite;

    &::before,
    &::after {
      display: none;
    }
  }
}
</style>
