const form = document.querySelector('.form-contato');
const btn = document.querySelector('.btn-enviar');

form.addEventListener('submit', function (e) {
e.preventDefault();

const nome = document.getElementById('nome').value.trim();
const email = document.getElementById('email').value.trim();
const mensagem = document.getElementById('mensagem').value.trim();

if (!nome || !email || !mensagem) {
    alert('⚠️ Todos os campos são obrigatórios. Preencha corretamente.');
    return;
}

const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!regexEmail.test(email)) {
    alert('📡 E-mail inválido. Verifique o canal de retorno.');
    return;
}

btn.innerText = 'Criptografando dados... 🔐';
btn.disabled = true;

setTimeout(() => {
    form.submit(); // simula envio real
}, 1500); // tempo de "criptografia"
});

// gotículas
const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');

  let width, height;
  const particles = [];
  const maxParticles = 120;
  const maxDistance = 150;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.radius = 2 + Math.random() * 3;
      this.speedX = (Math.random() - 0.5) * 1.2;
      this.speedY = (Math.random() - 0.5) * 1.2;
      this.alpha = 0.15 + Math.random() * 0.15; // opacidade menor
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > width) this.speedX *= -1;
      if (this.y < 0 || this.y > height) this.speedY *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.fillStyle = `rgba(31, 111, 235, ${this.alpha})`;
      ctx.shadowColor = `rgba(31, 111, 235, ${this.alpha})`;
      ctx.shadowBlur = 8;
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function connectParticles() {
    for (let i = 0; i < maxParticles; i++) {
      for (let j = i + 1; j < maxParticles; j++) {
        const p1 = particles[i];
        const p2 = particles[j];

        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const lineAlpha = (1 - dist / maxDistance) * 0.2; // linhas mais suaves
          ctx.beginPath();
          ctx.strokeStyle = `rgba(31, 111, 235, ${lineAlpha})`;
          ctx.lineWidth = 1.5;
          ctx.shadowColor = `rgba(31, 111, 235, ${lineAlpha})`;
          ctx.shadowBlur = 6;
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
          ctx.closePath();
        }
      }
    }
  }

  function init() {
    for (let i = 0; i < maxParticles; i++) {
      particles.push(new Particle());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    connectParticles();

    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => {
    resize();
  });

  resize();
  init();
  animate();
