// Sistema de Otimização de UX - Paula Dantas (Carequinha)
const UX_CONFIG = {
  // Configurações de acessibilidade
  enableAccessibility: true,
  enableKeyboardNavigation: true,
  enableScreenReader: true,
  
  // Configurações de responsividade
  enableResponsiveOptimization: true,
  breakpoints: {
    mobile: 768,
    tablet: 1024,
    desktop: 1200
  },
  
  // Configurações de feedback
  enableHapticFeedback: true,
  enableVisualFeedback: true,
  enableAudioFeedback: false,
  
  // Configurações de navegação
  enableSmoothScrolling: true,
  enableStickyHeader: true,
  enableBackToTop: true
};

// Função para implementar acessibilidade
function implementAccessibility() {
  if (!UX_CONFIG.enableAccessibility) return;
  
  // Adiciona atributos ARIA
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    if (!button.getAttribute('aria-label')) {
      button.setAttribute('aria-label', button.textContent.trim());
    }
    button.setAttribute('role', 'button');
    button.setAttribute('tabindex', '0');
  });
  
  // Adiciona landmarks
  const header = document.querySelector('header');
  if (header) {
    header.setAttribute('role', 'banner');
  }
  
  const main = document.querySelector('main') || document.querySelector('.post');
  if (main) {
    main.setAttribute('role', 'main');
  }
  
  const footer = document.querySelector('footer');
  if (footer) {
    footer.setAttribute('role', 'contentinfo');
  }
  
  // Adiciona skip links
  addSkipLinks();
  
  // Adiciona navegação por teclado
  if (UX_CONFIG.enableKeyboardNavigation) {
    implementKeyboardNavigation();
  }
  
  console.log('♿ [Paula] Acessibilidade implementada');
}

// Função para adicionar skip links
function addSkipLinks() {
  const skipLinks = [
    { href: '#main-content', text: 'Pular para o conteúdo principal' },
    { href: '#button-section', text: 'Pular para os botões de doação' },
    { href: 'footer', text: 'Pular para o rodapé' }
  ];
  
  const skipContainer = document.createElement('div');
  skipContainer.className = 'skip-links';
  
  skipLinks.forEach(link => {
    const skipLink = document.createElement('a');
    skipLink.href = link.href;
    skipLink.textContent = link.text;
    skipLink.className = 'skip-link';
    skipContainer.appendChild(skipLink);
  });
  
  document.body.insertBefore(skipContainer, document.body.firstChild);
}

// Função para implementar navegação por teclado
function implementKeyboardNavigation() {
  const focusableElements = document.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      // Navegação por Tab
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
    
    // Navegação por setas
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const currentIndex = Array.from(focusableElements).indexOf(document.activeElement);
      const nextIndex = e.key === 'ArrowDown' 
        ? (currentIndex + 1) % focusableElements.length
        : (currentIndex - 1 + focusableElements.length) % focusableElements.length;
      
      focusableElements[nextIndex].focus();
    }
  });
}

// Função para implementar responsividade
function implementResponsiveOptimization() {
  if (!UX_CONFIG.enableResponsiveOptimization) return;
  
  // Adiciona viewport meta tag se não existir
  if (!document.querySelector('meta[name="viewport"]')) {
    const viewport = document.createElement('meta');
    viewport.name = 'viewport';
    viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    document.head.appendChild(viewport);
  }
  
  // Otimiza layout para diferentes tamanhos de tela
  const optimizeLayout = () => {
    const width = window.innerWidth;
    
    if (width <= UX_CONFIG.breakpoints.mobile) {
      optimizeMobileLayout();
    } else if (width <= UX_CONFIG.breakpoints.tablet) {
      optimizeTabletLayout();
    } else {
      optimizeDesktopLayout();
    }
  };
  
  // Otimizações específicas para mobile
  const optimizeMobileLayout = () => {
    const buttons = document.querySelectorAll('.post-button2');
    buttons.forEach(button => {
      button.style.fontSize = '16px'; // Evita zoom no iOS
      button.style.padding = '12px 20px';
    });
    
    // Adiciona touch feedback
    addTouchFeedback();
  };
  
  // Otimizações específicas para tablet
  const optimizeTabletLayout = () => {
    const buttons = document.querySelectorAll('.post-button2');
    buttons.forEach(button => {
      button.style.fontSize = '18px';
      button.style.padding = '14px 24px';
    });
  };
  
  // Otimizações específicas para desktop
  const optimizeDesktopLayout = () => {
    const buttons = document.querySelectorAll('.post-button2');
    buttons.forEach(button => {
      button.style.fontSize = '16px';
      button.style.padding = '12px 20px';
    });
  };
  
  // Adiciona feedback tátil
  const addTouchFeedback = () => {
    const touchElements = document.querySelectorAll('button, a');
    touchElements.forEach(element => {
      element.addEventListener('touchstart', () => {
        element.style.transform = 'scale(0.95)';
      });
      
      element.addEventListener('touchend', () => {
        element.style.transform = 'scale(1)';
      });
    });
  };
  
  // Executa otimização inicial
  optimizeLayout();
  
  // Executa em mudanças de tamanho
  window.addEventListener('resize', optimizeLayout);
  
  console.log('📱 [Paula] Otimização responsiva implementada');
}

