<template>
  <el-popover
    :content="content"
    :placement="placement"
    :width="maxWidth"
    trigger="hover"
    class="cx-infotip"
  >
    <template #reference>
      <span class="cx-infotip__trigger" @click="emit('click')">
        <slot>
          <CxIcon v-if="showIcon" :icon="icon" :width="14" :height="14" class="cx-infotip__icon" />
        </slot>
      </span>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
import CxIcon from '../../CxIcon/src/CxIcon.vue'
import type { CxInfotipProps, CxInfotipEmits } from './types'

defineOptions({ name: 'CxInfotip' })

withDefaults(defineProps<CxInfotipProps>(), {
  content: '',
  placement: 'top',
  showIcon: true,
  icon: 'mdi:information-outline',
  maxWidth: 300,
})

const emit = defineEmits<CxInfotipEmits>()
</script>

<style scoped lang="scss">
.cx-infotip {
  &__trigger {
    display: inline-flex;
    cursor: pointer;
  }

  &__icon {
    color: #909399;

    &:hover {
      color: #409eff;
    }
  }
}
</style>
