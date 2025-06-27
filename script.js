// === script.js ===
const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

let mouse = { x: null, y: null, radius: 150 };

// Captura la posición del ratón
document.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Ajusta el tamaño del canvas
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Clase que representa cada espora
class Spore {
  constructor() {
    // Posición aleatoria en cualquier lugar de la pantalla
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    
    // Dirección aleatoria
    const angle = Math.random() * Math.PI * 2;
    // Velocidad más lenta para movimiento sutil
    this.vx = Math.cos(angle) * (0.03 + Math.random() * 0.07);
    this.vy = Math.sin(angle) * (0.03 + Math.random() * 0.07);
    
    this.size = 1 + Math.random() * 3;
    this.alpha = 0.1 + Math.random() * 0.3;
    this.life = 0;
    this.maxLife = 800 + Math.random() * 800;
  }
  update() {
    // Repulsión del ratón
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    const dist = Math.hypot(dx, dy);
    if (dist < mouse.radius) {
      const force = (mouse.radius - dist) / mouse.radius;
      this.vx += (dx / dist) * force * 0.2;
      this.vy += (dy / dist) * force * 0.2;
    }

    this.x += this.vx;
    this.y += this.vy;
    this.life++;
    
    // Dispersión aleatoria muy suave
    this.vx += (Math.random() - 0.5) * 0.002;
    this.vy += (Math.random() - 0.5) * 0.002;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${this.alpha * (1 - this.life / this.maxLife)})`;
    ctx.fill();
  }
  isDead() {
    return this.life > this.maxLife;
  }
}

let spores = [];

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Genera esporas más lentamente
  if (Math.random() < 0.1) spores.push(new Spore());

  spores.forEach((s, i) => {
    s.update();
    s.draw();
    if (s.isDead()) spores.splice(i, 1);
  });

  requestAnimationFrame(animate);
}

// Inicia la animación
animate();
