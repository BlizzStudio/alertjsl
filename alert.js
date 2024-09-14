      (function(global) {
    function createAlert(options) {
        const defaults = {
            title: "Alert",
            buttonText: "OK",
            type: "success",
            width: "auto",
            height: "auto",
            textWidth: "100%",
            textHeight: "auto",
            buttonWidth: "auto",
            buttonHeight: "auto"
        };

        const settings = { ...defaults, ...options };

        // Injecting CSS into the head dynamically
        function injectCSS() {
            const css = `
                .alert-container {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    padding: 20px;
                    border-radius: 12px;
                    color: #fff;
                    font-family: Arial, sans-serif;
                    z-index: 9999;
                    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
                    text-align: center;
                    opacity: 0;
                    transform: translate(-50%, -60%);
                    animation: slideIn 0.5s forwards, fadeIn 0.5s forwards;
                }

                @keyframes slideIn {
                    from {
                        transform: translate(-50%, -60%) scale(0.8);
                    }
                    to {
                        transform: translate(-50%, -50%) scale(1);
                    }
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                .alert-container.success {
                    background-color: #4CAF50;
                    border: 2px solid #4CAF50;
                }

                .alert-container.warning {
                    background-color: #FFC107;
                    border: 2px solid #FFC107;
                }

                .alert-container.error {
                    background-color: #F44336;
                    border: 2px solid #F44336;
                }

                .alert-icon {
                    font-size: 48px;
                    margin-bottom: 15px;
                }

                .alert-title {
                    margin-bottom: 15px;
                    font-size: 20px;
                    font-weight: bold;
                }

                .alert-button {
                    padding: 10px 20px;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    transition: background-color 0.3s, color 0.3s;
                    font-size: 16px;
                }

                .alert-button.success {
                    background-color: #4CAF50;
                    color: white;
                }

                .alert-button.warning {
                    background-color: #FFC107;
                    color: black;
                }

                .alert-button.error {
                    background-color: #F44336;
                    color: white;
                }
            `;

            const style = document.createElement('style');
            style.type = 'text/css';
            if (style.styleSheet) {
                style.styleSheet.cssText = css; // For IE8 and below
            } else {
                style.appendChild(document.createTextNode(css)); // Modern browsers
            }

            document.head.appendChild(style);
        }

        // Call the function to inject CSS
        injectCSS();

        const container = document.createElement('div');
        container.className = `alert-container ${settings.type}`;
        container.style.width = settings.width;
        container.style.height = settings.height;

        const iconElement = document.createElement('div');
        iconElement.className = 'alert-icon';
        switch (settings.type) {
            case 'success':
                iconElement.innerHTML = '<i class="fas fa-check-circle"></i>';
                break;
            case 'warning':
                iconElement.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
                break;
            case 'error':
                iconElement.innerHTML = '<i class="fas fa-times-circle"></i>';
                break;
            default:
                iconElement.innerHTML = '<i class="fas fa-info-circle"></i>';
                break;
        }
        container.appendChild(iconElement);

        const title = document.createElement('div');
        title.textContent = settings.title;
        title.className = 'alert-title';
        title.style.width = settings.textWidth;
        title.style.height = settings.textHeight;
        container.appendChild(title);

        const button = document.createElement('button');
        button.textContent = settings.buttonText;
        button.className = `alert-button ${settings.type}`;
        button.style.width = settings.buttonWidth;
        button.style.height = settings.buttonHeight;
        button.addEventListener('click', function() {
            document.body.removeChild(container);
        });
        container.appendChild(button);

        document.body.appendChild(container);
    }

    global.Alertjs = {
        create: createAlert
    };
})(this);