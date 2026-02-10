document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  initMobileNav();
  initHeroCanvas();
  initScrollReveal();
  initQuoteWizard();
  initPortalPreview();

  if (!prefersReducedMotion && hasFinePointer) {
    initServiceTilt();
    initMagneticButtons();
  }
});

function initMobileNav() {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  if (!burger || !nav) return;

  const closeNav = () => {
    nav.classList.remove("nav-open");
    burger.classList.remove("is-active");
    burger.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  };

  burger.addEventListener("click", () => {
    const next = !nav.classList.contains("nav-open");
    nav.classList.toggle("nav-open", next);
    burger.classList.toggle("is-active", next);
    burger.setAttribute("aria-expanded", String(next));
    document.body.classList.toggle("menu-open", next);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 1180) closeNav();
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeNav();
  });

  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !burger.contains(e.target)) closeNav();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1180) closeNav();
  });
}

function initHeroCanvas() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width = 0;
  let height = 0;
  let rafId = 0;
  const particles = [];
  const particleCount = 70;
  const connectionDistance = 140;
  const mouseDistance = 180;
  const mouse = { x: null, y: null };

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 1.2;
      this.vy = (Math.random() - 0.5) * 1.2;
      this.size = Math.random() * 1.8 + 0.6;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      if (mouse.x == null || mouse.y == null) return;
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.hypot(dx, dy);
      if (distance > 0 && distance < mouseDistance) {
        const force = (mouseDistance - distance) / mouseDistance;
        this.vx -= (dx / distance) * force * 0.04;
        this.vy -= (dy / distance) * force * 0.04;
      }
    }

    // Draw methods
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(Math.PI / 4); // Rotate 45 degrees (Diamond)

      ctx.fillStyle = "#0F172A"; // Using original color

      // Draw Diamond (Square rotated 45deg)
      // Adjust size slightly since squares look bigger than circles
      const size = this.size * 0.8;
      ctx.fillRect(-size / 2, -size / 2, size, size);

      ctx.restore();
    }
  }

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function init() {
    particles.length = 0;
    for (let i = 0; i < particleCount; i += 1) particles.push(new Particle());
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i += 1) {
      for (let j = i + 1; j < particles.length; j += 1) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.hypot(dx, dy);
        if (distance < connectionDistance) {
          const alpha = 1 - distance / connectionDistance;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(212, 175, 55, ${alpha * 0.55})`;
          ctx.lineWidth = 0.7;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    drawConnections();
    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });
    rafId = window.requestAnimationFrame(animate);
  }

  window.addEventListener("resize", resize);
  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener("mouseout", () => {
    mouse.x = null;
    mouse.y = null;
  });
  window.addEventListener("beforeunload", () => window.cancelAnimationFrame(rafId));

  resize();
  init();
  animate();
}

function initScrollReveal() {
  const items = Array.from(document.querySelectorAll(".scroll-reveal"));
  if (!items.length) return;

  const reveal = () => {
    const threshold = window.innerHeight * 0.88;
    items.forEach((item) => {
      if (item.getBoundingClientRect().top < threshold) {
        item.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", reveal, { passive: true });
  reveal();
}

function initServiceTilt() {
  const cards = document.querySelectorAll(".service-card");
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rx = ((y / rect.height) - 0.5) * -8;
      const ry = ((x / rect.width) - 0.5) * 8;
      card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

function initMagneticButtons() {
  const buttons = document.querySelectorAll(".btn-gold, .btn-primary, .btn-secondary");
  buttons.forEach((button) => {
    button.addEventListener("mousemove", (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      button.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
    });
    button.addEventListener("mouseleave", () => {
      button.style.transform = "";
    });
  });
}

function initQuoteWizard() {
  const wizard = document.getElementById("quote-wizard");
  if (!wizard) return;

  const steps = Array.from(wizard.querySelectorAll(".wizard-step"));
  const pills = Array.from(document.querySelectorAll("[data-step-pill]"));
  const prevBtn = wizard.querySelector(".wizard-prev");
  const nextBtn = wizard.querySelector(".wizard-next");
  const submitBtn = wizard.querySelector(".wizard-submit");
  const insuranceType = document.getElementById("insurance-type");
  let currentStep = 1;

  const update = () => {
    steps.forEach((step) => {
      const number = Number(step.dataset.step);
      step.classList.toggle("is-active", number === currentStep);
    });
    pills.forEach((pill) => {
      const number = Number(pill.dataset.stepPill);
      pill.classList.toggle("is-active", number === currentStep);
    });
    if (prevBtn) prevBtn.hidden = currentStep === 1;
    if (nextBtn) nextBtn.hidden = currentStep === steps.length;
    if (submitBtn) submitBtn.hidden = currentStep !== steps.length;
  };

  const toggleTypeFields = () => {
    if (!insuranceType) return;
    const business = document.querySelectorAll(".business-only");
    const personal = document.querySelectorAll(".personal-only");
    const showBusiness = insuranceType.value === "business";
    business.forEach((el) => el.classList.toggle("is-hidden", !showBusiness));
    personal.forEach((el) => el.classList.toggle("is-hidden", showBusiness));
  };

  nextBtn?.addEventListener("click", () => {
    if (currentStep < steps.length) currentStep += 1;
    update();
  });

  prevBtn?.addEventListener("click", () => {
    if (currentStep > 1) currentStep -= 1;
    update();
  });

  insuranceType?.addEventListener("change", toggleTypeFields);
  toggleTypeFields();

  wizard.addEventListener("submit", (e) => {
    e.preventDefault();
    const success = document.getElementById("quote-success");
    if (!success) return;
    wizard.classList.add("is-hidden");
    success.classList.remove("is-hidden");
  });

  update();
}

function initPortalPreview() {
  const button = document.getElementById("portal-preview-btn");
  const dashboard = document.getElementById("portal-dashboard");
  if (!button || !dashboard) return;

  button.addEventListener("click", () => {
    dashboard.classList.remove("is-hidden");
    button.textContent = "Dashboard Open";
    button.disabled = true;
  });
}
