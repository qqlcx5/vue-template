<template>
  <el-drawer
    v-for="(options, index) in drawerStore"
    :key="index"
    v-bind="drawerBindProps(options)"
    v-model="options.visible"
    class="cx-drawer"
    :destroy-on-close="!!options?.destroyOnClose"
    :lock-scroll="options?.lockScroll !== false"
    @closed="onClosed(options, index)"
    @opened="onEvent('open', options, index)"
    @open-auto-focus="onEvent('openAutoFocus', options, index)"
    @close-auto-focus="onEvent('closeAutoFocus', options, index)"
  >
    <!-- header -->
    <template
      v-if="options?.headerRenderer"
      #header="{ close, titleId, titleClass }"
    >
      <component
        :is="options?.headerRenderer({ close, titleId, titleClass })"
      />
    </template>

    <!-- body -->
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
            v-if="btn.popConfirm"
            v-bind="btn.popConfirm"
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
  </el-drawer>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { CxDrawerOptions, CxDrawerButton, CxDrawerBaseProps } from './types'
import { drawerStore, closeDrawer } from './useDrawer'

defineOptions({
  name: 'CxDrawer'
})

const sureBtnMap = reactive<Record<number, { loading: boolean }>>({})

// ============================================================
// Bind props helpers
// ============================================================

function drawerBindProps(options: CxDrawerOptions): Partial<CxDrawerBaseProps> {
  const {
    visible, title, direction, size, resizable,
    modal, closeOnClickModal, closeOnPressEscape,
    showClose, beforeClose, withHeader,
    modalClass, headerClass, bodyClass, footerClass,
    zIndex, headerAriaLevel,
    class: cls, style,
    openDelay, closeDelay, appendToBody
  } = options
  return {
    title, direction, size, resizable,
    modal, closeOnClickModal, closeOnPressEscape,
    showClose, beforeClose, withHeader,
    modalClass, headerClass, bodyClass, footerClass,
    zIndex, headerAriaLevel,
    class: cls, style,
    openDelay, closeDelay,
    appendToBody
  }
}

function buttonBindProps(btn: CxDrawerButton) {
  const { label, popConfirm, btnClick, ...rest } = btn
  return rest
}

// ============================================================
// Footer buttons
// ============================================================

function resolveFooterButtons(options: CxDrawerOptions): CxDrawerButton[] {
  if (options?.footerButtons?.length) return options.footerButtons

  return [
    {
      label: '取消',
      text: true,
      bg: true,
      btnClick: ({ drawer: { options: opt, index } }) => {
        const done = () => closeDrawer(opt, index, { command: 'cancel' })
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
      popConfirm: options?.popConfirm,
      btnClick: ({ drawer: { options: opt, index } }) => {
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
          closeDrawer(opt, index, { command: 'sure' })
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
  btn: CxDrawerButton,
  options: CxDrawerOptions,
  index: number,
  key: number
) {
  btn.btnClick?.({ drawer: { options, index }, button: { btn, index: key } })
}

// ============================================================
// Events
// ============================================================

function onClosed(options: CxDrawerOptions, index: number, args = { command: 'close' }) {
  closeDrawer(options, index, args)
  if (typeof options?.close === 'function') {
    options.close({ options, index })
  }
}

function onEvent(event: 'open' | 'openAutoFocus' | 'closeAutoFocus', options: CxDrawerOptions, index: number) {
  if (options?.[event] && typeof options[event] === 'function') {
    (options[event] as any)({ options, index })
  }
}
</script>

<style scoped lang="scss">
.cx-drawer {
  // Reserved for future styling overrides
}
</style>
