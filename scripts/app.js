
window.addEventListener("DOMContentLoaded", () => {
  updateColors(); // يحدث ألوان النقاط مباشرة على الوضع الافتراضي الفاتح
});

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

// ================================= Colors per Mode  ===================================

let particleColor = "#22d3ee";
let lineColor = "rgba(34,211,238,0.08)";
let mouseLineColor = "rgba(167,139,250,0.3)";


function updateColors() {
  if (document.body.classList.contains("dark-mode")) {
    
    // 🌙  = اللايت
    particleColor = "#2e2e99"; 
    lineColor = "rgba(86, 163, 194, 0.21)"; 
    mouseLineColor = "rgba(245, 12, 12, 0.3)"; 


  } else {
    // ☀️  = الدارك
    particleColor = "#22d3ee";
    lineColor = "rgba(77, 187, 255, 0.08)";
    mouseLineColor = "rgba(77, 228, 255, 0.3)";
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
    ctx.fillStyle = particleColor; 
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
        ctx.strokeStyle = lineColor; 
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
        ctx.strokeStyle = mouseLineColor; 
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
animate()

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
      document.body.classList.contains("dark-mode") ? "🌙" : "☀️";
    updateColors(); 
  });
}

// ================================ Typing Text ======================================

const heroText1 = "Hello, I'm ";
const heroText2 = "TAIF";

let hi = 0;
let hj = 0;
let heroDeleting = false;

const heroTextEl = document.querySelector(".text");
const heroNameEl = document.querySelector(".name");

function heroTyping() {

  if (!heroDeleting) {

    if (hi < heroText1.length) {
      heroTextEl.textContent += heroText1[hi];
      hi++;
      return setTimeout(heroTyping, 40);
    }

    if (hj < heroText2.length) {
      heroNameEl.textContent += heroText2[hj];
      hj++;
      return setTimeout(heroTyping, 70);
    }

    heroDeleting = true;
    return setTimeout(heroTyping, 1500);

  } else {

    if (hj > 0) {
      heroNameEl.textContent = heroText2.substring(0, hj - 1);
      hj--;
      return setTimeout(heroTyping, 40);
    }

    if (hi > 0) {
      heroTextEl.textContent = heroText1.substring(0, hi - 1);
      hi--;
      return setTimeout(heroTyping, 25);
    }
    heroDeleting = false;
    return setTimeout(heroTyping, 400);
  }
}

heroTyping();

// ================================ Typing Name ======================================

const aboutText = "I'm Taif Alanzi";

let ai = 0;
let aboutDeleting = false;

const aboutEl = document.querySelector("#about .text");

function aboutTyping() {

  if (!aboutDeleting) {

    if (ai < aboutText.length) {
      aboutEl.textContent += aboutText.charAt(ai);
      ai++;
      return setTimeout(aboutTyping, 50);
    }

    aboutDeleting = true;
    return setTimeout(aboutTyping, 1500);

  } else {

    if (ai > 0) {
      aboutEl.textContent = aboutText.substring(0, ai - 1);
      ai--;
      return setTimeout(aboutTyping, 30);
    }
    aboutDeleting = false;
    return setTimeout(aboutTyping, 500);
  }
}

aboutTyping();


// ================================ MENU Animations ======================================




const links = document.querySelectorAll(".nav-link");
const indicator = document.querySelector(".nav-indicator");

// تحريك الخط
function moveIndicator(el) {
  indicator.style.width = el.offsetWidth + "px";
  indicator.style.left = el.offsetLeft + "px";
}

// أول تحميل
moveIndicator(document.querySelector(".nav-link.active"));

// عند الضغط
links.forEach(link => {
  link.addEventListener("click", () => {
    links.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
    moveIndicator(link);
  });
});

// ====================================== SCROLL SPY ======================================

const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  links.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
      moveIndicator(link);
    }
  });
});

// ===================================== MOBILE =====================================


const toggle = document.getElementById("menu-toggle");
const menu = document.getElementById("nav-menu");

toggle.addEventListener("click", () => {
  menu.classList.toggle("active");
});


// ===================================================================================









