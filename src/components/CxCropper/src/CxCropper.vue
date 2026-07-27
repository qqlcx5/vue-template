<template>
  <div
    v-if="currentSrc"
    ref="tippyElRef"
    class="cx-cropper"
    :class="{ 'cx-cropper--circled': circled }"
    :style="wrapperStyle"
    @contextmenu.prevent="onContextMenu"
  >
    <img
      v-show="isReady"
      ref="imgElRef"
      :style="getImageStyle"
      :src="currentSrc"
      :alt="alt"
      :crossorigin="crossorigin"
    />

    <!-- Context Menu Overlay -->
    <Teleport to="body">
      <div
        v-if="menuVisible"
        class="cx-cropper__menu"
        :style="menuStyle"
        @click.stop
      >
        <!-- Upload -->
        <el-upload
          accept="image/*"
          :show-file-list="false"
          :before-upload="handleBeforeUpload"
        >
          <el-tooltip content="上传" placement="left-start">
            <el-button class="cx-cropper__menu-btn" :icon="UploadFilled" circle plain />
          </el-tooltip>
        </el-upload>

        <!-- Download -->
        <el-tooltip content="下载" placement="right-start">
          <el-button
            class="cx-cropper__menu-btn"
            :icon="Download"
            circle
            plain
            @click="handleDownload"
          />
        </el-tooltip>

        <!-- Toggle Circle -->
        <el-tooltip content="圆形/矩形裁剪" placement="left-start">
          <el-button
            class="cx-cropper__menu-btn"
            :icon="Switch"
            circle
            plain
            @click="toggleCircled"
          />
        </el-tooltip>

        <!-- Reset -->
        <el-tooltip content="重置" placement="right-start">
          <el-button
            class="cx-cropper__menu-btn"
            :icon="RefreshLeft"
            circle
            plain
            @click="handCropper('reset')"
          />
        </el-tooltip>

        <!-- Move Up -->
        <el-tooltip content="上移" placement="left-start">
          <el-button
            class="cx-cropper__menu-btn"
            :icon="Top"
            circle
            plain
            @mousedown="startLongPress(() => handCropper('move', [0, -10]))"
            @mouseup="stopLongPress"
            @mouseleave="stopLongPress"
          />
        </el-tooltip>

        <!-- Move Down -->
        <el-tooltip content="下移" placement="right-start">
          <el-button
            class="cx-cropper__menu-btn"
            :icon="Bottom"
            circle
            plain
            @mousedown="startLongPress(() => handCropper('move', [0, 10]))"
            @mouseup="stopLongPress"
            @mouseleave="stopLongPress"
          />
        </el-tooltip>

        <!-- Move Left -->
        <el-tooltip content="左移" placement="left-start">
          <el-button
            class="cx-cropper__menu-btn"
            :icon="Back"
            circle
            plain
            @mousedown="startLongPress(() => handCropper('move', [-10, 0]))"
            @mouseup="stopLongPress"
            @mouseleave="stopLongPress"
          />
        </el-tooltip>

        <!-- Move Right -->
        <el-tooltip content="右移" placement="right-start">
          <el-button
            class="cx-cropper__menu-btn"
            :icon="Right"
            circle
            plain
            @mousedown="startLongPress(() => handCropper('move', [10, 0]))"
            @mouseup="stopLongPress"
            @mouseleave="stopLongPress"
          />
        </el-tooltip>

        <!-- Flip Horizontal -->
        <el-tooltip content="水平翻转" placement="left-start">
          <el-button
            class="cx-cropper__menu-btn"
            :icon="DArrowRight"
            circle
            plain
            @click="handCropper('scaleX', -1)"
          />
        </el-tooltip>

        <!-- Flip Vertical -->
        <el-tooltip content="垂直翻转" placement="right-start">
          <el-button
            class="cx-cropper__menu-btn"
            :icon="DArrowLeft"
            circle
            plain
            @click="handCropper('scaleY', -1)"
          />
        </el-tooltip>

        <!-- Rotate Left -->
        <el-tooltip content="逆时针旋转" placement="left-start">
          <el-button
            class="cx-cropper__menu-btn"
            :icon="RefreshLeft"
            circle
            plain
            @click="handCropper('rotate', -45)"
          />
        </el-tooltip>

        <!-- Rotate Right -->
        <el-tooltip content="顺时针旋转" placement="right-start">
          <el-button
            class="cx-cropper__menu-btn"
            :icon="RefreshRight"
            circle
            plain
            @click="handCropper('rotate', 45)"
          />
        </el-tooltip>

        <!-- Zoom In -->
        <el-tooltip content="放大" placement="left-start">
          <el-button
            class="cx-cropper__menu-btn"
            :icon="ZoomIn"
            circle
            plain
            @mousedown="startLongPress(() => handCropper('zoom', 0.1))"
            @mouseup="stopLongPress"
            @mouseleave="stopLongPress"
          />
        </el-tooltip>

        <!-- Zoom Out -->
        <el-tooltip content="缩小" placement="right-start">
          <el-button
            class="cx-cropper__menu-btn"
            :icon="ZoomOut"
            circle
            plain
            @mousedown="startLongPress(() => handCropper('zoom', -0.1))"
            @mouseup="stopLongPress"
            @mouseleave="stopLongPress"
          />
        </el-tooltip>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useEventListener } from '@vueuse/core'
