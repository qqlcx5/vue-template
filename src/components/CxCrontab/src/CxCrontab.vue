<template>
  <div class="cx-crontab">
    <el-tabs v-model="activeTab" type="border-card">
      <el-tab-pane v-if="!hideSecond" label="秒" name="second">
        <div class="cx-crontab__field">
          <el-radio-group v-model="secondConfig.type" @change="buildCron">
            <el-radio value="*">每秒</el-radio>
            <el-radio value="period">周期</el-radio>
            <el-radio value="range">范围</el-radio>
            <el-radio value="specific">指定</el-radio>
          </el-radio-group>
          <div v-if="secondConfig.type === 'period'" class="cx-crontab__detail">
            从 <el-input-number v-model="secondConfig.periodStart" :min="0" :max="59" @change="buildCron" />
            秒开始，每 <el-input-number v-model="secondConfig.periodInterval" :min="1" :max="59" @change="buildCron" /> 秒执行
          </div>
          <div v-if="secondConfig.type === 'range'" class="cx-crontab__detail">
            从 <el-input-number v-model="secondConfig.rangeStart" :min="0" :max="59" @change="buildCron" />
            到 <el-input-number v-model="secondConfig.rangeEnd" :min="0" :max="59" @change="buildCron" /> 秒
          </div>
          <div v-if="secondConfig.type === 'specific'" class="cx-crontab__detail">
            <el-checkbox-group v-model="secondConfig.specific" @change="buildCron">
              <el-checkbox v-for="i in 60" :key="i - 1" :value="i - 1">{{ i - 1 }}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="分" name="minute">
        <div class="cx-crontab__field">
          <el-radio-group v-model="minuteConfig.type" @change="buildCron">
            <el-radio value="*">每分钟</el-radio>
            <el-radio value="period">周期</el-radio>
            <el-radio value="range">范围</el-radio>
            <el-radio value="specific">指定</el-radio>
          </el-radio-group>
          <div v-if="minuteConfig.type === 'period'" class="cx-crontab__detail">
            从 <el-input-number v-model="minuteConfig.periodStart" :min="0" :max="59" @change="buildCron" />
            分开始，每 <el-input-number v-model="minuteConfig.periodInterval" :min="1" :max="59" @change="buildCron" /> 分执行
          </div>
          <div v-if="minuteConfig.type === 'range'" class="cx-crontab__detail">
            从 <el-input-number v-model="minuteConfig.rangeStart" :min="0" :max="59" @change="buildCron" />
            到 <el-input-number v-model="minuteConfig.rangeEnd" :min="0" :max="59" @change="buildCron" /> 分
          </div>
          <div v-if="minuteConfig.type === 'specific'" class="cx-crontab__detail">
            <el-checkbox-group v-model="minuteConfig.specific" @change="buildCron">
              <el-checkbox v-for="i in 60" :key="i - 1" :value="i - 1">{{ i - 1 }}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="时" name="hour">
        <div class="cx-crontab__field">
          <el-radio-group v-model="hourConfig.type" @change="buildCron">
            <el-radio value="*">每小时</el-radio>
            <el-radio value="period">周期</el-radio>
            <el-radio value="range">范围</el-radio>
            <el-radio value="specific">指定</el-radio>
          </el-radio-group>
          <div v-if="hourConfig.type === 'period'" class="cx-crontab__detail">
            从 <el-input-number v-model="hourConfig.periodStart" :min="0" :max="23" @change="buildCron" />
            时开始，每 <el-input-number v-model="hourConfig.periodInterval" :min="1" :max="23" @change="buildCron" /> 时执行
          </div>
          <div v-if="hourConfig.type === 'range'" class="cx-crontab__detail">
            从 <el-input-number v-model="hourConfig.rangeStart" :min="0" :max="23" @change="buildCron" />
            到 <el-input-number v-model="hourConfig.rangeEnd" :min="0" :max="23" @change="buildCron" /> 时
          </div>
          <div v-if="hourConfig.type === 'specific'" class="cx-crontab__detail">
            <el-checkbox-group v-model="hourConfig.specific" @change="buildCron">
              <el-checkbox v-for="i in 24" :key="i - 1" :value="i - 1">{{ i - 1 }}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="日" name="day">
        <div class="cx-crontab__field">
          <el-radio-group v-model="dayConfig.type" @change="buildCron">
            <el-radio value="*">每日</el-radio>
            <el-radio value="?">不指定</el-radio>
            <el-radio value="period">周期</el-radio>
            <el-radio value="range">范围</el-radio>
            <el-radio value="specific">指定</el-radio>
            <el-radio value="last">本月最后一天</el-radio>
          </el-radio-group>
          <div v-if="dayConfig.type === 'period'" class="cx-crontab__detail">
            从 <el-input-number v-model="dayConfig.periodStart" :min="1" :max="31" @change="buildCron" />
            号开始，每 <el-input-number v-model="dayConfig.periodInterval" :min="1" :max="31" @change="buildCron" /> 天执行
          </div>
          <div v-if="dayConfig.type === 'range'" class="cx-crontab__detail">
            从 <el-input-number v-model="dayConfig.rangeStart" :min="1" :max="31" @change="buildCron" />
            到 <el-input-number v-model="dayConfig.rangeEnd" :min="1" :max="31" @change="buildCron" /> 号
          </div>
          <div v-if="dayConfig.type === 'specific'" class="cx-crontab__detail">
            <el-checkbox-group v-model="dayConfig.specific" @change="buildCron">
              <el-checkbox v-for="i in 31" :key="i" :value="i">{{ i }}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="月" name="month">
        <div class="cx-crontab__field">
          <el-radio-group v-model="monthConfig.type" @change="buildCron">
            <el-radio value="*">每月</el-radio>
            <el-radio value="period">周期</el-radio>
            <el-radio value="range">范围</el-radio>
            <el-radio value="specific">指定</el-radio>
          </el-radio-group>
          <div v-if="monthConfig.type === 'period'" class="cx-crontab__detail">
            从 <el-input-number v-model="monthConfig.periodStart" :min="1" :max="12" @change="buildCron" />
            月开始，每 <el-input-number v-model="monthConfig.periodInterval" :min="1" :max="12" @change="buildCron" /> 月执行
          </div>
          <div v-if="monthConfig.type === 'range'" class="cx-crontab__detail">
            从 <el-input-number v-model="monthConfig.rangeStart" :min="1" :max="12" @change="buildCron" />
            到 <el-input-number v-model="monthConfig.rangeEnd" :min="1" :max="12" @change="buildCron" /> 月
          </div>
          <div v-if="monthConfig.type === 'specific'" class="cx-crontab__detail">
            <el-checkbox-group v-model="monthConfig.specific" @change="buildCron">
              <el-checkbox v-for="i in 12" :key="i" :value="i">{{ i }}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane v-if="!hideWeek" label="周" name="week">
        <div class="cx-crontab__field">
          <el-radio-group v-model="weekConfig.type" @change="buildCron">
            <el-radio value="*">每周</el-radio>
            <el-radio value="?">不指定</el-radio>
            <el-radio value="period">周期</el-radio>
            <el-radio value="range">范围</el-radio>
            <el-radio value="specific">指定</el-radio>
          </el-radio-group>
          <div v-if="weekConfig.type === 'period'" class="cx-crontab__detail">
            从周 <el-input-number v-model="weekConfig.periodStart" :min="1" :max="7" @change="buildCron" />
            开始，每 <el-input-number v-model="weekConfig.periodInterval" :min="1" :max="7" @change="buildCron" /> 周执行
          </div>
          <div v-if="weekConfig.type === 'range'" class="cx-crontab__detail">
            从周 <el-input-number v-model="weekConfig.rangeStart" :min="1" :max="7" @change="buildCron" />
            到周 <el-input-number v-model="weekConfig.rangeEnd" :min="1" :max="7" @change="buildCron" />
          </div>
          <div v-if="weekConfig.type === 'specific'" class="cx-crontab__detail">
            <el-checkbox-group v-model="weekConfig.specific" @change="buildCron">
              <el-checkbox v-for="(label, i) in weekLabels" :key="i + 1" :value="i + 1">{{ label }}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane v-if="!hideYear" label="年" name="year">
        <div class="cx-crontab__field">
          <el-radio-group v-model="yearConfig.type" @change="buildCron">
            <el-radio value="*">每年</el-radio>
            <el-radio value="period">周期</el-radio>
            <el-radio value="specific">指定</el-radio>
          </el-radio-group>
          <div v-if="yearConfig.type === 'period'" class="cx-crontab__detail">
            从 <el-input-number v-model="yearConfig.periodStart" :min="2024" :max="2099" @change="buildCron" />
            年开始，每 <el-input-number v-model="yearConfig.periodInterval" :min="1" :max="99" @change="buildCron" /> 年执行
          </div>
          <div v-if="yearConfig.type === 'specific'" class="cx-crontab__detail">
            指定年份：
            <el-checkbox-group v-model="yearConfig.specific" @change="buildCron">
              <el-checkbox v-for="i in 10" :key="2024 + i - 1" :value="2024 + i - 1">{{ 2024 + i - 1 }}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="cx-crontab__result">
      <span class="cx-crontab__result-label">Cron 表达式：</span>
      <el-tag type="info" class="cx-crontab__result-value">{{ cronExpression }}</el-tag>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue'
