// Sistema de Otimização de Conversão - Paula Dantas (Carequinha)
const CONVERSION_CONFIG = {
  // Configurações de A/B testing
  enableABTesting: true,
  currentVariant: 'A',
  
  // Configurações de urgência
  enableUrgency: true,
  urgencyMessages: [
    '⏰ Últimas horas para ajudar!',
    '🚨 Paula precisa da sua ajuda hoje!',
    '💔 Cada minuto conta na luta da Paula!'
  ],
  
  // Configurações de social proof
  enableSocialProof: true,
  socialProofData: {
    totalDonations: 117,
    recentDonations: [
      { name: 'Maria S.', amount: 50, time: '2 min atrás' },
      { name: 'João P.', amount: 100, time: '5 min atrás' },
      { name: 'Ana L.', amount: 30, time: '8 min atrás' }
    ]
  },
  
  // Configurações de personalização
  enablePersonalization: true,
  personalizationRules: {
    firstTime: '🎗️ Olá! Que tal fazer sua primeira doação para a Paula Dantas? Sua ajuda pode salvar vidas! 💝',
    returning: '🎗️ Que bom ver você de volta! Paula ainda precisa da sua ajuda! Cada doação faz a diferença! 💝',
    highValue: '🎗️ Você tem um coração especial! Que tal doar um pouco mais para a Paula? 💝'
  }
};

// Função para implementar A/B testing
function implementABTesting() {
  if (!CONVERSION_CONFIG.enableABTesting) return;
  
  const variant = Math.random() < 0.5 ? 'A' : 'B';
  CONVERSION_CONFIG.currentVariant = variant;
  
  if (variant === 'B') {
    // Variante B - Destaque maior para doações
    const buttons = document.querySelectorAll('.post-button2');
    buttons.forEach(button => {
      button.style.fontSize = '1.2em';
      button.style.padding = '15px 25px';
      button.style.backgroundColor = '#e74c3c';
    });
    
    // Adiciona contador de urgência
    addUrgencyCounter();
  }
  
  console.log(`🧪 [Paula] A/B Test - Variante ${variant} aplicada`);
}

// Função para adicionar contador de urgência
function addUrgencyCounter() {
  const urgencyDiv = document.createElement('div');
  urgencyDiv.className = 'urgency-counter';
  urgencyDiv.innerHTML = `
    <div class="urgency-message">
      <span class="urgency-icon">⏰</span>
      <span class="urgency-text">Tempo limitado para ajudar Paula!</span>
    </div>
    <div class="countdown" id="countdown"></div>
  `;
  
  // Insere antes dos botões de doação
  const buttonSection = document.querySelector('#button-section');
  if (buttonSection) {
    buttonSection.insertBefore(urgencyDiv, buttonSection.firstChild);
  }
  
  // Inicia contador
  startCountdown();
}

// Função para iniciar contador regressivo
function startCountdown() {
  const countdownEl = document.getElementById('countdown');
  if (!countdownEl) return;
  
  // Define tempo limite (24 horas)
  const deadline = new Date().getTime() + (24 * 60 * 60 * 1000);
  
  const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = deadline - now;
    
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    countdownEl.innerHTML = `${hours}h ${minutes}m ${seconds}s`;
    
    if (distance < 0) {
      clearInterval(timer);
      countdownEl.innerHTML = "TEMPO ESGOTADO!";
    }
  }, 1000);
}

// Função para implementar social proof
function implementSocialProof() {
  if (!CONVERSION_CONFIG.enableSocialProof) return;
  
  const socialProofDiv = document.createElement('div');
  socialProofDiv.className = 'social-proof';
  socialProofDiv.innerHTML = `
    <div class="social-proof-header">
      <h4>🎗️ ${CONVERSION_CONFIG.socialProofData.totalDonations} pessoas já ajudaram Paula!</h4>
    </div>
    <div class="recent-donations">
      <h5>Doações recentes:</h5>
      <div class="donation-list">
        ${CONVERSION_CONFIG.socialProofData.recentDonations.map(donation => `
          <div class="donation-item">
            <span class="donor-name">${donation.name}</span>
            <span class="donation-amount">R$ ${donation.amount}</span>
            <span class="donation-time">${donation.time}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  
  // Insere após a barra de progresso
  const progressContainer = document.querySelector('.progress-content');
  if (progressContainer) {
    progressContainer.parentNode.insertBefore(socialProofDiv, progressContainer.nextSibling);
  }
}