import { ElUpload, ElButton, ElTooltip } from 'element-plus'
import {
  UploadFilled,
  Download,
  RefreshLeft,
  RefreshRight,
  Top,
  Bottom,
  Back,
  Right,
  DArrowRight,
  DArrowLeft,
  ZoomIn,
  ZoomOut,
  Switch
} from '@element-plus/icons-vue'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import type { CxCropperProps, CxCropperResult } from './types'
import type { CSSProperties } from 'vue'

/***********************************************
 * Options
 ***********************************************/
defineOptions({
  name: 'CxCropper'
})

/***********************************************
 * Props
 ***********************************************/
const props = withDefaults(defineProps<CxCropperProps>(), {
  alt: '',
  circled: false,
  height: '360px',
  realTimePreview: true,
  crossorigin: undefined,
  imageStyle: () => ({}),
  options: () => ({})
})

/***********************************************
 * Emits
 ***********************************************/
const emit = defineEmits<{
  cropper: [result: CxCropperResult]
  readied: [cropperInstance: Cropper]
  error: []
}>()

/***********************************************
 * State
 ***********************************************/
const tippyElRef = ref<HTMLElement>()
const imgElRef = ref<HTMLImageElement>()
const cropperIns = ref<Cropper | null>(null)
const currentSrc = ref(props.src)
const circled = ref(props.circled)
const isReady = ref(false)
const imgBase64 = ref('')
const menuVisible = ref(false)
const menuStyle = ref<Record<string, string>>({})
let scaleX = 1
let scaleY = 1
let longPressTimer: ReturnType<typeof setInterval> | null = null
let debounceTimer: ReturnType<typeof setTimeout> | null = null

/***********************************************
 * Computed
 ***********************************************/
const wrapperStyle = computed(() => ({
  height: typeof props.height === 'number' ? `${props.height}px` : props.height
}))

const getImageStyle = computed(() => ({
  height: typeof props.height === 'number' ? `${props.height}px` : props.height,
  maxWidth: '100%',
  ...props.imageStyle
}))

/***********************************************
 * Default cropper options
 ***********************************************/
const defaultOptions: Cropper.Options = {
  aspectRatio: NaN,
  zoomable: true,
  zoomOnTouch: true,
  zoomOnWheel: true,
  cropBoxMovable: true,
  cropBoxResizable: true,
  toggleDragModeOnDblclick: true,
  autoCrop: true,
  background: true,
  highlight: true,
  center: true,
  responsive: true,
  restore: true,
  checkCrossOrigin: true,
  checkOrientation: true,
  scalable: true,
  modal: true,
  guides: true,
  movable: true,
  rotatable: true
}

/***********************************************
 * Lifecycle
 ***********************************************/
onMounted(() => {
  init()
  useEventListener(document, 'click', handleOutsideClick)
})

onUnmounted(() => {
  if (longPressTimer) {
    clearInterval(longPressTimer)
    longPressTimer = null
  }
  if (debounceTimer) {
    clearTimeout(debounceTimer)
    debounceTimer = null
  }
  cropperIns.value?.destroy()
  isReady.value = false
  cropperIns.value = null
  imgBase64.value = ''
  scaleX = 1
  scaleY = 1
})

watch(() => props.src, (val) => {
  currentSrc.value = val
  nextTick(init)
})

/***********************************************
 * Init
 ***********************************************/
async function init() {
  const imgEl = imgElRef.value
  if (!imgEl || !currentSrc.value) return

  await nextTick()

  // Allow image to load before initializing cropper
  if (!imgEl.complete) {
    await new Promise<void>(resolve => {
      imgEl!.onload = () => resolve()
      imgEl!.onerror = () => {
        emit('error')
        resolve()
      }
    })
  }

  cropperIns.value?.destroy()

  cropperIns.value = new Cropper(imgEl, {
    ...defaultOptions,
    ready: () => {
      isReady.value = true
      realTimeCroppered()
      setTimeout(() => {
        if (cropperIns.value) {
          emit('readied', cropperIns.value)
        }
      }, 400)
    },
    crop() {
      debounceRealTimeCroppered()
    },
    zoom() {
      debounceRealTimeCroppered()
    },
    cropmove() {
      debounceRealTimeCroppered()
    },
    ...props.options
  })
}

