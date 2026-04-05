document.body.classList.add("dark-mode");

// ======================================= Typing =======================================

const text = "Hello I am TAIF";
let i = 0;

function typing() {
  const el = document.querySelector(".typing");

  if (i === 0) el.innerHTML = "";

  if (i < text.length) {
    el.innerHTML += text[i];
    i++;
    setTimeout(typing, 40);
  }
}
typing();


// ======================================= Scroll =======================================

// التمرير
function scrollToProjects() {
  document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
}


// ======================================= Reveal =======================================

// الكشف عن المشاريع
function reveal() {
  document.querySelectorAll(".reveal").forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal); 


// ======================================= Cursor =======================================

//  المؤشر الاحترافي
const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", e => {
  if (cursor) {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  }
});


// =================================== Magnetic Button ===================================

const btn = document.querySelector(".magnetic");

if (btn) {
  btn.addEventListener("mousemove", e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width/2;
    const y = e.clientY - rect.top - rect.height/2;
    btn.style.transform = `translate(${x*0.2}px, ${y*0.2}px)`;
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0,0)";
  });
}


// =================================== AI BACKGROUND ====================================

const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// =============================== Colors per Mode (مهم يكون هنا فوق) ===============================
let particleColor = "#22d3ee";
let lineColor = "rgba(34,211,238,0.08)";
let mouseLineColor = "rgba(167,139,250,0.3)";


function updateColors() {
  if (document.body.classList.contains("dark-mode")) {
    
    // 🌙 DARK = اللايت
    // particleColor = "#22d3ee";
    particleColor = "#ff4d9d";

    lineColor = "rgba(238, 34, 238, 0.1)";
    mouseLineColor = "rgba(139, 250, 191, 0.83)";


  } else {
    // ☀️ LIGHT = الدارك
    particleColor = "#22d3ee";
    lineColor = "rgba(255,77,157,0.08)";
    mouseLineColor = "rgba(255,77,157,0.3)";
  }
}
updateColors();


// ================================= Create Points =====================================

let particles = [];
const mouse = { x: null, y: null };

for (let i = 0; i < 120; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6
  });
}


// =============================== Drawing Particles ===================================

function drawParticles() {
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = particleColor; // ✅ الآن شغال
    ctx.fill();
  });
}


// ======================================== Link ========================================

function connect() {
  for (let a = 0; a < particles.length; a++) {
    for (let b = a; b < particles.length; b++) {

      let dx = particles[a].x - particles[b].x;
      let dy = particles[a].y - particles[b].y;
      let dist = dx * dx + dy * dy;

      if (dist < 10000) {
        ctx.strokeStyle = lineColor; // ✅ تم التعديل
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }

      // Active with Cursor
      let dxMouse = particles[a].x - mouse.x;
      let dyMouse = particles[a].y - mouse.y;
      let distMouse = dxMouse * dxMouse + dyMouse * dyMouse;

      if (distMouse < 15000) {
        ctx.strokeStyle = mouseLineColor; // ✅ تم التعديل
        ctx.beginPath();
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    }
  }
}


// ===================================== Update =====================================

function update() {
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
  });
}


// ==================================== Operation ====================================

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawParticles();
  connect();
  update();
  requestAnimationFrame(animate);
}

animate();


// ===================================== Resize =====================================

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});


// ================================= Dark Mode Toggle =================================
const toggleBtn = document.getElementById("mode-toggle");

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    toggleBtn.textContent =
      document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
    updateColors(); // 🔥 أهم سطر
  });
}