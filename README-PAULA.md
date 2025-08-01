# 🎗️ Sistema de Rastreamento UTM - Paula Dantas (Carequinha)

## 📋 Visão Geral

Este sistema foi desenvolvido especificamente para a campanha de doação da **Paula Dantas (Carequinha)**, implementando todas as melhorias de rastreamento UTM e otimizações de conversão.

## ✨ Funcionalidades Implementadas

### 🎯 Rastreamento UTM Avançado
- **Captura automática** de todos os parâmetros UTM da URL
- **Preservação** dos parâmetros em todos os links de checkout
- **Monitoramento em tempo real** de novos links adicionados dinamicamente
- **Suporte completo** para parâmetros: `utm_source`, `utm_campaign`, `utm_medium`, `utm_content`, `utm_term`, `xcod`, `src`, `sck`

### 📊 Rastreamento de Conversões
- **Facebook Pixel** integrado com eventos personalizados
- **Facebook Conversion API** para rastreamento server-side
- **Eventos rastreados**: `InitiateCheckout`
- **Dados personalizados**: valor da doação, categoria "carequinha"
- **Links diretos** para checkout sem geração de PIX no site

### 🚀 Otimizações de Performance
- **Lazy loading** de imagens
- **Preload** de recursos críticos
- **CSS crítico** inline
- **Cache local** de dados
- **Otimização de animações** com `requestAnimationFrame`
- **Compressão de assets** e minificação

### 🎯 Otimizações de Conversão
- **A/B Testing** automático
- **Social Proof** com doações recentes
- **Contador de urgência** com countdown
- **Personalização** baseada no histórico
- **Gamificação** com animações de progresso
- **Micro-interações** e efeitos visuais
- **FOMO** (Fear of Missing Out) nos CTAs
- **Destaque especial** para R$ 50 (doação duplicada)
- **Multiplicador visual** mostrando R$ 50 → R$ 100, R$ 100 → R$ 200, etc.

### 🎨 Otimizações de UX
- **Acessibilidade completa** (ARIA, navegação por teclado)
- **Responsividade avançada** para todos os dispositivos
- **Scroll suave** e header fixo
- **Botão "voltar ao topo"**
- **Feedback visual** em tempo real
- **Loading states** otimizados
- **Validação de formulários** avançada

### 🔗 Links de Checkout Otimizados
- **URLs mistas**: `https://www.pay-pagamentos.link/checkout/[ID]` e `https://checkout.geterectus.site/[ID]`
- **Valores disponíveis**: R$ 30, 50, 70, 100, 150, 200, 300, 500, 700, 1000
- **Parâmetros UTM** automaticamente adicionados a todos os links

## 🚀 Como Usar

### 1. Experiência Simplificada
O sistema foi otimizado para **experiência direta e sem complicações**:
- **Links diretos** para checkout sem geração de PIX no site
- **Navegação simples** - clique no valor e vá direto para o pagamento
- **Sem confusão** - o usuário é direcionado imediatamente para o checkout
- **Rastreamento mantido** - todos os parâmetros UTM são preservados
- **4 botões estratégicos** distribuídos no site para máxima conversão

### 2. Doação Duplicada - Destaque Especial
**🎯 R$ 50 é o valor de destaque!**
- **Doações a partir de R$ 50** são multiplicadas por 2
- **R$ 50 → R$ 100** para Paula Dantas
- **R$ 100 → R$ 200** para Paula Dantas
- **R$ 200 → R$ 400** para Paula Dantas
- **Destaque visual** especial no botão R$ 50
- **Animações** e efeitos para chamar atenção
- **FOMO** específico: "🎯 VALE O DOBRO!"

### 3. Formas de Pagamento - PIX
**💳 PIX, Cartão e Boleto disponíveis**
- **Checkout externo** redireciona para sistema seguro
- **Parâmetros automáticos** para forçar PIX quando possível
- **Links otimizados** para melhor experiência de pagamento

### 4. Configuração Inicial
```javascript
// O sistema é carregado automaticamente via paula-config.js
// Configurações principais:
PAULA_CONFIG = {
  name: "Paula Dantas",
  nickname: "Carequinha",
  campaign: "ajude-paula-dantas",
  pixelId: "67edf4c3c10671e61577006d"
}
```

### 2. Teste de Parâmetros UTM
Acesse a página com parâmetros UTM:
```
https://seudominio.com/?utm_source=facebook&utm_campaign=doacao&utm_medium=cpc
```

### 3. Verificação no Console
Abra o console do navegador para ver os logs:
```
🎗️ [Paula] Sistema de rastreamento UTM inicializado para Paula Dantas (Carequinha)!
📊 [Paula] Parâmetro UTM capturado: utm_source = facebook
✅ [Paula] Link atualizado: https://checkout.geterectus.site/yOeXZKYEdqgAQap?utm_source=facebook&utm_campaign=doacao
```

