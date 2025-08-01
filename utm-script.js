// Script para capturar parâmetros UTM e passar para links de checkout
(function() {
    'use strict';

    // Parâmetros UTM que queremos capturar
    const utmParams = [
        'utm_source',
        'utm_medium', 
        'utm_campaign',
        'utm_content',
        'utm_term',
        'xcod'
    ];

    // Função para obter parâmetros UTM da URL atual
    function getUTMParams() {
        const urlParams = new URLSearchParams(window.location.search);
        const params = {};
        
        utmParams.forEach(param => {
            const value = urlParams.get(param);
            if (value) {
                params[param] = value;
            }
        });
        
        return params;
    }

    // Função para construir query string com parâmetros UTM
    function buildQueryString(params) {
        return Object.entries(params)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');
    }

    // Função para adicionar parâmetros UTM aos links de checkout
    function addUTMToCheckoutLinks() {
        const utmParams = getUTMParams();
        
        console.log('UTM Script - Parâmetros encontrados:', utmParams);
        
        // Se não há parâmetros UTM, não faz nada
        if (Object.keys(utmParams).length === 0) {
            console.log('UTM Script - Nenhum parâmetro UTM encontrado');
            return;
        }

        const queryString = buildQueryString(utmParams);
        console.log('UTM Script - Query string construída:', queryString);
        
        // Seleciona todos os links de checkout
        const checkoutLinks = document.querySelectorAll('a[href*="checkout.geterectus.site"], a[href*="pay-pagamentos.link"]');
        
        console.log('UTM Script - Links de checkout encontrados:', checkoutLinks.length);
        
        let updatedCount = 0;
        checkoutLinks.forEach((link, index) => {
            const currentHref = link.getAttribute('href');
            const separator = currentHref.includes('?') ? '&' : '?';
            const newHref = currentHref + separator + queryString;
            link.setAttribute('href', newHref);
            updatedCount++;
            console.log(`UTM Script - Link ${index + 1} atualizado:`, currentHref, '->', newHref);
        });
        
        console.log(`UTM Script - Total de links atualizados: ${updatedCount}`);
    }

    // Função para adicionar parâmetros UTM a um link específico
    function addUTMToLink(linkUrl) {
        const utmParams = getUTMParams();
        
        if (Object.keys(utmParams).length === 0) {
            return linkUrl;
        }

        const queryString = buildQueryString(utmParams);
        const separator = linkUrl.includes('?') ? '&' : '?';
        
        return linkUrl + separator + queryString;
    }

    // Função para verificar se os links foram atualizados
    function verifyLinksUpdate() {
        setTimeout(() => {
            const checkoutLinks = document.querySelectorAll('a[href*="checkout.geterectus.site"], a[href*="pay-pagamentos.link"]');
            console.log('UTM Script - Verificação final - Links de checkout:', checkoutLinks.length);
            checkoutLinks.forEach((link, index) => {
                console.log(`UTM Script - Link ${index + 1} final:`, link.href);
            });
        }, 200);
    }

    // Função para forçar a execução do script
    function forceUTMUpdate() {
        console.log('UTM Script - Forçando atualização...');
        addUTMToCheckoutLinks();
        verifyLinksUpdate();
    }

    // Executa quando o DOM estiver carregado
    function initializeUTM() {
        console.log('UTM Script - Inicializando...');
        addUTMToCheckoutLinks();
        verifyLinksUpdate();
    }

    // Tenta executar imediatamente se o DOM já estiver carregado
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            console.log('UTM Script - DOM carregado, executando...');
            initializeUTM();
        });
    } else {
        console.log('UTM Script - DOM já carregado, executando imediatamente...');
        initializeUTM();
    }

    // Executa novamente após um pequeno delay para garantir que todos os elementos foram carregados
    setTimeout(function() {
        console.log('UTM Script - Execução tardia para garantir...');
        addUTMToCheckoutLinks();
    }, 1000);

    // Expõe a função para uso manual
    window.UTMHelper = {
        addUTMToLink: addUTMToLink,
        getUTMParams: getUTMParams,
        addUTMToCheckoutLinks: addUTMToCheckoutLinks,
        forceUTMUpdate: forceUTMUpdate
    };

    // Log para debug
    console.log('UTM Script carregado. Parâmetros UTM encontrados:', getUTMParams());

})(); 