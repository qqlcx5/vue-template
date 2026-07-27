<template>
  <template v-if="hasPerms">
    <slot />
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import type { CxPermsProps } from './types'

defineOptions({
  name: 'CxPerms'
})

const props = withDefaults(defineProps<CxPermsProps>(), {
  value: () => []
})

const route = useRoute()

/**
 * 基于路由 meta.roles 或 meta.permissions 进行角色权限判断
 * 优先级：meta.permissions > meta.roles > meta.auths
 * 未配置时默认放行
 */
const hasPerms = computed(() => {
  const { value } = props

  if (!value) return false

  // 依次尝试从路由 meta 获取权限列表
  const metaRoles: string[] | undefined =
    (route.meta?.permissions as string[] | undefined) ??
    (route.meta?.roles as string[] | undefined) ??
    (route.meta?.auths as string[] | undefined)

  // 未配置权限列表时默认放行
  if (!metaRoles || metaRoles.length === 0) return true

  // 超级管理员通配符
  if (metaRoles.length === 1 && metaRoles[0] === '*:*:*') return true

  if (Array.isArray(value)) {
    return value.every(v => metaRoles.includes(v))
  }

  return metaRoles.includes(value)
})
</script>