/***********************************************
 * Crop
 ***********************************************/
function debounceRealTimeCroppered() {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    realTimeCroppered()
  }, 80)
}

function realTimeCroppered() {
  if (props.realTimePreview) {
    croppered()
  }
}

function croppered() {
  if (!cropperIns.value) return

  const canvas = circled.value
    ? getRoundedCanvas()
    : cropperIns.value.getCroppedCanvas()

  if (!canvas) return

  canvas.toBlob(blob => {
    if (!blob) return
    const reader = new FileReader()
    reader.readAsDataURL(blob)
    reader.onloadend = () => {
      const data = cropperIns.value!.getData()
      if (!reader.result || !blob) return
      imgBase64.value = reader.result as string
      emit('cropper', {
        base64: reader.result as string,
        blob,
        info: {
          size: blob.size,
          x: data.x,
          y: data.y,
          width: data.width,
          height: data.height,
          rotate: data.rotate,
          scaleX: data.scaleX,
          scaleY: data.scaleY
        }
      })
    }
    reader.onerror = () => {
      emit('error')
    }
  })
}

function getRoundedCanvas(): HTMLCanvasElement {
  const sourceCanvas = cropperIns.value!.getCroppedCanvas()
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!
  const w = sourceCanvas.width
  const h = sourceCanvas.height
  canvas.width = w
  canvas.height = h
  ctx.drawImage(sourceCanvas, 0, 0, w, h)
  ctx.globalCompositeOperation = 'destination-in'
  ctx.beginPath()
  ctx.arc(w / 2, h / 2, Math.min(w, h) / 2, 0, 2 * Math.PI, true)
  ctx.fill()
  return canvas
}

/***********************************************
 * Cropper controls
 ***********************************************/
function handCropper(action: string, arg?: number | number[]) {
  if (action === 'scaleX') {
    scaleX = scaleX === -1 ? 1 : -1
    cropperIns.value?.scaleX(scaleX)
    return
  }
  if (action === 'scaleY') {
    scaleY = scaleY === -1 ? 1 : -1
    cropperIns.value?.scaleY(scaleY)
    return
  }
  if (Array.isArray(arg)) {
    ;(cropperIns.value as any)?.[action]?.(...arg)
  } else {
    ;(cropperIns.value as any)?.[action]?.(arg)
  }
}

/***********************************************
 * Upload
 ***********************************************/
function handleBeforeUpload(file: File): boolean {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = (e) => {
    currentSrc.value = e.target?.result as string
    nextTick(init)
  }
  return false
}

/***********************************************
 * Download
 ***********************************************/
function handleDownload() {
  if (!imgBase64.value) return
  const a = document.createElement('a')
  a.href = imgBase64.value
  a.download = 'cropping.png'
  a.click()
}

/***********************************************
 * Circular toggle
 ***********************************************/
function toggleCircled() {
  circled.value = !circled.value
  realTimeCroppered()
}

/***********************************************
 * Context Menu
 ***********************************************/
function onContextMenu(event: MouseEvent) {
  menuVisible.value = true
  menuStyle.value = {
    position: 'fixed',
    left: `${event.clientX}px`,
    top: `${event.clientY}px`,
    zIndex: '9999'
  }
}

function handleOutsideClick() {
  menuVisible.value = false
}

/***********************************************
 * Long press
 ***********************************************/
function startLongPress(fn: () => void) {
  fn()
  longPressTimer = setInterval(fn, 100)
}

function stopLongPress() {
  if (longPressTimer) {
    clearInterval(longPressTimer)
    longPressTimer = null
  }
}
</script>

<style scoped lang="scss">
.cx-cropper {
  position: relative;
  display: inline-block;

  &--circled {
    :deep(.cropper-view-box),
    :deep(.cropper-face) {
      border-radius: 50%;
    }
  }

  // 右键菜单
  &__menu {
    background: #fff;
    border: 1px solid #e4e7ed;
    border-radius: 6px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    padding: 6px;
    display: grid;
    grid-template-columns: repeat(2, 36px);
    gap: 4px;
  }

  &__menu-btn {
    width: 36px;
    height: 36px;
    padding: 0 !important;
    border-radius: 4px !important;

    &:hover {
      background-color: rgba(0, 0, 0, 0.06);
    }

    :deep(.el-icon) {
      font-size: 16px;
    }
  }
}
</style>
