// Script de Diagnóstico - Paula Dantas
const DIAGNOSTIC = {
  // Executar diagnóstico completo
  async runFullDiagnostic() {
    console.log('🔍 [Diagnóstico] Iniciando verificação completa...');
    
    const results = {
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      screenSize: `${screen.width}x${screen.height}`,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`,
      tests: {}
    };
    
    // Teste 1: Verificar scripts carregados
    results.tests.scripts = this.checkScripts();
    
    // Teste 2: Verificar elementos da página
    results.tests.elements = this.checkElements();
    
    // Teste 3: Verificar parâmetros UTM
    results.tests.utm = this.checkUtmParams();
    
    // Teste 4: Verificar configurações do Facebook
    results.tests.facebook = this.checkFacebookConfig();
    
    // Teste 5: Verificar APIs
    results.tests.apis = await this.checkAPIs();
    
    // Teste 6: Verificar localStorage
    results.tests.localStorage = this.checkLocalStorage();
    
    // Teste 7: Verificar performance
    results.tests.performance = this.checkPerformance();
    
    console.log('📊 [Diagnóstico] Resultados:', results);
    
    // Salvar resultados
    localStorage.setItem('paula_diagnostic_results', JSON.stringify(results));
    
    return results;
  },
  
  // Verificar scripts carregados
  checkScripts() {
    const requiredScripts = [
      'js/paula-config.js',
      'js/error-monitor.js',
      'js/diagnostic.js',
      'utm-script.js'
    ];
    
    const results = {};
    
    requiredScripts.forEach(script => {
      const scriptElement = document.querySelector(`script[src*="${script}"]`);
      results[script] = {
        loaded: !!scriptElement,
        element: scriptElement ? scriptElement.src : null
      };
    });
    
    // Verificar variáveis globais
    results.globalVars = {
      PAULA_CONFIG: typeof window.PAULA_CONFIG !== 'undefined',
      ERROR_MONITOR: typeof window.ERROR_MONITOR !== 'undefined',
      UTMHelper: typeof window.UTMHelper !== 'undefined',
      fbq: typeof window.fbq !== 'undefined'
    };
    
    return results;
  },
  
  // Verificar elementos da página
  checkElements() {
    const requiredElements = [
      '.post-button2',
      '.donation-option'
    ];
    
    const results = {};
    
    requiredElements.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      results[selector] = {
        count: elements.length,
        found: elements.length > 0
      };
    });
    
    return results;
  },
  
  // Verificar parâmetros UTM
  checkUtmParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'src', 'sck'];
    
    const results = {
      params: {},
      total: 0
    };
    
    utmParams.forEach(param => {
      const value = urlParams.get(param);
      results.params[param] = value || null;
      if (value) results.total++;
    });
    
    return results;
  },
  
  // Verificar configurações do Facebook
  checkFacebookConfig() {
    const results = {
      pixelId: window.pixelId || null,
      fbqFunction: typeof window.fbq === 'function',
      conversionAPI: null
    };
    
    // Testar Conversion API
    fetch('./api/fb_conversion_api.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventName: 'test',
        customData: { test: true }
      })
    })
    .then(response => response.json())
    .then(data => {
      results.conversionAPI = {
        status: 'success',
        response: data
      };
    })
    .catch(error => {
      results.conversionAPI = {
        status: 'error',
        error: error.message
      };
    });
    
    return results;
  },
  
  // Verificar APIs
  async checkAPIs() {
    const results = {
      saveOrderAPI: null
    };
    
    // Testar API de salvar pedido
    try {
      const response = await fetch('./api/save_order.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          external_id: 'test',
          orderId: 'test',
          platform: 'test',
          paymentMethod: 'checkout',
          status: 'pending'
        })
      });
      
      const data = await response.json();
      results.saveOrderAPI = {
        status: response.status,
        response: data
      };
    } catch (error) {
      results.saveOrderAPI = {
        status: 'error',
        error: error.message
      };
    }
    
    return results;
  },
  
  // Verificar localStorage
  checkLocalStorage() {
    const results = {
      customerData: null,
      monitorData: [],
      diagnosticData: null
    };
    
    // Verificar dados do cliente
    const customerData = localStorage.getItem('paula_customer_data');
    if (customerData) {
      try {
        results.customerData = JSON.parse(customerData);
      } catch (e) {
        results.customerData = 'invalid_json';
      }
    }
    
    // Verificar dados do monitor
    const monitorKeys = Object.keys(localStorage).filter(key => key.startsWith('paula_monitor_'));
    results.monitorData = monitorKeys.slice(-10); // Últimos 10
    
    // Verificar dados de diagnóstico anteriores
    const diagnosticData = localStorage.getItem('paula_diagnostic_results');
    if (diagnosticData) {
      try {
        results.diagnosticData = JSON.parse(diagnosticData);
      } catch (e) {
        results.diagnosticData = 'invalid_json';
      }
    }
    
    return results;
  },
  
  // Verificar performance
  checkPerformance() {
    const results = {
      loadTime: null,
      domReady: null,
      resources: []
    };
    
    // Tempo de carregamento
    if (performance.timing) {
      const timing = performance.timing;
      results.loadTime = timing.loadEventEnd - timing.navigationStart;
      results.domReady = timing.domContentLoadedEventEnd - timing.navigationStart;
    }
    
    // Recursos carregados
    if (performance.getEntriesByType) {
      const resources = performance.getEntriesByType('resource');
      results.resources = resources.slice(-10).map(resource => ({
        name: resource.name,
        duration: resource.duration,
        size: resource.transferSize
      }));
    }
    
    return results;
  },
  
  // Gerar relatório HTML
  generateHTMLReport(results) {
    const report = `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h1>🔍 Relatório de Diagnóstico - Paula Dantas</h1>
        <p><strong>Data:</strong> ${new Date(results.timestamp).toLocaleString()}</p>
        <p><strong>URL:</strong> ${results.url}</p>
        
        <h2>📋 Scripts</h2>
        <ul>
          ${Object.entries(results.tests.scripts).map(([key, value]) => 
            `<li><strong>${key}:</strong> ${typeof value === 'object' ? JSON.stringify(value) : value}</li>`
          ).join('')}
        </ul>
        
        <h2>🎯 Elementos</h2>
        <ul>
          ${Object.entries(results.tests.elements).map(([key, value]) => 
            `<li><strong>${key}:</strong> ${value.count} encontrados</li>`
          ).join('')}
        </ul>
        
        <h2>📊 Parâmetros UTM</h2>
        <p><strong>Total:</strong> ${results.tests.utm.total}</p>
        <ul>
          ${Object.entries(results.tests.utm.params).map(([key, value]) => 
            `<li><strong>${key}:</strong> ${value || 'não encontrado'}</li>`
          ).join('')}
        </ul>
        
        <h2>📱 Performance</h2>
        <p><strong>Tempo de carregamento:</strong> ${results.tests.performance.loadTime}ms</p>
        <p><strong>DOM Ready:</strong> ${results.tests.performance.domReady}ms</p>
      </div>
    `;
    
    return report;
  }
};

// Expor para uso global
window.DIAGNOSTIC = DIAGNOSTIC;

// Executar diagnóstico automaticamente após 5 segundos
setTimeout(() => {
  DIAGNOSTIC.runFullDiagnostic();
}, 5000);

// Comando para executar diagnóstico manualmente
console.log('🔍 Para executar diagnóstico manualmente, use: DIAGNOSTIC.runFullDiagnostic()'); 