import type { CxCrontabProps, CxCrontabEmits } from './types'

defineOptions({ name: 'CxCrontab' })

const props = withDefaults(defineProps<CxCrontabProps>(), {
  modelValue: '* * * * * ?',
  hideSecond: false,
  hideYear: true,
  hideWeek: false,
})

const emit = defineEmits<CxCrontabEmits>()

const activeTab = ref('second')
const cronExpression = ref(props.modelValue)

const weekLabels = ['日', '一', '二', '三', '四', '五', '六']

// 各字段配置
const secondConfig = reactive({ type: '*', periodStart: 0, periodInterval: 1, rangeStart: 0, rangeEnd: 1, specific: [] as number[] })
const minuteConfig = reactive({ type: '*', periodStart: 0, periodInterval: 1, rangeStart: 0, rangeEnd: 1, specific: [] as number[] })
const hourConfig = reactive({ type: '*', periodStart: 0, periodInterval: 1, rangeStart: 0, rangeEnd: 1, specific: [] as number[] })
const dayConfig = reactive({ type: '*', periodStart: 1, periodInterval: 1, rangeStart: 1, rangeEnd: 2, specific: [] as number[] })
const monthConfig = reactive({ type: '*', periodStart: 1, periodInterval: 1, rangeStart: 1, rangeEnd: 2, specific: [] as number[] })
const weekConfig = reactive({ type: '?', periodStart: 1, periodInterval: 1, rangeStart: 1, rangeEnd: 2, specific: [] as number[] })
const yearConfig = reactive({ type: '*', periodStart: 2025, periodInterval: 1, specific: [] as number[] })

