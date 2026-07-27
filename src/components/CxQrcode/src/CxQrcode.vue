<template>
  <div
    v-loading="loading"
    class="cx-qrcode"
    :style="wrapStyle"
  >
    <!-- Canvas 模式（支持 Logo） -->
    <canvas
      v-if="tag === 'canvas'"
      ref="wrapRef"
      class="cx-qrcode__canvas"
      @click="handleClick"
    />
    <!-- Img 模式 -->
    <img
      v-else
      ref="wrapRef"
      class="cx-qrcode__img"
      alt="qrcode"
      @click="handleClick"
    />

    <!-- 禁用遮罩 -->
    <div
      v-if="disabled"
      class="cx-qrcode__disabled"
      @click="handleDisabledClick"
    >
      <div class="cx-qrcode__disabled-inner">
        <svg
          class="cx-qrcode__refresh-icon"
          viewBox="0 0 1024 1024"
          width="30"
          height="30"
          fill="var(--el-color-primary)"
        >
          <path
            d="M784.384 611.84A281.6 281.6 0 1 1 512 230.4h-25.6l51.2-51.2-36.864-36.864L384 256l116.736 113.664L537.6 332.8l-51.2-51.2H512a230.4 230.4 0 1 0 230.4 230.4l-38.4 38.4 80.384 61.44z"
          />
        </svg>
        <span class="cx-qrcode__disabled-text">{{ disabledText }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import QRCode from 'qrcode'
import type { QRCodeRenderersOptions } from 'qrcode'
import type { CxQrcodeProps, CxQrcodeEmits, QrcodeLogo } from './types'

// ============================================================
// Options
// ============================================================

defineOptions({
  name: 'CxQrcode'
})

// ============================================================
// Props & Emits
// ============================================================

const props = withDefaults(defineProps<CxQrcodeProps>(), {
  tag: 'canvas',
  text: '',
  options: () => ({}),
  width: 200,
  logo: () => '',
  disabled: false,
  disabledText: ''
})

const emit = defineEmits<CxQrcodeEmits>()

// ============================================================
// 响应式状态
// ============================================================

const { toCanvas, toDataURL } = QRCode
const loading = ref(true)
const wrapRef = ref<HTMLCanvasElement | HTMLImageElement | null>(null)

const renderText = computed(() => String(props.text))

const wrapStyle = computed(() => ({
  width: `${props.width}px`,
  height: `${props.width}px`
}))

// ============================================================
// 工具函数
// ============================================================

/** 根据内容长度计算纠错级别 */
function getErrorCorrectionLevel(content: string): string {
  if (content.length > 36) return 'M'
  if (content.length > 16) return 'Q'
  return 'H'
}

/** 获取原始二维码宽度 */
async function getOriginWidth(content: string, options: QRCodeRenderersOptions): Promise<number> {
  const _canvas = document.createElement('canvas')
  await toCanvas(_canvas, content, options)
  return _canvas.width
}

/** 绘制圆角路径 */
function canvasRoundRect(ctx: CanvasRenderingContext2D) {
  return (x: number, y: number, w: number, h: number, r: number) => {
    const minSize = Math.min(w, h)
    if (r > minSize / 2) r = minSize / 2
    ctx.beginPath()
    ctx.moveTo(x + r, y)
    ctx.arcTo(x + w, y, x + w, y + h, r)
    ctx.arcTo(x + w, y + h, x, y + h, r)
    ctx.arcTo(x, y + h, x, y, r)
    ctx.arcTo(x, y, x + w, y, r)
    ctx.closePath()
    return ctx
  }
}

/** 在 Canvas 上绘制 Logo */
function createLogoCode(canvasRef: HTMLCanvasElement): Promise<string> {
  return new Promise((resolve) => {
    const canvasWidth = canvasRef.width
    const isStringLogo = typeof props.logo === 'string'

    const logoOptions: QrcodeLogo = {
      logoSize: 0.15,
      bgColor: '#ffffff',
      borderSize: 0.05,
      crossOrigin: 'anonymous',
      borderRadius: 8,
      logoRadius: 0,
      ...(isStringLogo ? {} : (props.logo as Partial<QrcodeLogo>))
    }

    const {
      logoSize = 0.15,
      bgColor = '#ffffff',
      borderSize = 0.05,
      crossOrigin = 'anonymous',
      borderRadius = 8,
      logoRadius = 0
    } = logoOptions

    const logoSrc: string = isStringLogo ? (props.logo as string) : ((props.logo as QrcodeLogo).src || '')
    if (!logoSrc) {
      resolve(canvasRef.toDataURL())
      return
    }

    const logoWidth = canvasWidth * logoSize
    const logoXY = (canvasWidth * (1 - logoSize)) / 2
    const logoBgWidth = canvasWidth * (logoSize + borderSize)
    const logoBgXY = (canvasWidth * (1 - logoSize - borderSize)) / 2
    const ctx = canvasRef.getContext('2d')
    if (!ctx) {
      resolve(canvasRef.toDataURL())
      return
    }

    // Logo 底色
    canvasRoundRect(ctx)(logoBgXY, logoBgXY, logoBgWidth, logoBgWidth, borderRadius)
    ctx.fillStyle = bgColor
    ctx.fill()

    // Logo 图片
    const image = new Image()
    if (crossOrigin || logoRadius) {
      image.setAttribute('crossOrigin', crossOrigin)
    }
    image.src = logoSrc

    image.onload = () => {
      if (logoRadius) {
        const canvasImage = document.createElement('canvas')
        canvasImage.width = logoXY + logoWidth
        canvasImage.height = logoXY + logoWidth
        const imageCanvas = canvasImage.getContext('2d')
        if (!imageCanvas) {
          resolve(canvasRef.toDataURL())
          return
        }
        imageCanvas.drawImage(image, logoXY, logoXY, logoWidth, logoWidth)
        canvasRoundRect(ctx)(logoXY, logoXY, logoWidth, logoWidth, logoRadius)
        const fillStyle = ctx.createPattern(canvasImage, 'no-repeat')
        if (fillStyle) {
          ctx.fillStyle = fillStyle
          ctx.fill()
        }
      } else {
        ctx.drawImage(image, logoXY, logoXY, logoWidth, logoWidth)
      }
      resolve(canvasRef.toDataURL())
    }

    image.onerror = () => {
      resolve(canvasRef.toDataURL())
    }
  })
}

// ============================================================
// 初始化二维码
// ============================================================

async function initQrcode() {
  await nextTick()
  const options: QRCodeRenderersOptions = JSON.parse(JSON.stringify(props.options || {}))

  if (props.tag === 'canvas') {
    options.errorCorrectionLevel =
      options.errorCorrectionLevel || getErrorCorrectionLevel(renderText.value) as any

    const _width = await getOriginWidth(renderText.value, options)
    options.scale = props.width === 0 ? undefined : (props.width / _width) * 4

    const canvasRef = await toCanvas(
      wrapRef.value as HTMLCanvasElement,
      renderText.value,
      options
    )

    if (props.logo) {
      const url = await createLogoCode(canvasRef)
      emit('done', url)
    } else {
      emit('done', canvasRef.toDataURL())
    }
  } else {
    const url = await toDataURL(renderText.value, {
      errorCorrectionLevel: 'H',
      width: props.width,
      ...options
    })
    if (wrapRef.value) {
      ;(wrapRef.value as HTMLImageElement).src = url
    }
    emit('done', url)
  }

  loading.value = false
}

// ============================================================
// 事件处理
// ============================================================

function handleClick() {
  emit('click')
}

function handleDisabledClick() {
  emit('disabled-click')
}

// ============================================================
// Watch & Init
// ============================================================

watch(
  () => renderText.value,
  (val) => {
    if (!val) return
    initQrcode()
  },
  { immediate: true }
)
</script>

<style scoped lang="scss">
.cx-qrcode {
  position: relative;
  display: inline-block;
  overflow: hidden;

  &__canvas,
  &__img {
    display: block;
    cursor: pointer;
  }

  &__disabled {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: rgb(255 255 255 / 95%);
    cursor: pointer;
    z-index: 2;

    &-inner {
      position: absolute;
      top: 50%;
      left: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      transform: translate(-50%, -50%);
      font-weight: 700;
    }
  }

  &__refresh-icon {
    cursor: pointer;
  }

  &__disabled-text {
    font-size: 12px;
    color: var(--el-text-color-primary, #303133);
  }
}
</style>