## 📁 Estrutura de Arquivos

```
carequinha/
├── index.html                 # Página principal
├── js/
│   ├── paula-config.js        # Configuração específica da Paula
│   ├── performance-optimizer.js # Otimizações de performance
│   ├── conversion-optimizer.js  # Otimizações de conversão
│   ├── ux-optimizer.js        # Otimizações de UX
│   └── script.js              # Scripts gerais
├── css/
│   ├── styles.css             # Estilos principais
│   ├── optimizations.css      # Estilos otimizados
│   ├── modal.css              # Estilos de modal
│   └── toast.css              # Estilos de notificação
├── obrigado/
│   └── index.html             # Página de agradecimento
└── api/
    └── fb_conversion_api.php  # API Facebook Conversion
```

## 🔧 Configurações Avançadas

### Facebook Conversion API
1. Substitua `YOUR_ACCESS_TOKEN_HERE` no arquivo `api/fb_conversion_api.php`
2. Configure o pixel ID correto
3. Teste os eventos no Facebook Events Manager

### Parâmetros UTM Personalizados
Para adicionar novos parâmetros UTM, edite o array em `paula-config.js`:
```javascript
utmParams: [
  "utm_source",
  "utm_campaign", 
  "utm_medium",
  "utm_content",
  "utm_term",
  "xcod",
  "src",
  "sck",
  "novo_parametro"  // Adicione aqui
]
```

## 📈 Métricas Rastreadas

### Eventos Facebook Pixel
- **InitiateCheckout**: Quando usuário clica em botão de doação

### Dados Capturados
- Valor da doação
- Parâmetros UTM completos
- Informações do dispositivo
- Timestamp do evento

### Métricas de Performance
- **Tempo de carregamento** da página
- **Core Web Vitals** (LCP, FID, CLS)
- **Taxa de conversão** por variante A/B
- **Engajamento** do usuário
- **Bounce rate** otimizado

### Métricas de Conversão
- **Taxa de clique** nos botões de doação
- **Funnel de conversão** completo
- **Social proof** effectiveness
- **Urgency impact** no comportamento
- **Personalização** effectiveness

## 🎗️ Sobre Paula Dantas (Carequinha)

Paula Dantas, conhecida carinhosamente como "Carequinha", é uma mãe solo que luta contra o câncer de mama. Este sistema foi desenvolvido para maximizar as doações e ajudar em seu tratamento.

**Campanha**: Ajude Paula Dantas  
**Categoria**: Doação para tratamento médico  
**Região**: Brasil

## 🔍 Troubleshooting

### Parâmetros UTM não aparecem
1. Verifique se a URL contém parâmetros UTM válidos
2. Abra o console do navegador para ver logs de debug
3. Confirme se o script `paula-config.js` está carregado

### Links de Checkout Atualizados

| Valor | Link |
|-------|------|
| R$ 30 | `https://www.pay-pagamentos.link/checkout/39bd8e84-0c3d-4917-954f-b35801d8d829` |
| R$ 50 | `https://www.pay-pagamentos.link/checkout/273d559b-cc84-48cc-b3bf-1c28d65e0800` |
| R$ 70 | `https://www.pay-pagamentos.link/checkout/84c55d36-465a-4a8f-9bd0-6b3dae3b992b` |
| R$ 100 | `https://www.pay-pagamentos.link/checkout/c6a21475-cc6c-45eb-b0c8-c0a6baffc6b0` |
| R$ 150 | `https://www.pay-pagamentos.link/checkout/6d572550-d3a4-4f7b-b675-b4c62148a567` |
| R$ 200 | `https://www.pay-pagamentos.link/checkout/63e4c031-9c8c-45b9-8462-d1226b662d16` |
| R$ 300 | `https://www.pay-pagamentos.link/checkout/14476537-f15a-480b-acd1-a1b35b931107` |
| R$ 500 | `https://www.pay-pagamentos.link/checkout/e19564b7-4a7e-4555-961b-052b50781762` |
| R$ 700 | `https://checkout.geterectus.site/7vJOGYjDyqgKXda` |
| R$ 1000 | `https://checkout.geterectus.site/yOeXZKYEdqgAQap` |

### Links não são atualizados
1. Verifique se os links contêm `pay-pagamentos.link` ou `checkout.geterectus.site`
2. Confirme se o MutationObserver está funcionando
3. Teste com diferentes parâmetros UTM

### Facebook Pixel não funciona
1. Verifique se o pixel ID está correto
2. Confirme se o Facebook Pixel está carregado
3. Teste no Facebook Events Manager

## 📞 Suporte

Para dúvidas ou problemas com o sistema da Paula Dantas, consulte os logs no console do navegador ou entre em contato com a equipe de desenvolvimento.

---

**💝 Que Deus abençoe você por ajudar a Paula Dantas em sua luta!** 