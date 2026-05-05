document.documentElement.classList.add('js');

const sharedHeader = `
<header class="site-header"><div class="container nav-wrapper"><a class="brand" href="index.html" aria-label="Accueil Carré Concept"><img src="assets/logo-carre-concept.svg" alt="Logo Carré Concept" class="brand-logo" /><span>Carré Concept</span></a><button class="nav-toggle" aria-expanded="false" aria-controls="site-nav" aria-label="Ouvrir le menu">☰</button><nav id="site-nav" class="site-nav"><a href="index.html">Accueil</a><a href="a-propos.html">À propos</a><a href="services.html">Services</a><a href="realisations.html">Réalisations</a><a href="nous-rejoindre.html">Nous rejoindre</a><a href="contact.html">Contact</a><a href="mentions-legales.html">Mentions légales</a></nav></div></header>`;
const sharedFooter = `<footer class="site-footer"><div class="container footer-grid"><div><h3>Carré Concept</h3><p>Installation fibre optique, déploiement réseau et maintenance.</p><p>6 Allée Germinal, 26320 Saint-Marcel-lès-Valence</p></div><div><h4>Navigation</h4><ul><li><a href="index.html">Accueil</a></li><li><a href="a-propos.html">À propos</a></li><li><a href="services.html">Services</a></li><li><a href="realisations.html">Réalisations</a></li><li><a href="nous-rejoindre.html">Nous rejoindre</a></li><li><a href="contact.html">Contact</a></li><li><a href="mentions-legales.html">Mentions légales</a></li></ul></div></div></footer>`;

document.querySelectorAll('[data-include="header"]').forEach(el=>el.outerHTML=sharedHeader);
document.querySelectorAll('[data-include="footer"]').forEach(el=>el.outerHTML=sharedFooter);

const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
if(toggle && nav){toggle.addEventListener('click',()=>{nav.classList.toggle('open');toggle.setAttribute('aria-expanded', String(nav.classList.contains('open')));});}

const path = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.site-nav a').forEach(a=>{if(a.getAttribute('href')===path){a.classList.add('active')}});

const io = new IntersectionObserver((entries)=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

const canvas = document.getElementById('network-canvas');
if(canvas){
  const ctx = canvas.getContext('2d'); let w,h,pts=[];
  const resize=()=>{w=canvas.width=canvas.offsetWidth;h=canvas.height=canvas.offsetHeight;pts=Array.from({length:60},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35}));};
  resize(); addEventListener('resize',resize);
  const draw=()=>{ctx.clearRect(0,0,w,h);for(const p of pts){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1;ctx.fillStyle='rgba(99,102,241,.8)';ctx.fillRect(p.x,p.y,2,2);}for(let i=0;i<pts.length;i++){for(let j=i+1;j<pts.length;j++){const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.hypot(dx,dy);if(d<120){ctx.strokeStyle=`rgba(245,158,11,${1-d/120})`;ctx.lineWidth=.4;ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.stroke();}}}requestAnimationFrame(draw)};draw();
}
