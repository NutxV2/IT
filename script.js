const canvas = document.getElementById('snow');
const ctx = canvas.getContext('2d');

let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

const snowflakes = [];
const maxFlakes = 50;

// สร้างหิมะแต่ละเม็ด
for (let i = 0; i < maxFlakes; i++) {
  snowflakes.push({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 4 + 1, // ขนาดหิมะ
    d: Math.random() * maxFlakes // ความหนาแน่น
  });
}

function draw() {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = 'white';
  ctx.beginPath();
  for (let i = 0; i < maxFlakes; i++) {
    const f = snowflakes[i];
    ctx.moveTo(f.x, f.y);
    ctx.arc(f.x, f.y, f.r, 0, Math.PI*2, true);
  }
  ctx.fill();
  update();
}

let angle = 0;
function update() {
  angle += 0.01;
  for (let i = 0; i < maxFlakes; i++) {
    const f = snowflakes[i];
    f.y += Math.cos(angle + f.d) + 1 + f.r/2;
    f.x += Math.sin(angle) * 2;

    // ถ้าหิมะตกพ้นหน้าจอ ให้กลับขึ้นด้านบน
    if (f.y > h) {
      f.y = -10;
      f.x = Math.random() * w;
    }
  }
}

// ปรับ canvas เมื่อ resize
window.addEventListener('resize', () => {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
});

// เรียก draw ทุกเฟรม (~30fps)
setInterval(draw, 33);