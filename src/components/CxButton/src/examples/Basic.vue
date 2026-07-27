<template>
  <div class="cx-button-example-basic">
    <h3>前置/后置图标</h3>
    <CxButton preIcon="edit" type="primary" @click="onClick">编辑</CxButton>
    <CxButton preIcon="delete" type="danger" style="margin-left: 12px">删除</CxButton>
    <CxButton postIcon="arrow-right" type="success" style="margin-left: 12px">下一步</CxButton>
  </div>
</template>

<script setup lang="ts">
import CxButton from '../CxButton.vue'

defineOptions({ name: 'CxButtonExampleBasic' })

function onClick() {
  console.log('clicked')
}
</script>
