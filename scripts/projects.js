function scrollProjects(direction) {
  const container = document.getElementById("projectsContainer");
  container.scrollBy({
    left: direction * 800,
    behavior: "smooth"
  });
}

gsap.from(".project-card", {
  opacity: 0,
  y: 100,
  stagger: 0.2,
  duration: 1,
  ease: "back.out(1.7)",
  scrollTrigger: {
    trigger: "#projects",
    start: "top 70%"
  }
});

// Parallax background
gsap.to("#space", {
  y: 100,
  scrollTrigger: {
    scrub: true
  }
});

// Cursor hover effect
document.querySelectorAll("a, button, .project-card").forEach(el => {
  el.addEventListener("mouseenter", () => {
    if (!cursor) return;
    cursor.style.transform = "scale(2)";
  });

  el.addEventListener("mouseleave", () => {
    if (!cursor) return;
    cursor.style.transform = "scale(1)";
  });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    gsap.to(window, {
      duration: 1,
      scrollTo: this.getAttribute("href"),
      ease: "power2.out"
    });
  });
});


// 3D Cards
document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(card, {
      rotateX: -(y / rect.height - 0.5) * 10,
      rotateY: (x / rect.width - 0.5) * 10,
      duration: 0.3
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5
    });
  });
});