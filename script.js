// Blob subtle parallax / mouse follow
(function(){
  const blob = document.getElementById('blob');
  let bounds = blob.getBoundingClientRect();
  function updateBounds(){ bounds = blob.getBoundingClientRect(); }
  window.addEventListener('resize', updateBounds);

  // Move blob slightly based on mouse position in hero area
  const hero = document.querySelector('.hero-inner');
  hero.addEventListener('mousemove', (e) => {
    const r = hero.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width; // 0..1
    const y = (e.clientY - r.top) / r.height; // 0..1

    // Translate blob center slightly
    const tx = (x - 0.5) * 40; // -20..20
    const ty = (y - 0.5) * 30;
    blob.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(1.02)`;
  });

  hero.addEventListener('mouseleave', () => {
    blob.style.transform = 'translate3d(0,0,0) scale(1)';
  });

  // Add subtle animation loop for breathing effect
  let t = 0;
  function animate(){
    t += 0.01;
    const sx = 1 + Math.sin(t) * 0.007;
    const sy = 1 + Math.cos(t*0.9) * 0.008;
    blob.style.opacity = 0.98 + Math.sin(t*0.7)*0.02;
    blob.style.borderRadius = `${50 + Math.sin(t*0.6)*4}%`;
    blob.style.transform += ` scale(${(sx+sy)/2})`;
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
})();

// CTA ripple effect for nicer touch feedback
document.querySelectorAll('.cta').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height) * 1.2;
    const x = e.clientX - rect.left - size/2;
    const y = e.clientY - rect.top - size/2;
    ripple.style.position = 'absolute';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.background = 'rgba(255,255,255,0.35)';
    ripple.style.borderRadius = '50%';
    ripple.style.transform = 'scale(0)';
    ripple.style.transition = 'transform .6s ease, opacity .6s ease';
    ripple.style.pointerEvents = 'none';
    btn.appendChild(ripple);
    requestAnimationFrame(()=> ripple.style.transform = 'scale(1)');
    setTimeout(()=> { ripple.style.opacity = '0'; }, 350);
    setTimeout(()=> { ripple.remove(); }, 900);
  });
});
