// Configuração específica para Paula Dantas (Carequinha)
const PAULA_CONFIG = {
  name: "Paula Dantas",
  nickname: "Carequinha",
  campaign: "ajude-paula-dantas",
  pixelId: "67edf4c3c10671e61577006d",
  
  // Parâmetros UTM para rastreamento
  utmParams: [
    "utm_source",
    "utm_campaign", 
    "utm_medium",
    "utm_content",
    "utm_term",
    "xcod",
    "src",
    "sck"
  ],
  
  // Links de checkout
  checkoutLinks: [
    { amount: 30, id: "39bd8e84-0c3d-4917-954f-b35801d8d829" },
    { amount: 50, id: "273d559b-cc84-48cc-b3bf-1c28d65e0800" },
    { amount: 70, id: "84c55d36-465a-4a8f-9bd0-6b3dae3b992b" },
    { amount: 100, id: "c6a21475-cc6c-45eb-b0c8-c0a6baffc6b0" },
    { amount: 150, id: "6d572550-d3a4-4f7b-b675-b4c62148a567" },
    { amount: 200, id: "63e4c031-9c8c-45b9-8462-d1226b662d16" },
    { amount: 300, id: "14476537-f15a-480b-acd1-a1b35b931107" },
    { amount: 500, id: "e19564b7-4a7e-4555-961b-052b50781762" },
    { amount: 700, id: "7vJOGYjDyqgKXda" },
    { amount: 1000, id: "yOeXZKYEdqgAQap" }
  ],
  
  // Configurações de rastreamento
  tracking: {
    enableFacebookPixel: true,
    enableConversionAPI: true,
    enableUTMTracking: true,
    enableClickTracking: true
  }
};

// Função para obter parâmetros UTM da URL atual
function getCurrentUtmParams() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const utmParams = {};
  
  PAULA_CONFIG.utmParams.forEach(param => {
    const value = urlSearchParams.get(param);
    if (value) {
      utmParams[param] = value;
      console.log(`📊 [Paula] Parâmetro UTM capturado: ${param} = ${value}`);
    }
  });
  
  return utmParams;
}

// Função para construir query string com parâmetros UTM
function buildUtmQueryString(utmParams) {
  if (Object.keys(utmParams).length === 0) {
    return "";
  }
  
  return Object.entries(utmParams)
    .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
    .join("&");
}

// Função para adicionar parâmetros UTM a um link
function addUtmToLink(link) {
  const href = link.getAttribute("href");
  if (!href) return;
  
  // Verifica se é um link de checkout da Paula Dantas
  if (href.includes("checkout.geterectus.site") || href.includes("pay-pagamentos.link")) {
    const utmParams = getCurrentUtmParams();
    
    try {
      const url = new URL(href);
      const linkParams = new URLSearchParams(url.search);
      
      // Adiciona os parâmetros UTM
      for (const key in utmParams) {
        linkParams.set(key, utmParams[key]);
      }
      
      // Adiciona parâmetros para forçar PIX (se suportado pelo sistema)
      linkParams.set("payment_method", "pix");
      linkParams.set("show_pix", "true");
      linkParams.set("prefer_pix", "true");
      
      url.search = linkParams.toString();
      link.setAttribute("href", url.toString());
      console.log(`✅ [Paula] Link atualizado com PIX: ${url.toString()}`);
    } catch (e) {
      console.error("❌ [Paula] Erro ao processar link:", href, e);
    }
  }
}

