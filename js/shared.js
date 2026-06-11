// shared.js — used by both product.html and ml.html

function initPage(accentColor, accentBg, warmColor = '#8C1D40') {

  // ── CURSOR ──────────────────────────────────────────────────────
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursor-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  (function animRing() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  })();

  document.querySelectorAll('a, .card, .pill, .contact-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(2)';
      ring.style.width  = '56px';
      ring.style.height = '56px';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      ring.style.width  = '34px';
      ring.style.height = '34px';
    });
  });

  // ── BACKGROUND CANVAS ──────────────────────────────────────────
  const canvas = document.getElementById('bg-canvas');
  const ctx    = canvas.getContext('2d');
  let W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Parse accent color to get RGB
  const ac = accentColor; // e.g. '#FFC627'
  const hr = parseInt(ac.slice(1,3),16);
  const hg = parseInt(ac.slice(3,5),16);
  const hb = parseInt(ac.slice(5,7),16);
  const wc = warmColor;
  const wr = parseInt(wc.slice(1,3),16);
  const wg = parseInt(wc.slice(3,5),16);
  const wb = parseInt(wc.slice(5,7),16);

  class Particle {
    reset() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.z  = Math.random() * 1200 + 300;
      this.vz = -(Math.random() * 0.4 + 0.2);
      this.warm = Math.random() > 0.65;
    }
    constructor() { this.reset(); }
    update() { this.z += this.vz; if (this.z < 1) this.reset(); }
    draw() {
      const sc = 600 / this.z;
      const px = (this.x - W/2)*sc + W/2;
      const py = (this.y - H/2)*sc + H/2;
      const a  = Math.min(1,(1200-this.z)/900) * 0.6;
      const s  = Math.max(0.2, 1.2*sc);
      ctx.beginPath();
      ctx.arc(px, py, s, 0, Math.PI*2);
      if (this.warm) {
        ctx.fillStyle = `rgba(${wr},${wg},${wb},${a*0.5})`;
      } else {
        ctx.fillStyle = `rgba(${hr},${hg},${hb},${a})`;
      }
      ctx.fill();
    }
  }

  const particles = Array.from({length:160}, () => new Particle());

  let mouseX = W/2, mouseY = H/2;
  document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

  const scrollOrb = { x: 0.8, y: 0.2, r: 300 };
  let t = 0;

  function drawBg() {
    ctx.clearRect(0,0,W,H);

    // Subtle grid
    ctx.strokeStyle = `rgba(${hr},${hg},${hb},0.025)`;
    ctx.lineWidth = 1;
    for (let i=0; i<=14; i++) { const x=(W/14)*i; ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
    for (let i=0; i<=9; i++)  { const y=(H/9)*i;  ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }

    // Parallax blob
    const ox = (mouseX/W - 0.5) * 40;
    const oy = (mouseY/H - 0.5) * 40;
    const bx = scrollOrb.x*W + ox + Math.sin(t*0.4)*30;
    const by = scrollOrb.y*H + oy + Math.cos(t*0.3)*20;
    const g  = ctx.createRadialGradient(bx,by,0, bx,by,scrollOrb.r);
    g.addColorStop(0, `rgba(${hr},${hg},${hb},0.1)`);
    g.addColorStop(1, `rgba(${hr},${hg},${hb},0)`);
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(bx,by,scrollOrb.r,0,Math.PI*2); ctx.fill();

    // Second softer blob
    const bx2 = 0.15*W - ox*0.5 + Math.cos(t*0.35)*25;
    const by2 = 0.75*H - oy*0.5 + Math.sin(t*0.45)*18;
    const g2  = ctx.createRadialGradient(bx2,by2,0,bx2,by2,200);
    g2.addColorStop(0,`rgba(${wr},${wg},${wb},0.08)`);
    g2.addColorStop(1,`rgba(${wr},${wg},${wb},0)`);
    ctx.fillStyle = g2;
    ctx.beginPath(); ctx.arc(bx2,by2,200,0,Math.PI*2); ctx.fill();

    particles.forEach(p => { p.update(); p.draw(); });
    t += 0.008;
    requestAnimationFrame(drawBg);
  }
  drawBg();

  // ── SCROLL OBSERVER ────────────────────────────────────────────
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.observe').forEach(el => observer.observe(el));

  // ── NAV DOTS ───────────────────────────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const dots     = document.querySelectorAll('.nav-dot');
  const topLinks = document.querySelectorAll('.top-nav-link[data-section]');
  const topNav = document.querySelector('.top-nav');
  const navToggle = document.querySelector('.nav-toggle');

  if (topNav && navToggle) {
    navToggle.addEventListener('click', () => {
      const isOpen = topNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    });

    topNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        topNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open navigation menu');
      });
    });
  }

  const navObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        dots.forEach(d => d.classList.remove('active'));
        const active = document.querySelector(`.nav-dot[data-section="${id}"]`);
        if (active) active.classList.add('active');
        topLinks.forEach(link => {
          link.classList.toggle('active', link.dataset.section === id);
        });
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(s => navObs.observe(s));

  // Click nav dots to scroll
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const id = dot.dataset.section;
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  });
}