// Função para implementar personalização
function implementPersonalization() {
  if (!CONVERSION_CONFIG.enablePersonalization) return;
  
  const isReturning = localStorage.getItem('paula_returning_visitor');
  const lastVisit = localStorage.getItem('paula_last_visit');
  const donationHistory = JSON.parse(localStorage.getItem('paula_donation_history') || '[]');
  
  // Mostra mensagem para todos os visitantes (não apenas recorrentes)
  const welcomeMessage = document.createElement('div');
  welcomeMessage.className = 'personalized-welcome';
  
  // Escolhe mensagem baseada no tipo de visitante
  if (isReturning) {
    welcomeMessage.innerHTML = `
      <p>${CONVERSION_CONFIG.personalizationRules.returning}</p>
    `;
  } else {
    welcomeMessage.innerHTML = `
      <p>${CONVERSION_CONFIG.personalizationRules.firstTime}</p>
    `;
    localStorage.setItem('paula_returning_visitor', 'true');
  }
  
  const header = document.querySelector('header');
  if (header) {
    header.appendChild(welcomeMessage);
  }
  
  // Salva data da visita
  localStorage.setItem('paula_last_visit', Date.now());
  
  // Personaliza baseado no histórico de doações
  if (donationHistory.length > 0) {
    const totalDonated = donationHistory.reduce((sum, donation) => sum + donation.amount, 0);
    
    if (totalDonated > 100) {
      // Doador de alto valor
      const highValueMessage = document.createElement('div');
      highValueMessage.className = 'high-value-message';
      highValueMessage.innerHTML = `
        <p>${CONVERSION_CONFIG.personalizationRules.highValue}</p>
      `;
      
      const buttonSection = document.querySelector('#button-section');
      if (buttonSection) {
        buttonSection.insertBefore(highValueMessage, buttonSection.firstChild);
      }
    }
  }
}

// Função para implementar gamificação
function implementGamification() {
  const progressBar = document.querySelector('.progress-bar');
  if (!progressBar) return;
  
  // Adiciona animação de progresso
  const animateProgress = () => {
    const currentWidth = parseFloat(progressBar.style.width) || 0;
    const targetWidth = 14; // 4% do objetivo
    
    let progress = 0;
    const increment = targetWidth / 100;
    
    const animation = setInterval(() => {
      progress += increment;
      progressBar.style.width = `${Math.min(progress, targetWidth)}%`;
      
      if (progress >= targetWidth) {
        clearInterval(animation);
      }
    }, 20);
  };
  
  // Inicia animação quando elemento estiver visível
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateProgress();
        observer.unobserve(entry.target);
      }
    });
  });
  
  observer.observe(progressBar);
}

// Função para implementar micro-interações
function implementMicroInteractions() {
  // Hover effects nos botões
  const buttons = document.querySelectorAll('.post-button2, .post-button3');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'scale(1.05)';
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'scale(1)';
    });
    
    button.addEventListener('click', () => {
      button.style.transform = 'scale(0.95)';
      setTimeout(() => {
        button.style.transform = 'scale(1)';
      }, 150);
    });
  });
  
  // Efeito de confete ao clicar em doação
  const donationButtons = document.querySelectorAll('.post-button2');
  donationButtons.forEach(button => {
    button.addEventListener('click', () => {
      createConfetti(button);
      
      // Rastreia o clique para analytics
      const href = button.closest('a').getAttribute('href');
      const amount = CONVERSION_CONFIG.checkoutLinks.find(item => 
        href.includes(item.id)
      )?.amount;
      
      if (amount) {
        trackDonationClick(amount, button);
      }
    });
  });
}

