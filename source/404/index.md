---
title: 404
permalink: /404.html
layout: false
---

<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="UTF-8" />
<title>404</title>

<style>
html, body {
  margin: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #0a0a0a;
  font-family: 'BoutiqueBitmap9x9Gradient', BlinkMacSystemFont; /* 設置字型 */
}

canvas {
  position: fixed;
  inset: 0;
  filter: blur(3px);
  opacity: 0.5;
}

.center {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  color: white;
}

.center h1 {
  font-size: min(32vw, 260px);
  letter-spacing: 0.12em;
  margin: 0;
  text-shadow:
    0 0 25px rgba(255,255,255,0.25),
    0 0 80px rgba(255,255,255,0.12);
}

.center .formula {
  margin-top: -10px;
  font-size: 18px;
  opacity: 0.75;
  letter-spacing: 0.08em;
}

.center .formula span {
  opacity: 0.9;
}
.lim {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  line-height: 1;
}
.lim .under {
  font-size: 0.65em;
  margin-top: -0.1em;
  letter-spacing: 0.05em;
}
.footer {
  position: absolute;
  bottom: 12%;
  width: 100%;
  text-align: center;
  font-size: 13px;
  letter-spacing: 0.25em;
  color: #aaa;
font-family: system-ui, -apple-system, BlinkMacSystemFont;
}
</style>
<link href="https://font.emtech.cc/css/BoutiqueBitmap9x9Gradient?weight=400&words=404PAGENOTFOUND.Backtohome" rel="stylesheet" />
</head>

<body>

<canvas id="bg"></canvas>

<div class="center">
  <h1>404</h1>
  <div class="formula">
        <span class="lim">
        lim<sub id="approach">page</sub>
        </span>
        <span> iach.cc(x) does not exist.</span>

  </div>
</div>

<div class="footer">PAGE NOT FOUND. Back to <a href="./../index.html">home</a></div>

<script>
// dynamic insert path name
const approach = document.getElementById('approach')
approach.textContent = `x→${decodeURIComponent(location.pathname)}`

const canvas = document.getElementById('bg')
const ctx = canvas.getContext('2d')

let w, h
let t = 0


function resize() {
  w = canvas.width = window.innerWidth
  h = canvas.height = window.innerHeight
}
window.addEventListener('resize', resize)
resize()


function drawTan(offset) {
  ctx.beginPath()
  const scaleX = 90
  const scaleY = 40

  for (let x = -w; x < w * 2; x += 2) {
    const rad = (x + offset) / scaleX
    let y = Math.tan(rad)

    // 漸近線切斷
    if (Math.abs(y) > 12) {
      ctx.stroke()
      ctx.beginPath()
      continue
    }

    ctx.lineTo(
      x,
      h / 2 - y * scaleY
    )
  }

  ctx.stroke()
}

function animate() {
  ctx.clearRect(0, 0, w, h)
  ctx.strokeStyle = 'rgba(255,255,255,0.28)'
  ctx.lineWidth = 1

  for (let i = -7; i <= 7; i++) {
    drawTan(t + i * 130)
  }

  t -= 1.1  // speed
  requestAnimationFrame(animate)
}

animate()

</script>

</body>
</html>
