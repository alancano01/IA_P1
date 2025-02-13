document.addEventListener('DOMContentLoaded', function() {
    const contextInput = document.getElementById('context');
    const commentInput = document.getElementById('comment');
    const sendButton = document.getElementById('send-button');
    const savedMessagesContainer = document.getElementById('saved-messages');
    
    // Añadir efecto de animación a los campos de texto
    [contextInput, commentInput].forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'scale(1.01)';
        });
        
        input.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Función para enviar los datos
    sendButton.addEventListener('click', function() {
        if (validateInputs()) {
            sendData();
        }
    });
    
    // Validación de inputs
    function validateInputs() {
        let isValid = true;
        
        if (!contextInput.value.trim()) {
            shakeElement(contextInput);
            isValid = false;
        }
        
        if (!commentInput.value.trim()) {
            shakeElement(commentInput);
            isValid = false;
        }
        
        return isValid;
    }
    
    // Animación de sacudida para campos vacíos
    function shakeElement(element) {
        element.classList.add('shake');
        setTimeout(() => {
            element.classList.remove('shake');
        }, 600);
    }
    
    // Agregar la clase CSS para la animación de sacudida
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .shake {
            animation: shake 0.6s ease-in-out;
            border-color: #ff4d4d !important;
        }
    `;
    document.head.appendChild(style);
    
    // Función para enviar los datos al backend
    function sendData() {
        const data = {
            context: contextInput.value.trim(),
            comment: commentInput.value.trim()
        };
        
        // Animación de botón mientras se envía
        sendButton.disabled = true;
        sendButton.classList.add('sending');
        sendButton.textContent = 'Enviando...';
        
        // Aquí deberías implementar tu llamada al backend
        // Este es un placeholder para la llamada AJAX
        setTimeout(() => {
            console.log('Datos enviados:', data);
            
            // Reiniciar el botón
            sendButton.disabled = false;
            sendButton.classList.remove('sending');
            sendButton.textContent = 'Enviar';
            
            // Limpiar los campos después de enviar
            commentInput.value = '';
            
            // Mostrar un mensaje de éxito
            showSuccessMessage();
            
            // Simular un nuevo mensaje (esto debería reemplazarse con datos reales de la BD)
            simulateNewMessage(data);
        }, 1000);
    }
    
    // Función para mostrar mensaje de éxito
    function showSuccessMessage() {
        const message = document.createElement('div');
        message.className = 'success-message';
        message.textContent = '¡Mensaje enviado con éxito!';
        message.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #4CAF50;
            color: white;
            padding: 15px 25px;
            border-radius: 4px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(message);
        
        // Mostrar y luego ocultar el mensaje
        setTimeout(() => {
            message.style.opacity = '1';
            setTimeout(() => {
                message.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(message);
                }, 300);
            }, 2000);
        }, 10);
    }
    
    // Función para simular un nuevo mensaje (reemplazar con datos reales de la BD)
    function simulateNewMessage(data) {
        const messageItem = document.createElement('div');
        messageItem.className = 'message-item';
        
        const context = document.createElement('div');
        context.className = 'message-context';
        context.textContent = `Contexto: ${data.context}`;
        
        const text = document.createElement('div');
        text.className = 'message-text';
        text.textContent = data.comment;
        
        const timestamp = document.createElement('div');
        timestamp.className = 'message-timestamp';
        timestamp.textContent = new Date().toLocaleString();
        
        messageItem.appendChild(context);
        messageItem.appendChild(text);
        messageItem.appendChild(timestamp);
        
        // Insertar al principio para que los más recientes estén arriba
        if (savedMessagesContainer.firstChild) {
            savedMessagesContainer.insertBefore(messageItem, savedMessagesContainer.firstChild);
        } else {
            savedMessagesContainer.appendChild(messageItem);
        }
    }
    
    // Función para cargar mensajes guardados desde la BD (a implementar cuando tengas tu backend)
    function loadSavedMessages() {
        // Esta función debería hacer una llamada AJAX a tu backend para obtener los mensajes
        // Por ahora está vacía, esperando a que implementes tu backend
    }
    
    // Llamar a la función de carga de mensajes cuando se inicie la página
    // loadSavedMessages();
    
    // Agregar estilos adicionales para el botón en estado de envío
    const buttonStyle = document.createElement('style');
    buttonStyle.innerHTML = `
        .sending {
            opacity: 0.7;
            cursor: not-allowed;
        }
    `;
    document.head.appendChild(buttonStyle);
});