// === MENU HAMBÚRGUER ===
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

toggle.addEventListener('click', () => {
  nav.classList.toggle('active');
});

// === FORMULÁRIO + MODAL ===
const form = document.querySelector('.form-contato');
const btn = document.querySelector('.btn-enviar');
const modal = document.getElementById('modalAgradecimento');

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
    const formData = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (response.status === 200 || response.status === 302) {
        modal.classList.remove('hidden');
        form.reset();
      } else {
        alert('Algo deu errado. Tente novamente.');
      }
      btn.innerText = 'Enviar Missão';
      btn.disabled = false;
    })
    .catch(() => {
      alert('Erro inesperado. Tente novamente mais tarde.');
      btn.innerText = 'Enviar Missão';
      btn.disabled = false;
    });
  }, 1500);
});

function fecharModal() {
  modal.classList.add('hidden');
  window.location.href = 'index.html';
}


// === GOTÍCULAS (PARTÍCULAS) ===
(() => {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let width, height;
  const particles = [];
  const maxParticles = 100;

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
      this.radius = 1 + Math.random() * 2;
      this.speedX = (Math.random() - 0.5) * 0.2;
      this.speedY = (Math.random() - 0.5) * 0.2;
      this.alpha = 0.1 + Math.random() * 0.3;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
        this.reset();
        this.x = Math.random() * width;
        this.y = Math.random() * height;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.fillStyle = `rgba(31, 111, 235, ${this.alpha})`;
      ctx.shadowColor = `rgba(31, 111, 235, ${this.alpha})`;
      ctx.shadowBlur = 4;
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
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
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resize);
  resize();
  init();
  animate();
})();


// footer
document.getElementById('ano').textContent = new Date().getFullYear();