function buildField(config: typeof secondConfig): string {
  switch (config.type) {
    case '*': return '*'
    case '?': return '?'
    case 'last': return 'L'
    case 'period': return `${config.periodStart}/${config.periodInterval}`
    case 'range': return `${config.rangeStart}-${config.rangeEnd}`
    case 'specific': return config.specific.length ? config.specific.join(',') : '*'
    default: return '*'
  }
}

function buildCron() {
  const parts = [
    props.hideSecond ? '0' : buildField(secondConfig),
    buildField(minuteConfig),
    buildField(hourConfig),
    buildField(dayConfig),
    buildField(monthConfig),
    buildField(weekConfig),
  ]
  if (!props.hideYear) {
    parts.push(buildField(yearConfig))
  }
  cronExpression.value = parts.join(' ')
  emit('update:modelValue', cronExpression.value)
}

function parseCron(val: string) {
  const parts = val.split(' ')
  if (parts.length < 6) return
  const [sec, min, hr, day, mon, wk, yr] = parts
  if (!props.hideSecond) parseField(sec, secondConfig, 0, 59)
  parseField(min, minuteConfig, 0, 59)
  parseField(hr, hourConfig, 0, 23)
  parseField(day, dayConfig, 1, 31, true)
  parseField(mon, monthConfig, 1, 12)
  parseField(wk, weekConfig, 1, 7, true)
  if (yr && !props.hideYear) parseField(yr, yearConfig, 2024, 2099)
}

function parseField(val: string, config: any, _min: number, _max: number, canQuestion = false) {
  if (val === '*') config.type = '*'
  else if (val === '?' && canQuestion) config.type = '?'
  else if (val === 'L') config.type = 'last'
  else if (val.includes('/')) {
    config.type = 'period'
    const [start, interval] = val.split('/')
    config.periodStart = Number(start)
    config.periodInterval = Number(interval)
  } else if (val.includes('-')) {
    config.type = 'range'
    const [start, end] = val.split('-')
    config.rangeStart = Number(start)
    config.rangeEnd = Number(end)
  } else if (val.includes(',')) {
    config.type = 'specific'
    config.specific = val.split(',').map(Number)
  } else {
    config.type = 'specific'
    config.specific = [Number(val)]
  }
}

watch(() => props.modelValue, (val) => {
  if (val && val !== cronExpression.value) {
    parseCron(val)
    cronExpression.value = val
  }
})

onMounted(() => {
  const initialVal = props.modelValue ?? '* * * * * ?'
  if (!initialVal || initialVal.split(' ').length < 6) {
    // modelValue 无效时基于默认 config 构建并 emit
    buildCron()
    return
  }
  parseCron(initialVal)
  cronExpression.value = initialVal
})
</script>

<style scoped lang="scss">
.cx-crontab {
  &__field {
    padding: 8px 0;
  }
  &__detail {
    margin-top: 12px;
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
  }
  &__result {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 16px;
    padding: 12px;
    background: #f5f7fa;
    border-radius: 4px;
  }
  &__result-label {
    font-size: 14px;
    color: #606266;
    white-space: nowrap;
  }
  &__result-value {
    font-family: monospace;
    font-size: 14px;
  }
}
</style>