// Função para rastrear cliques nos botões de doação
function trackDonationClick(amount, link) {
  console.log(`🎯 [Paula] Clique rastreado: R$ ${amount}`);
  
  // Rastreamento Facebook Pixel
  if (PAULA_CONFIG.tracking.enableFacebookPixel && typeof fbq !== "undefined") {
    fbq("track", "InitiateCheckout", {
      currency: "BRL",
      value: amount,
      content_type: "donation",
      content_name: `Doação Paula Dantas - R$ ${amount}`,
      content_category: "carequinha"
    });
  }
  
  // Rastreamento via Conversion API
  if (PAULA_CONFIG.tracking.enableConversionAPI) {
    fetch("./api/fb_conversion_api.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName: "InitiateCheckout",
        customData: {
          value: amount,
          currency: "BRL",
          content_type: "donation",
          content_name: `Doação Paula Dantas - R$ ${amount}`,
          content_category: "carequinha"
        },
      }),
    })
    .then((response) => response.json())
    .then((data) => console.log("✅ [Paula] Conversion API InitiateCheckout tracked:", data))
    .catch((error) => console.error("❌ [Paula] Conversion API error:", error));
  }
}

// Função para inicializar o rastreamento UTM
function initUtmTracking() {
  console.log("🎗️ [Paula] Inicializando rastreamento UTM para Paula Dantas...");
  
  // Aplica aos links existentes
  const checkoutLinks = document.querySelectorAll('a[href*="checkout.geterectus.site"], a[href*="pay-pagamentos.link"]');
  console.log(`🎯 [Paula] Encontrados ${checkoutLinks.length} links de checkout`);
  checkoutLinks.forEach(addUtmToLink);
  
  // Adiciona event listeners para rastreamento de cliques
  checkoutLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute("href");
      const amount = PAULA_CONFIG.checkoutLinks.find(item => 
        href.includes(item.id)
      )?.amount;
      
      if (amount) {
        trackDonationClick(amount, this);
        
        // Adiciona efeito visual de clique
        const button = this.querySelector('button');
        if (button) {
          button.style.transform = 'scale(0.95)';
          setTimeout(() => {
            button.style.transform = 'scale(1)';
          }, 150);
        }
      }
    });
  });
  
  // Observa mudanças no DOM para links adicionados dinamicamente
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(function(node) {
          if (node.nodeType === 1) { // Element node
                         const links = node.querySelectorAll ? node.querySelectorAll('a[href*="checkout.geterectus.site"], a[href*="pay-pagamentos.link"]') : [];
            if (links.length > 0) {
              console.log(`🔄 [Paula] ${links.length} novos links de checkout detectados`);
              links.forEach(addUtmToLink);
              
              // Adiciona event listeners aos novos links
              links.forEach(link => {
                link.addEventListener('click', function(e) {
                  const href = this.getAttribute("href");
                  const amount = PAULA_CONFIG.checkoutLinks.find(item => 
                    href.includes(item.id)
                  )?.amount;
                  
                  if (amount) {
                    trackDonationClick(amount, this);
                  }
                });
              });
            }
          }
        });
      }
    });
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  console.log("🎗️ [Paula] Monitoramento UTM ativo para Paula Dantas!");
}

// Função para preservar parâmetros UTM na página de agradecimento
function preserveUtmInThankYouPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const utmParams = {};
  
  PAULA_CONFIG.utmParams.forEach(param => {
    const value = urlParams.get(param);
    if (value) utmParams[param] = value;
  });
  
  // Se há parâmetros UTM, adiciona ao link de retorno
  if (Object.keys(utmParams).length > 0) {
    const returnLink = document.querySelector('a[href="../index.html"]');
    if (returnLink) {
      const queryString = buildUtmQueryString(utmParams);
      returnLink.href = `../index.html?${queryString}`;
      console.log(`✅ [Paula] Link de retorno atualizado com UTM: ${returnLink.href}`);
    }
  }
}

// Exporta as funções para uso global
window.PAULA_CONFIG = PAULA_CONFIG;
window.getCurrentUtmParams = getCurrentUtmParams;
window.addUtmToLink = addUtmToLink;
window.trackDonationClick = trackDonationClick;
window.initUtmTracking = initUtmTracking;
window.preserveUtmInThankYouPage = preserveUtmInThankYouPage; 