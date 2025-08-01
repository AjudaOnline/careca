document.addEventListener("DOMContentLoaded", function () {
  // Get all donation buttons
  const donationButtons = document.querySelectorAll(".post-button2");

  // Add click event listener to each button
  donationButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      // Get the parent anchor element
      const parentAnchor = this.closest("a");
      if (parentAnchor) {
        // Prevent the default navigation
        e.preventDefault();

        // Extract the amount from the button text
        const buttonText = this.textContent.trim();
        const amountText = buttonText
          .replace("R$ ", "")
          .replace(".", "")
          .replace(",", "");
        const amount = parseInt(amountText, 10) * 100; // Convert to cents

        // Call the function to generate PIX
        generatePix(amount);
      }
    });
  });

  // Function to generate PIX
  async function generatePix(amount) {
    // Track InitiateCheckout event for Facebook Pixel (browser-side)
    if (typeof fbq !== "undefined") {
      fbq("track", "InitiateCheckout", {
        currency: "BRL",
        value: amount / 100,
        content_type: "donation",
      });
    }

    // Track InitiateCheckout event via Conversion API (server-side)
    fetch("./api/fb_conversion_api.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName: "InitiateCheckout",
        customData: {
          value: amount / 100,
          currency: "BRL",
          content_type: "donation",
        },
      }),
    })
      .then((response) => response.json())
      .then((data) =>
        console.log("Conversion API InitiateCheckout tracked:", data)
      )
      .catch((error) => console.error("Conversion API error:", error));

    // Show loading state
    showLoading();

    try {
      // Prepare request data for new API with REAL customer data
      const customerData = await getCustomerData();
      
      if (!customerData) {
        hideLoading();
        return; // User cancelled
      }

      const pixRequestData = {
        amount: amount, // Amount in cents
        description: "Pix para Paula Dantas",
        customer: {
          name: customerData.name,
          document: customerData.cpf,
          phone: customerData.phone,
          email: customerData.email,
        },
        item: {
          title: "Pagamento Único",
          price: amount,
          quantity: 1,
        },
        utm: getUtmParameters(),
      };

      // Log the entire body of the request being sent to the API
      console.log("Request Body:", JSON.stringify(pixRequestData));

      // Make API request to generate PIX using the new API endpoint
      const response = await fetch("https://api-production-0feb3.up.railway.app/g5", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pixRequestData),
      });
      
      const data = await response.json();
      
      // Hide loading state
      hideLoading();

      if (data.pixCode && data.transactionId) {
        // Save transaction ID for status checking
        const transactionId = data.transactionId;

        // Show PIX modal with QR code
        showPixModalNew(data, amount / 100, transactionId);

        // Save order data to database (if needed)
        saveOrderDataNew(data, amount);
      } else {
        // Show error message
        showError("Erro ao gerar o PIX. Por favor, tente novamente.");
      }
    } catch (error) {
      // Hide loading state
      hideLoading();

      // Show error message
      showError("Erro ao gerar o PIX. Por favor, tente novamente.");
      console.error("Error:", error);
    }
  }

  // Helper function to get UTM parameters from URL
  function getUtmParameters() {
    const urlParams = new URLSearchParams(window.location.search);

    // Get all UTM parameters and build the full string
    const utmParams = {};

    // Add all UTM parameters to the object
    [
      "utm_source",
      "utm_campaign",
      "utm_medium",
      "utm_content",
      "utm_term",
      "utm_id",
      "fbclid",
      "xcod",
      "sck",
    ].forEach((param) => {
      const value = urlParams.get(param);
      if (value) {
        utmParams[param] = value;
      }
    });

    // Build the query string
    if (Object.keys(utmParams).length === 0) {
      return "direct";
    }

    return Object.entries(utmParams)
      .map(
        ([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`
      )
      .join("&");
  }

  // Function to get customer data - CORRIGIDO
  function getCustomerData() {
    // Try to get from localStorage first (if user previously entered)
    const savedData = localStorage.getItem('paula_customer_data');
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (e) {
        console.log('Erro ao carregar dados salvos, usando padrão');
      }
    }

    // If no saved data, show form to collect customer data
    return showCustomerDataForm();
  }

  // Function to show customer data form
  function showCustomerDataForm() {
    return new Promise((resolve) => {
      // Create form modal
      const formModal = document.createElement("div");
      formModal.id = "customer-form-modal";
      formModal.className = "modal";
      formModal.innerHTML = `
        <div class="modal-content form-content">
          <span class="close-button">&times;</span>
          <h2>Dados para o PIX</h2>
          <p>Preencha seus dados para gerar o PIX:</p>
          <form id="customer-form">
            <div class="form-group">
              <label for="customer-name">Nome Completo:</label>
              <input type="text" id="customer-name" required>
            </div>
            <div class="form-group">
              <label for="customer-email">Email:</label>
              <input type="email" id="customer-email" required>
            </div>
            <div class="form-group">
              <label for="customer-phone">Telefone:</label>
              <input type="tel" id="customer-phone" placeholder="(11) 99999-9999" required>
            </div>
            <div class="form-group">
              <label for="customer-cpf">CPF:</label>
              <input type="text" id="customer-cpf" placeholder="000.000.000-00" required>
            </div>
            <div class="form-buttons">
              <button type="submit" class="btn-primary">Gerar PIX</button>
              <button type="button" class="btn-secondary" id="use-default">Usar Dados Padrão</button>
            </div>
          </form>
        </div>
      `;

      document.body.appendChild(formModal);
      formModal.style.display = "flex";

      // Add styles
      const style = document.createElement('style');
      style.textContent = `
        .form-content {
          max-width: 500px;
          padding: 30px;
        }
        .form-group {
          margin-bottom: 20px;
        }
        .form-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }
        .form-group input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
        }
        .form-buttons {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }
        .btn-primary, .btn-secondary {
          padding: 12px 24px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        }
        .btn-primary {
          background-color: #007bff;
          color: white;
        }
        .btn-secondary {
          background-color: #6c757d;
          color: white;
        }
      `;
      document.head.appendChild(style);

      // Handle form submission
      document.getElementById('customer-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const customerData = {
          name: document.getElementById('customer-name').value,
          email: document.getElementById('customer-email').value,
          phone: document.getElementById('customer-phone').value,
          cpf: document.getElementById('customer-cpf').value.replace(/\D/g, '')
        };

        // Save to localStorage
        localStorage.setItem('paula_customer_data', JSON.stringify(customerData));
        
        // Close modal and resolve
        document.body.removeChild(formModal);
        resolve(customerData);
      });

      // Handle default data button
      document.getElementById('use-default').addEventListener('click', function() {
        const defaultData = {
          name: "Doação Anônima",
          email: "doacao@paula.com",
          phone: "11999999999",
          cpf: "00000000000"
        };
        
        document.body.removeChild(formModal);
        resolve(defaultData);
      });

      // Handle close button
      formModal.querySelector('.close-button').addEventListener('click', function() {
        document.body.removeChild(formModal);
        resolve(null);
      });
    });
  }

  // Function to show loading state
  function showLoading() {
    // Check if loading modal already exists
    let loadingModal = document.getElementById("loading-modal");

    if (!loadingModal) {
      // Create loading modal
      loadingModal = document.createElement("div");
      loadingModal.id = "loading-modal";
      loadingModal.className = "modal";
      loadingModal.innerHTML = `
                <div class="modal-content loading-content">
                    <div class="loader"></div>
                    <p>Gerando PIX...</p>
                </div>
            `;

      // Append to body
      document.body.appendChild(loadingModal);
    }

    // Show loading modal
    loadingModal.style.display = "flex";
  }

  // Function to hide loading state
  function hideLoading() {
    const loadingModal = document.getElementById("loading-modal");
    if (loadingModal) {
      loadingModal.style.display = "none";
    }
  }

  // Function to show PIX modal with QR code (updated for new API)
  function showPixModalNew(data, amountFormatted, transactionId) {
    // Store the amount for later use
    window.currentDonationAmount = amountFormatted;

    // Store the transaction ID for status checking
    window.currentTransactionId = transactionId || null;

    // Check if PIX modal already exists
    let pixModal = document.getElementById("pix-modal");

    if (!pixModal) {
      // Create PIX modal
      pixModal = document.createElement("div");
      pixModal.id = "pix-modal";
      pixModal.className = "modal";
      pixModal.innerHTML = `
                <div class="modal-content pix-content">
                    <span class="close-button">&times;</span>
                    <h2>Pagamento PIX</h2>
                    <div class="pix-amount">R$ <span id="pix-amount-value"></span></div>
                    <div class="pix-qrcode-container">
                        <div id="pix-qrcode"></div>
                    </div>
                    <div class="pix-copy-container">
                        <p>Código PIX para copiar e colar:</p>
                        <div class="pix-copy-input-container">
                            <input type="text" id="pix-copy-input" readonly>
                            <button id="pix-copy-button">Copiar</button>
                        </div>
                    </div>
                    <div class="pix-instructions">
                        <p>1. Abra o aplicativo do seu banco</p>
                        <p>2. Escolha a opção PIX</p>
                        <p>3. Escaneie o QR code ou cole o código</p>
                        <p>4. Confirme o pagamento</p>
                    </div>
                </div>
            `;

      // Append to body
      document.body.appendChild(pixModal);

      // Add event listener to close button
      const closeButton = pixModal.querySelector(".close-button");
      closeButton.addEventListener("click", function () {
        pixModal.style.display = "none";
      });

      // Add event listener to copy button
      const copyButton = pixModal.querySelector("#pix-copy-button");
      copyButton.addEventListener("click", function () {
        const copyInput = document.getElementById("pix-copy-input");
        copyInput.select();
        document.execCommand("copy");
        this.textContent = "Copiado!";
        setTimeout(() => {
          this.textContent = "Copiar";
        }, 2000);
      });

      // Close modal when clicking outside of it
      window.addEventListener("click", function (event) {
        if (event.target == pixModal) {
          pixModal.style.display = "none";
        }
      });
    }

    // Update modal content with PIX data
    const amountElement = pixModal.querySelector("#pix-amount-value");
    amountElement.textContent = amountFormatted.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
    });

    // Generate QR code
    const qrcodeElement = pixModal.querySelector("#pix-qrcode");
    qrcodeElement.innerHTML = "";

    // Use QRCode library to generate QR code
    new QRCode(qrcodeElement, {
      text: data.pixCode,
      width: 250,
      height: 250,
    });

    // Set copy input value
    const copyInput = pixModal.querySelector("#pix-copy-input");
    copyInput.value = data.pixCode;

    // Show PIX modal
    pixModal.style.display = "flex";

    // Start polling for payment status if we have a transaction ID
    if (window.currentTransactionId) {
      startPaymentStatusPollingNew(
        window.currentTransactionId,
        amountFormatted
      );
    }
  }

  // Polling interval in milliseconds
  const POLLING_INTERVAL = 5000; // 5 seconds
  let pollingTimer = null;

  // Function to start polling for payment status (updated for new API)
  function startPaymentStatusPollingNew(transactionId, amountFormatted) {
    // Clear any existing polling timer
    if (pollingTimer) {
      clearInterval(pollingTimer);
    }

    // Add a status indicator to the modal
    const pixModal = document.getElementById("pix-modal");
    let statusElement = pixModal.querySelector(".payment-status");

    if (!statusElement) {
      statusElement = document.createElement("div");
      statusElement.className = "payment-status";
      statusElement.innerHTML = "<p>Aguardando confirmação de pagamento...</p>";

      // Add it to the modal content, after the QR code container
      const modalContent = pixModal.querySelector(".modal-content");
      const qrCodeContainer = pixModal.querySelector(".pix-qrcode-container");

      if (modalContent && qrCodeContainer) {
        modalContent.insertBefore(statusElement, qrCodeContainer.nextSibling);
      } else {
        // Fallback: just append to modal content
        const modalContent = pixModal.querySelector(".modal-content");
        if (modalContent) {
          modalContent.appendChild(statusElement);
        }
      }
    }

    // Function to check payment status using new API
    const checkPaymentStatusNew = () => {
      fetch("https://api-production-0feb.up.railway.app/verify5", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentId: transactionId }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Payment status check:", data);

          if (data.ok && data.status === "completed") {
            // Payment confirmed! Redirect to thank you page
            clearInterval(pollingTimer);
            statusElement.innerHTML =
              "<p>Pagamento confirmado! Redirecionando...</p>";

            // Track Purchase event via Facebook Pixel (browser-side)
            if (typeof fbq !== "undefined") {
              fbq("track", "Purchase", {
                value: amountFormatted,
                currency: "BRL",
                content_type: "donation",
              });
            }

            // Track Purchase event via Facebook Conversion API (server-side)
            fetch("./api/fb_conversion_api.php", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                eventName: "Purchase",
                customData: {
                  value: amountFormatted,
                  currency: "BRL",
                  content_type: "donation",
                  transaction_id: transactionId,
                },
              }),
            })
              .then((response) => response.json())
              .then((data) =>
                console.log("Conversion API Purchase tracked:", data)
              )
              .catch((error) => console.error("Conversion API error:", error));

            // Redirect after a short delay
            setTimeout(() => {
              const urlParams = new URLSearchParams(window.location.search);
              const newParams = new URLSearchParams();
              urlParams.forEach((value, key) => {
                newParams.append(key, value);
              });
              newParams.append("amount", amountFormatted);
              newParams.append("transaction_id", transactionId);
              window.location.href =
                "./obrigado/index.html?" + newParams.toString();
            }, 5000);
          } else {
            // Update status message
            statusElement.innerHTML =
              "<p>Aguardando confirmação de pagamento...</p>";
          }
        })
        .catch((error) => {
          console.error("Error checking payment status:", error);
          statusElement.innerHTML =
            "<p>Erro ao verificar status do pagamento. Tente novamente.</p>";
        });
    };

    // Check immediately and then start polling
    checkPaymentStatusNew();
    pollingTimer = setInterval(checkPaymentStatusNew, POLLING_INTERVAL);
  }

  // Function to save order data to database (updated for new API)
  function saveOrderDataNew(data, amount) {
    // Helper function to get URL parameters
    function getUrlParameter(name) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(name);
    }

    const orderData = {
      external_id: data.transactionId,
      orderId: data.transactionId,
      platform: "operação",
      paymentMethod: "pix",
      status: "pending",
      createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
      approvedDate: null,
      refundedAt: null,
      customer: data.customer || {
        name: "Doação",
        document: "00000000000",
      },
      products: [
        {
          title: "Pagamento Único",
          id: "pag01",
          unitPrice: amount,
          quantity: 1,
          tangible: false,
        },
      ],
      trackingParameters: {
        src: getUrlParameter("src"),
        sck: getUrlParameter("sck"),
        utm_source: getUrlParameter("utm_source"),
        utm_campaign: getUrlParameter("utm_campaign"),
        utm_medium: getUrlParameter("utm_medium"),
        utm_content: getUrlParameter("utm_content"),
        utm_term: getUrlParameter("utm_term"),
      },
      commission: {
        totalPriceInCents: amount,
        gatewayFeeInCents: 0,
        userCommissionInCents: amount,
        currency: "BRL",
      },
      isTest: false,
    };

    // Send the order data to the backend
    fetch("./api/save_order.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Order saved successfully:", data);
      })
      .catch((error) => {
        console.error("Error saving order:", error);
      });
  }

  // Function to show error message
  function showError(message) {
    // Check if error modal already exists
    let errorModal = document.getElementById("error-modal");

    if (!errorModal) {
      // Create error modal
      errorModal = document.createElement("div");
      errorModal.id = "error-modal";
      errorModal.className = "modal";
      errorModal.innerHTML = `
                <div class="modal-content error-content">
                    <span class="close-button">&times;</span>
                    <h2>Erro</h2>
                    <p id="error-message"></p>
                    <button id="error-close-button">Fechar</button>
                </div>
            `;

      // Append to body
      document.body.appendChild(errorModal);

      // Add event listeners to close buttons
      const closeButton = errorModal.querySelector(".close-button");
      const closeButtonBottom = errorModal.querySelector("#error-close-button");

      closeButton.addEventListener("click", function () {
        errorModal.style.display = "none";
      });

      closeButtonBottom.addEventListener("click", function () {
        errorModal.style.display = "none";
      });

      // Close modal when clicking outside of it
      window.addEventListener("click", function (event) {
        if (event.target == errorModal) {
          errorModal.style.display = "none";
        }
      });
    }

    // Update error message
    const errorMessageElement = errorModal.querySelector("#error-message");
    errorMessageElement.textContent = message;

    // Show error modal
    errorModal.style.display = "flex";
  }
});