// Função para criar efeito de confete
function createConfetti(element) {
  const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6'];
  
  for (let i = 0; i < 20; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.animationDelay = Math.random() * 3 + 's';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    element.appendChild(confetti);
    
    setTimeout(() => {
      confetti.remove();
    }, 3000);
  }
}

// Função para implementar otimização de formulários
function optimizeDonationForms() {
  // Adiciona validação em tempo real para qualquer formulário futuro
  const inputs = document.querySelectorAll('input[type="email"], input[type="text"]');
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      validateField(input);
    });
  });
  
  // Adiciona feedback visual para formulários
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      showFormFeedback(form, 'Enviando...', 'success');
    });
  });
}

// Função para validar campos
function validateField(field) {
  const value = field.value.trim();
  let isValid = true;
  let message = '';
  
  if (field.type === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    isValid = emailRegex.test(value);
    message = isValid ? '' : 'Email inválido';
  }
  
  if (field.type === 'text' && field.required) {
    isValid = value.length > 0;
    message = isValid ? '' : 'Campo obrigatório';
  }
  
  // Mostra feedback
  showFieldFeedback(field, message, isValid ? 'success' : 'error');
  
  return isValid;
}

// Função para mostrar feedback de campo
function showFieldFeedback(field, message, type) {
  // Remove feedback anterior
  const existingFeedback = field.parentNode.querySelector('.field-feedback');
  if (existingFeedback) {
    existingFeedback.remove();
  }
  
  if (message) {
    const feedback = document.createElement('div');
    feedback.className = `field-feedback ${type}`;
    feedback.textContent = message;
    field.parentNode.appendChild(feedback);
  }
  
  // Adiciona classe visual
  field.classList.remove('valid', 'invalid');
  field.classList.add(type === 'success' ? 'valid' : 'invalid');
}

// Função para mostrar feedback de formulário
function showFormFeedback(form, message, type) {
  const feedback = document.createElement('div');
  feedback.className = `form-feedback ${type}`;
  feedback.textContent = message;
  
  form.appendChild(feedback);
  
  setTimeout(() => {
    feedback.remove();
  }, 3000);
}

// Função para implementar otimização de CTA
function optimizeCTAs() {
  // Adiciona FOMO (Fear of Missing Out)
  const ctaButtons = document.querySelectorAll('.post-button2, .post-button3');
  ctaButtons.forEach(button => {
    const originalText = button.textContent;
    const isR50 = button.getAttribute('data-amount') === '50';
    
    // Alterna texto para criar urgência
    setInterval(() => {
      if (Math.random() < 0.3) { // 30% de chance
        if (isR50) {
          button.textContent = '🎯 VALE O DOBRO!';
        } else {
          button.textContent = '⏰ DOAR AGORA!';
        }
        setTimeout(() => {
          button.textContent = originalText;
        }, 2000);
      }
    }, 10000); // A cada 10 segundos
  });
  
  // Destaque especial para R$ 50
  const r50Button = document.querySelector('.post-button2[data-amount="50"]');
  if (r50Button) {
    // Adiciona efeito de pulso
    setInterval(() => {
      r50Button.style.animation = 'pulse 1s';
      setTimeout(() => {
        r50Button.style.animation = '';
      }, 1000);
    }, 5000); // A cada 5 segundos
  }
}

// Função principal de inicialização
function initConversionOptimizations() {
  console.log('🎯 [Paula] Inicializando otimizações de conversão...');
  
  // Aplica otimizações
  implementABTesting();
  implementSocialProof();
  implementPersonalization();
  implementGamification();
  implementMicroInteractions();
  optimizeDonationForms();
  optimizeCTAs();
  
  console.log('✅ [Paula] Otimizações de conversão aplicadas!');
}

// Exporta para uso global
window.CONVERSION_CONFIG = CONVERSION_CONFIG;
window.initConversionOptimizations = initConversionOptimizations; 