import { ref, onMounted } from 'vue'

function randomNum(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min)
}

function randomColor(min: number, max: number): string {
  const r = randomNum(min, max)
  const g = randomNum(min, max)
  const b = randomNum(min, max)
  return `rgb(${r},${g},${b})`
}

function draw(dom: HTMLCanvasElement, width: number, height: number): string {
  let imgCode = ''
  const NUMBER_STRING = '0123456789'

  const ctx = dom.getContext('2d')
  if (!ctx) return imgCode

  // 背景
  ctx.fillStyle = randomColor(180, 230)
  ctx.fillRect(0, 0, width, height)

  // 绘制文字
  for (let i = 0; i < 4; i++) {
    const text = NUMBER_STRING[randomNum(0, NUMBER_STRING.length)]
    imgCode += text
    const fontSize = randomNum(18, 41)
    const deg = randomNum(-30, 30)
    ctx.font = `${fontSize}px Simhei`
    ctx.textBaseline = 'top'
    ctx.fillStyle = randomColor(80, 150)
    ctx.save()
    ctx.translate(30 * i + 15, 15)
    ctx.rotate((deg * Math.PI) / 180)
    ctx.fillText(text, -15 + 5, -15)
    ctx.restore()
  }

  // 干扰线
  for (let i = 0; i < 5; i++) {
    ctx.beginPath()
    ctx.moveTo(randomNum(0, width), randomNum(0, height))
    ctx.lineTo(randomNum(0, width), randomNum(0, height))
    ctx.strokeStyle = randomColor(180, 230)
    ctx.closePath()
    ctx.stroke()
  }

  // 干扰点
  for (let i = 0; i < 41; i++) {
    ctx.beginPath()
    ctx.arc(randomNum(0, width), randomNum(0, height), 1, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.fillStyle = randomColor(150, 200)
    ctx.fill()
  }

  return imgCode
}

export function useImageVerify(width = 120, height = 40) {
  const domRef = ref<HTMLCanvasElement>()
  const imgCode = ref('')

  function setImgCode(code: string) {
    imgCode.value = code
  }

  function getImgCode() {
    if (!domRef.value) return
    imgCode.value = draw(domRef.value, width, height)
  }

  onMounted(() => {
    getImgCode()
  })

  return {
    domRef,
    imgCode,
    setImgCode,
    getImgCode
  }
}
