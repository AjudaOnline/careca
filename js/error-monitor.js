// Sistema de Monitoramento de Erros e Conversão - Paula Dantas
const ERROR_MONITOR = {
  errors: [],
  conversions: [],
  failedPix: [],
  
  // Inicializar monitoramento
  init() {
    console.log('🔍 [Monitor] Sistema de monitoramento iniciado');
    this.setupErrorHandling();
    this.setupConversionTracking();
    this.setupCheckoutMonitoring();
  },
  
  // Configurar captura de erros
  setupErrorHandling() {
    window.addEventListener('error', (e) => {
      this.logError('JavaScript Error', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
        colno: e.colno,
        stack: e.error?.stack,
        url: window.location.href,
        timestamp: new Date().toISOString()
      });
    });
    
    window.addEventListener('unhandledrejection', (e) => {
      this.logError('Unhandled Promise Rejection', {
        reason: e.reason,
        url: window.location.href,
        timestamp: new Date().toISOString()
      });
    });
  },
  
  // Configurar rastreamento de conversão
  setupConversionTracking() {
    // Monitorar cliques nos botões de doação
    document.addEventListener('click', (e) => {
      if (e.target.closest('.post-button2') || e.target.closest('.donation-option')) {
        const link = e.target.closest('a');
        const href = link ? link.href : '';
        const amount = this.extractAmountFromLink(href);
        
        this.logConversion('checkout_click', {
          element: e.target.tagName,
          text: e.target.textContent,
          href: href,
          amount: amount,
          url: window.location.href,
          timestamp: new Date().toISOString()
        });
      }
    });
  },
  
  // Extrair valor da URL do checkout
  extractAmountFromLink(href) {
    if (!href) return null;
    
    // Mapeamento de IDs para valores
    const amountMap = {
      '39bd8e84-0c3d-4917-954f-b35801d8d829': 30,
      '273d559b-cc84-48cc-b3bf-1c28d65e0800': 50,
      '84c55d36-465a-4a8f-9bd0-6b3dae3b992b': 70,
      'c6a21475-cc6c-45eb-b0c8-c0a6baffc6b0': 100,
      '6d572550-d3a4-4f7b-b675-b4c62148a567': 150,
      '63e4c031-9c8c-45b9-8462-d1226b662d16': 200,
      '14476537-f15a-480b-acd1-a1b35b931107': 300,
      'e19564b7-4a7e-4555-961b-052b50781762': 500,
      '7vJOGYjDyqgKXda': 700,
      'yOeXZKYEdqgAQap': 1000
    };
    
    // Procurar ID na URL
    for (const [id, amount] of Object.entries(amountMap)) {
      if (href.includes(id)) {
        return amount;
      }
    }
    
    return null;
  },
  
  // Configurar monitoramento de checkout
  setupCheckoutMonitoring() {
    // Monitorar redirecionamentos para checkout
    const originalOpen = window.open;
    window.open = function(url, ...args) {
      if (url && (url.includes('checkout.geterectus.site') || url.includes('pay-pagamentos.link'))) {
        ERROR_MONITOR.logConversion('checkout_redirect', {
          url: url,
          timestamp: new Date().toISOString()
        });
      }
      return originalOpen.call(this, url, ...args);
    };
    
    // Monitorar mudanças de página (se possível)
    window.addEventListener('beforeunload', () => {
      if (document.referrer.includes(window.location.hostname)) {
        ERROR_MONITOR.logConversion('page_exit', {
          referrer: document.referrer,
          timestamp: new Date().toISOString()
        });
      }
    });
  },
  
  // Registrar erro
  logError(type, data) {
    const error = {
      type: type,
      data: data,
      userAgent: navigator.userAgent,
      screenSize: `${screen.width}x${screen.height}`,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`,
      utmParams: this.getUtmParams()
    };
    
    this.errors.push(error);
    console.error('🚨 [Monitor] Erro registrado:', error);
    
    // Enviar para servidor se necessário
    this.sendToServer('error', error);
  },
  
  // Registrar conversão
  logConversion(type, data) {
    const conversion = {
      type: type,
      data: data,
      userAgent: navigator.userAgent,
      utmParams: this.getUtmParams()
    };
    
    this.conversions.push(conversion);
    console.log('✅ [Monitor] Conversão registrada:', conversion);
    
    // Enviar para servidor se necessário
    this.sendToServer('conversion', conversion);
  },
  
  // Registrar checkout falhado
  logFailedCheckout(data) {
    const failedCheckout = {
      ...data,
      userAgent: navigator.userAgent,
      utmParams: this.getUtmParams()
    };
    
    this.failedPix.push(failedCheckout);
    console.warn('⚠️ [Monitor] Checkout falhado registrado:', failedCheckout);
    
    // Enviar para servidor se necessário
    this.sendToServer('failed_checkout', failedCheckout);
  },
  
  // Obter parâmetros UTM
  getUtmParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const utmParams = {};
    
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'src', 'sck'].forEach(param => {
      const value = urlParams.get(param);
      if (value) utmParams[param] = value;
    });
    
    return utmParams;
  },
  
  // Enviar dados para servidor
  sendToServer(type, data) {
    // Implementar envio para servidor se necessário
    // Por enquanto, apenas salva no localStorage
    const key = `paula_monitor_${type}_${Date.now()}`;
    localStorage.setItem(key, JSON.stringify(data));
    
    // Limpar dados antigos (manter apenas últimos 100)
    this.cleanupOldData();
  },
  
  // Limpar dados antigos
  cleanupOldData() {
    const keys = Object.keys(localStorage).filter(key => key.startsWith('paula_monitor_'));
    if (keys.length > 100) {
      keys.sort().slice(0, keys.length - 100).forEach(key => {
        localStorage.removeItem(key);
      });
    }
  },
  
  // Gerar relatório
  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      errors: this.errors.length,
      conversions: this.conversions.length,
      failedPix: this.failedPix.length,
      recentErrors: this.errors.slice(-5),
      recentConversions: this.conversions.slice(-5),
      recentFailedPix: this.failedPix.slice(-5)
    };
    
    console.log('📊 [Monitor] Relatório gerado:', report);
    return report;
  }
};

// Inicializar quando DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => ERROR_MONITOR.init());
} else {
  ERROR_MONITOR.init();
}

// Expor para uso global
window.ERROR_MONITOR = ERROR_MONITOR; 