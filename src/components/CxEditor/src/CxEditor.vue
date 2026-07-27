<template>
  <div class="cx-editor">
    <div class="cx-editor__toolbar" ref="toolbarRef"></div>
    <div class="cx-editor__content" ref="editorRef" :style="{ height: resolvedHeight }"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import type { CxEditorProps, CxEditorEmits } from './types'

defineOptions({ name: 'CxEditor' })

const props = withDefaults(defineProps<CxEditorProps>(), {
  modelValue: '',
  readonly: false,
  placeholder: '请输入内容',
  height: '400px',
  toolbarConfig: () => ({}),
  mode: 'default',
})

const emit = defineEmits<CxEditorEmits>()

const toolbarRef = ref<HTMLElement>()
const editorRef = ref<HTMLElement>()
let editorInstance: any = null
let textareaInstance: HTMLTextAreaElement | null = null
let isEditorReady = false

const resolvedHeight = computed(() => {
  return typeof props.height === 'number' ? `${props.height}px` : props.height
})

async function initEditor() {
  if (!editorRef.value) return
  // 动态导入 wangeditor，避免未安装时报错
  try {
    const { createEditor, Boot } = await import('@wangeditor/editor')
    const editorModule = await import('@wangeditor/editor-for-vue')

    const editorConfig: Record<string, any> = {
      placeholder: props.placeholder,
      readOnly: props.readonly,
    }

    editorInstance = createEditor({
      selector: editorRef.value,
      html: props.modelValue || '',
      config: editorConfig,
      mode: props.mode,
    })

    if (toolbarRef.value) {
      editorInstance.createToolbar({
        selector: toolbarRef.value,
        config: props.toolbarConfig || {},
      })
    }
    isEditorReady = true

    editorInstance.on('change', () => {
      const html = editorInstance.getHtml()
      emit('update:modelValue', html)
      emit('change', html)
    })
  } catch {
    // 降级为纯 textarea
    const textarea = document.createElement('textarea')
    textarea.value = props.modelValue || ''
    textarea.placeholder = props.placeholder
    textarea.readOnly = props.readonly
    textarea.style.cssText = `width:100%;height:${resolvedHeight.value};padding:12px;border:1px solid #dcdfe6;border-radius:4px;resize:vertical;font-size:14px;`
    textarea.addEventListener('input', (e) => {
      const val = (e.target as HTMLTextAreaElement).value
      emit('update:modelValue', val)
      emit('change', val)
    })
    editorRef.value!.appendChild(textarea)
    textareaInstance = textarea
    isEditorReady = true
  }
}

watch(() => props.modelValue, (val) => {
  if (editorInstance && val !== editorInstance.getHtml()) {
    editorInstance.setHtml(val)
  } else if (textareaInstance && val !== textareaInstance.value) {
    textareaInstance.value = val
  }
})

onMounted(() => {
  nextTick(initEditor)
})

onBeforeUnmount(() => {
  editorInstance?.destroy?.()
  editorInstance = null
  textareaInstance = null
  isEditorReady = false
})
</script>

<style scoped lang="scss">
.cx-editor {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  overflow: hidden;

  &__toolbar {
    border-bottom: 1px solid #dcdfe6;
  }

  &__content {
    overflow-y: auto;
  }
}
</style>
