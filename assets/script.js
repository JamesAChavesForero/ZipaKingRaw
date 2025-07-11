  // 1. Automatically split text into spans
  document.querySelectorAll('.animated-title').forEach(title => {
    const text = title.innerText;
    title.innerHTML = '';
    [...text].forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.display = 'inline-block';
      span.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
      span.style.transitionDelay = `${index * 50}ms`;
      span.style.transform = 'translateY(50px)';
      span.style.opacity = '100';
      title.appendChild(span);
    });
  });

  // 2. Track scroll direction
  let lastScrollY = '160px';

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const direction = window.scrollY > lastScrollY ? 'down' : 'up';
      lastScrollY = window.scrollY;

      const spans = entry.target.querySelectorAll('span');

      if (entry.isIntersecting && direction === 'down') {
        // Scroll down: animate in
        spans.forEach(span => {
          span.style.transform = 'translateY(0)';
          span.style.opacity = '1';
        });
      } else if (direction === 'up') {
        // Scroll up: reverse animation
        spans.forEach(span => {
          span.style.transform = 'translateY(-70px)';
          span.style.opacity = '0.1';
        });
      }
    });
  }, {
    threshold: 0.5,
  });

  // 3. Observe each title
  document.querySelectorAll('.animated-title').forEach(el => {
    observer.observe(el);
  });