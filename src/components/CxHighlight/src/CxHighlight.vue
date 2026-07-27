<template>
  <component :is="tag" class="cx-highlight">
    <template v-for="(part, idx) in parts" :key="idx">
      <span
        v-if="part.highlight"
        class="cx-highlight__keyword"
        :style="{ color: color }"
        @click="emit('keyword-click', part.text)"
      >{{ part.text }}</span>
      <template v-else>{{ part.text }}</template>
    </template>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CxHighlightProps, CxHighlightEmits } from './types'

defineOptions({ name: 'CxHighlight' })

const props = withDefaults(defineProps<CxHighlightProps>(), {
  text: '',
  keys: () => [],
  color: '#409eff',
  tag: 'span',
})

const emit = defineEmits<CxHighlightEmits>()

interface TextPart {
  text: string
  highlight: boolean
}

const parts = computed<TextPart[]>(() => {
  if (!props.text || !props.keys?.length) return [{ text: props.text, highlight: false }]

  const escapedKeys = props.keys.filter(Boolean).map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  if (!escapedKeys.length) return [{ text: props.text, highlight: false }]

  const pattern = new RegExp(`(${escapedKeys.join('|')})`, 'gi')
  const result: TextPart[] = []
  let lastIndex = 0

  const matches = props.text.matchAll(pattern)
  for (const match of matches) {
    if (match.index! > lastIndex) {
      result.push({ text: props.text.slice(lastIndex, match.index!), highlight: false })
    }
    result.push({ text: match[0], highlight: true })
    lastIndex = match.index! + match[0].length
  }

  if (lastIndex < props.text.length) {
    result.push({ text: props.text.slice(lastIndex), highlight: false })
  }

  return result.length ? result : [{ text: props.text, highlight: false }]
})
</script>

<style scoped lang="scss">
.cx-highlight {
  &__keyword {
    cursor: pointer;
    font-weight: 500;
  }
}
</style>
