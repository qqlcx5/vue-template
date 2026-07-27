<template>
  <el-dialog
    v-for="(options, index) in dialogStore"
    :key="index"
    v-bind="dialogBindProps(options)"
    v-model="options.visible"
    class="cx-dialog"
    :fullscreen="isFullscreen(options) ? true : false"
    @closed="onClosed(options, index)"
    @opened="onEvent('open', options, index)"
    @openAutoFocus="onEvent('openAutoFocus', options, index)"
    @closeAutoFocus="onEvent('closeAutoFocus', options, index)"
  >
    <!-- header -->
    <template
      v-if="options?.fullscreenIcon || options?.headerRenderer"
      #header="{ close, titleId, titleClass }"
    >
      <div v-if="options?.fullscreenIcon" class="cx-dialog__header">
        <span :id="titleId" :class="titleClass">{{ options?.title }}</span>
        <i
          v-if="!options?.fullscreen"
          class="cx-dialog__fullscreen-btn"
          @click="toggleFullscreen(options, index)"
        >
          <el-icon>
            <FullScreen v-if="!fullscreen" />
            <Crop v-else />
          </el-icon>
        </i>
      </div>
      <component
        :is="options?.headerRenderer({ close, titleId, titleClass })"
        v-else
      />
    </template>

    <!-- content -->
    <component
      v-bind="options?.props"
      :is="options.contentRenderer({ options, index })"
      @close="(args: any) => onClosed(options, index, args)"
    />

    <!-- footer -->
    <template v-if="!options?.hideFooter" #footer>
      <template v-if="options?.footerRenderer">
        <component :is="options?.footerRenderer({ options, index })" />
      </template>
      <span v-else>
        <template v-for="(btn, key) in resolveFooterButtons(options)" :key="key">
          <el-popconfirm
            v-if="btn.popconfirm"
            v-bind="btn.popconfirm"
            @confirm="btnClick(btn, options, index, key)"
          >
            <template #reference>
              <el-button v-bind="buttonBindProps(btn)">{{ btn?.label }}</el-button>
            </template>
          </el-popconfirm>
          <el-button
            v-else
            v-bind="buttonBindProps(btn)"
            :loading="key === 1 && sureBtnMap[index]?.loading"
            @click="btnClick(btn, options, index, key)"
          >
            {{ btn?.label }}
          </el-button>
        </template>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { FullScreen, Crop } from '@element-plus/icons-vue'
import type { CxDialogOptions, CxButtonProps, CxDialogBaseProps } from './types'
import {
  dialogStore,
  closeDialog
} from './useDialog'

defineOptions({
  name: 'CxDialog'
})

const fullscreen = ref(false)
const sureBtnMap = reactive<Record<number, { loading: boolean }>>({})

// ============================================================
// Bind props helpers
// ============================================================

function dialogBindProps(options: CxDialogOptions): Partial<CxDialogBaseProps> {
  const {
    visible, title, width, top, modal, modalClass,
    headerClass, bodyClass, footerClass, appendToBody,
    lockScroll, class: cls, style, openDelay, closeDelay,
    closeOnClickModal, closeOnPressEscape, showClose,
    beforeClose, draggable, overflow, center, alignCenter,
    destroyOnClose, closeIcon, zIndex, headerAriaLevel
  } = options
  return {
    title, width, top, modal, modalClass,
    headerClass, bodyClass, footerClass,
    appendToBody, lockScroll, class: cls, style,
    openDelay, closeDelay,
    closeOnClickModal, closeOnPressEscape, showClose,
    beforeClose, draggable, overflow, center,
    alignCenter, destroyOnClose, closeIcon, zIndex,
    headerAriaLevel
  }
}

function buttonBindProps(btn: CxButtonProps) {
  const { label, popconfirm, btnClick, ...rest } = btn
  return rest
}

// ============================================================
// Footer buttons
// ============================================================

function resolveFooterButtons(options: CxDialogOptions): CxButtonProps[] {
  if (options?.footerButtons?.length) return options.footerButtons

  return [
    {
      label: '取消',
      text: true,
      bg: true,
      btnClick: ({ dialog: { options: opt, index } }) => {
        const done = () => closeDialog(opt, index, { command: 'cancel' })
        if (opt?.beforeCancel && typeof opt.beforeCancel === 'function') {
          opt.beforeCancel(done, { options: opt, index })
        } else {
          done()
        }
      }
    },
    {
      label: '确定',
      type: 'primary',
      text: true,
      bg: true,
      popconfirm: options?.popconfirm,
      btnClick: ({ dialog: { options: opt, index } }) => {
        if (opt?.sureBtnLoading) {
          sureBtnMap[index] = { loading: true }
        }
        const closeLoading = () => {
          if (opt?.sureBtnLoading && sureBtnMap[index]) {
            sureBtnMap[index].loading = false
          }
        }
        const done = () => {
          closeLoading()
          closeDialog(opt, index, { command: 'sure' })
        }
        if (opt?.beforeSure && typeof opt.beforeSure === 'function') {
          opt.beforeSure(done, { options: opt, index, closeLoading })
        } else {
          done()
        }
      }
    }
  ]
}

function btnClick(
  btn: CxButtonProps,
  options: CxDialogOptions,
  index: number,
  key: number
) {
  btn.btnClick?.({ dialog: { options, index }, button: { btn, index: key } })
}

// ============================================================
// Fullscreen
// ============================================================

function isFullscreen(options: CxDialogOptions): boolean {
  return fullscreen.value || options?.fullscreen || false
}

function toggleFullscreen(options: CxDialogOptions, index: number) {
  fullscreen.value = !fullscreen.value
  if (typeof options?.fullscreenCallBack === 'function') {
    options.fullscreenCallBack({
      options: { ...options, fullscreen: fullscreen.value },
      index
    })
  }
}

// ============================================================
// Events
// ============================================================

function onClosed(options: CxDialogOptions, index: number, args = { command: 'close' }) {
  closeDialog(options, index, args)
  if (typeof options?.close === 'function') {
    options.close({ options, index })
  }
}

function onEvent(event: 'open' | 'openAutoFocus' | 'closeAutoFocus', options: CxDialogOptions, index: number) {
  if (!options?.fullscreen) fullscreen.value = options?.fullscreen ?? false
  if (options?.[event] && typeof options[event] === 'function') {
    (options[event] as any)({ options, index })
  }
}
</script>

<style scoped lang="scss">
.cx-dialog {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  &__fullscreen-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 16px;
    transform: translateX(4px) translateY(-6px);

    &:hover {
      color: var(--el-color-danger);
    }
  }
}
</style>