// Função para implementar feedback visual
function implementVisualFeedback() {
  if (!UX_CONFIG.enableVisualFeedback) return;
  
  // Adiciona loading states
  const buttons = document.querySelectorAll('.post-button2, .post-button3');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const originalText = button.textContent;
      button.textContent = 'Carregando...';
      button.disabled = true;
      
      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
      }, 2000);
    });
  });
  
  // Adiciona hover effects
  const interactiveElements = document.querySelectorAll('button, a, .interactive');
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      element.style.transition = 'all 0.3s ease';
      element.style.transform = 'translateY(-2px)';
    });
    
    element.addEventListener('mouseleave', () => {
      element.style.transform = 'translateY(0)';
    });
  });
  
  // Adiciona focus indicators
  const focusableElements = document.querySelectorAll('button, a, input, textarea');
  focusableElements.forEach(element => {
    element.addEventListener('focus', () => {
      element.style.outline = '2px solid #3498db';
      element.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', () => {
      element.style.outline = 'none';
    });
  });
  
  console.log('👁️ [Paula] Feedback visual implementado');
}

// Função para implementar scroll suave
function implementSmoothScrolling() {
  if (!UX_CONFIG.enableSmoothScrolling) return;
  
  // Adiciona scroll suave para links internos
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Adiciona scroll suave para botões de doação
  const donationButtons = document.querySelectorAll('.post-button2');
  donationButtons.forEach(button => {
    button.addEventListener('click', () => {
      const buttonSection = document.getElementById('button-section');
      if (buttonSection) {
        buttonSection.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    });
  });
  
  console.log('🔄 [Paula] Scroll suave implementado');
}

// Função para implementar header fixo
function implementStickyHeader() {
  if (!UX_CONFIG.enableStickyHeader) return;
  
  const header = document.querySelector('header');
  if (!header) return;
  
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
    
    // Hide/show header on scroll
    if (scrollTop > lastScrollTop && scrollTop > 200) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
  });
  
  console.log('📌 [Paula] Header fixo implementado');
}

// Função para implementar botão "voltar ao topo"
function implementBackToTop() {
  if (!UX_CONFIG.enableBackToTop) return;
  
  const backToTopButton = document.createElement('button');
  backToTopButton.className = 'back-to-top';
  backToTopButton.innerHTML = '↑';
  backToTopButton.setAttribute('aria-label', 'Voltar ao topo');
  backToTopButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #3498db;
    color: white;
    border: none;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
  `;
  
  document.body.appendChild(backToTopButton);
  
  // Mostra/esconde botão baseado no scroll
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopButton.style.opacity = '1';
      backToTopButton.style.visibility = 'visible';
    } else {
      backToTopButton.style.opacity = '0';
      backToTopButton.style.visibility = 'hidden';
    }
  });
  
  // Funcionalidade do botão
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  console.log('⬆️ [Paula] Botão "voltar ao topo" implementado');
}

// Função para implementar otimização de carregamento
function implementLoadingOptimization() {
  // Adiciona skeleton loading
  const addSkeletonLoading = () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (!img.complete) {
        img.style.opacity = '0';
        img.addEventListener('load', () => {
          img.style.transition = 'opacity 0.3s ease';
          img.style.opacity = '1';
        });
      }
    });
  };
  
  // Adiciona loading progressivo
  const addProgressiveLoading = () => {
    const contentSections = document.querySelectorAll('.post p, .post img');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    });
    
    contentSections.forEach(section => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(20px)';
      section.style.transition = 'all 0.6s ease';
      observer.observe(section);
    });
  };
  
  addSkeletonLoading();
  addProgressiveLoading();
  
  console.log('⏳ [Paula] Otimização de carregamento implementada');
}

// Função para implementar otimização de formulários
function implementFormOptimization() {
  // Adiciona validação em tempo real
  const inputs = document.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      validateInput(input);
    });
    
    input.addEventListener('input', () => {
      clearInputError(input);
    });
  });
  
  // Função para validar input
  const validateInput = (input) => {
    const value = input.value.trim();
    let isValid = true;
    let message = '';
    
    if (input.type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailRegex.test(value);
      message = isValid ? '' : 'Email inválido';
    }
    
    if (input.required && !value) {
      isValid = false;
      message = 'Campo obrigatório';
    }
    
    if (!isValid) {
      showInputError(input, message);
    }
  };
  
  // Função para mostrar erro
  const showInputError = (input, message) => {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'input-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
      color: #e74c3c;
      font-size: 12px;
      margin-top: 5px;
    `;
    
    input.parentNode.appendChild(errorDiv);
    input.style.borderColor = '#e74c3c';
  };
  
  // Função para limpar erro
  const clearInputError = (input) => {
    const errorDiv = input.parentNode.querySelector('.input-error');
    if (errorDiv) {
      errorDiv.remove();
    }
    input.style.borderColor = '';
  };
  
  console.log('📝 [Paula] Otimização de formulários implementada');
}

// Função para implementar otimização de performance visual
function implementVisualPerformance() {
  // Otimiza animações
  const optimizeAnimations = () => {
    const animatedElements = document.querySelectorAll('.animate, .animated');
    animatedElements.forEach(element => {
      element.style.willChange = 'transform, opacity';
    });
  };
  
  // Otimiza scroll
  const optimizeScroll = () => {
    let ticking = false;
    
    const updateScroll = () => {
      // Atualiza elementos baseados no scroll
      ticking = false;
    };
    
    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', requestTick);
  };
  
  optimizeAnimations();
  optimizeScroll();
  
  console.log('🎨 [Paula] Performance visual otimizada');
}

// Função principal de inicialização
function initUXOptimizations() {
  console.log('🎨 [Paula] Inicializando otimizações de UX...');
  
  // Aplica otimizações
  implementAccessibility();
  implementResponsiveOptimization();
  implementVisualFeedback();
  implementSmoothScrolling();
  implementStickyHeader();
  implementBackToTop();
  implementLoadingOptimization();
  implementFormOptimization();
  implementVisualPerformance();
  
  console.log('✅ [Paula] Otimizações de UX aplicadas!');
}

// Exporta para uso global
window.UX_CONFIG = UX_CONFIG;
window.initUXOptimizations = initUXOptimizations; 