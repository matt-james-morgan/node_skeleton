  const socket = io('http://localhost:8080');
  const messageForm = document.getElementById('send-container');
  const messageContainer = document.getElementById('received-message');
  const messageInput = document.getElementById('message-input');


// Prevent form data from submitting to server
    messageForm.addEventListener('submit', e => {
      e.preventDefault();
      // Store message text field and send it back to the server
      const message = messageInput.value;
      socket.emit('send-chat-message', message);
      messageInput.value = '';
    })

    const appendMessage = function (message) {
      const messageElement = document.createElement('div');
      messageElement.innerText = message;
      messageContainer.append(messageElement)
    }

    socket.on('chat-message', data => {
      appendMessage(data);
    });

