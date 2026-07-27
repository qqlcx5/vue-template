<template>
  <template v-if="hasPermission">
    <slot />
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import type { CxAuthProps } from './types'

defineOptions({
  name: 'CxAuth'
})

const props = withDefaults(defineProps<CxAuthProps>(), {
  value: () => []
})

const route = useRoute()

/**
 * 检查当前路由 meta.auths 是否包含指定权限
 * 如果路由没有 auths 字段则默认放行
 */
const hasPermission = computed(() => {
  const { value } = props

  if (!value) return false

  // 获取当前路由 meta 中的权限列表
  const metaAuths: string[] | undefined = route.meta?.auths as string[] | undefined

  // 未配置权限列表时默认放行
  if (!metaAuths || metaAuths.length === 0) return true

  if (Array.isArray(value)) {
    // 数组：全部满足才放行
    return value.every(v => metaAuths.includes(v))
  }

  return metaAuths.includes(value)
})
</script>
