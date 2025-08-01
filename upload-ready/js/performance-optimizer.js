// Sistema de Otimização de Performance - Paula Dantas (Carequinha)
const PERFORMANCE_CONFIG = {
  // Configurações de carregamento
  lazyLoading: true,
  preloadCritical: true,
  optimizeImages: true,
  
  // Configurações de cache
  enableCache: true,
  cacheDuration: 24 * 60 * 60 * 1000, // 24 horas
  
  // Configurações de analytics
  enablePerformanceTracking: true,
  trackUserEngagement: true
};

// Função para otimizar carregamento de imagens
function optimizeImages() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// Função para pré-carregar recursos críticos
function preloadCriticalResources() {
  const criticalResources = [
    'css/styles.css',
    'js/paula-config.js',
    'images/ajudelogo.png'
  ];
  
  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource;
    link.as = resource.includes('.css') ? 'style' : resource.includes('.js') ? 'script' : 'image';
    document.head.appendChild(link);
  });
}

// Função para otimizar CSS crítico
function optimizeCriticalCSS() {
  const criticalCSS = `
    .post-button2, .post-button3 {
      transition: all 0.3s ease;
      transform: translateY(0);
    }
    .post-button2:hover, .post-button3:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    .progress-bar {
      transition: width 0.8s ease-in-out;
    }
    .modal {
      backdrop-filter: blur(5px);
    }
  `;
  
  const style = document.createElement('style');
  style.textContent = criticalCSS;
  document.head.appendChild(style);
}

// Função para rastrear performance
function trackPerformance() {
  if (!PERFORMANCE_CONFIG.enablePerformanceTracking) return;
  
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType('navigation')[0];
      const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
      
      console.log(`📊 [Paula] Performance - Tempo de carregamento: ${loadTime}ms`);
      
      // Envia dados de performance para analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', 'performance', {
          'event_category': 'paula_dantas',
          'event_label': 'page_load_time',
          'value': Math.round(loadTime)
        });
      }
    }, 0);
  });
}

// Função para otimizar scroll
function optimizeScroll() {
  let ticking = false;
  
  function updateScroll() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.parallax');
    
    if (parallax) {
      parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    ticking = false;
  }
  
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateScroll);
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', requestTick);
}

// Função para otimizar animações
function optimizeAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  });
  
  animatedElements.forEach(el => animationObserver.observe(el));
}

// Função para otimizar formulários
function optimizeForms() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
      }
    });
  });
}

// Função para otimizar links
function optimizeLinks() {
  const links = document.querySelectorAll('a[href^="http"]');
  
  links.forEach(link => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });
}

// Função para implementar cache local
function implementLocalCache() {
  if (!PERFORMANCE_CONFIG.enableCache) return;
  
  // Cache de dados da Paula
  const paulaData = {
    name: 'Paula Dantas',
    nickname: 'Carequinha',
    campaign: 'ajude-paula-dantas',
    lastUpdated: Date.now()
  };
  
  localStorage.setItem('paula_data', JSON.stringify(paulaData));
}

// Função para otimizar SEO
function optimizeSEO() {
  // Adiciona meta tags dinâmicas
  const metaTags = [
    { name: 'description', content: 'Ajude Paula Dantas (Carequinha) em sua luta contra o câncer de mama. Sua doação faz a diferença!' },
    { name: 'keywords', content: 'Paula Dantas, Carequinha, doação, câncer de mama, ajuda, tratamento' },
    { property: 'og:title', content: 'Ajude Paula Dantas (Carequinha) - Doação para Tratamento' },
    { property: 'og:description', content: 'Paula Dantas precisa da sua ajuda para continuar o tratamento contra o câncer de mama.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: 'images/paula1.jpg' }
  ];
  
  metaTags.forEach(tag => {
    const meta = document.createElement('meta');
    Object.keys(tag).forEach(key => {
      meta.setAttribute(key, tag[key]);
    });
    document.head.appendChild(meta);
  });
}

// Função para otimizar acessibilidade
function optimizeAccessibility() {
  // Adiciona atributos ARIA
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    if (!button.getAttribute('aria-label')) {
      button.setAttribute('aria-label', button.textContent.trim());
    }
  });
  
  // Adiciona skip links
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.textContent = 'Pular para o conteúdo principal';
  skipLink.className = 'skip-link';
  document.body.insertBefore(skipLink, document.body.firstChild);
}

// Função para implementar PWA features
function implementPWAFeatures() {
  // Adiciona manifest
  const manifest = {
    name: 'Ajude Paula Dantas',
    short_name: 'Paula Dantas',
    description: 'Campanha de doação para Paula Dantas (Carequinha)',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2ecc71',
    icons: [
      {
        src: 'images/favi.webp',
        sizes: '192x192',
        type: 'image/webp'
      }
    ]
  };
  
  const manifestLink = document.createElement('link');
  manifestLink.rel = 'manifest';
  manifestLink.href = 'data:application/json,' + encodeURIComponent(JSON.stringify(manifest));
  document.head.appendChild(manifestLink);
}

// Função principal de inicialização
function initPerformanceOptimizations() {
  console.log('🚀 [Paula] Inicializando otimizações de performance...');
  
  // Aplica otimizações
  optimizeCriticalCSS();
  preloadCriticalResources();
  optimizeImages();
  optimizeScroll();
  optimizeAnimations();
  optimizeForms();
  optimizeLinks();
  implementLocalCache();
  optimizeSEO();
  optimizeAccessibility();
  implementPWAFeatures();
  
  // Rastreia performance
  trackPerformance();
  
  console.log('✅ [Paula] Otimizações de performance aplicadas!');
}

// Exporta para uso global
window.PERFORMANCE_CONFIG = PERFORMANCE_CONFIG;
window.initPerformanceOptimizations = initPerformanceOptimizations; 