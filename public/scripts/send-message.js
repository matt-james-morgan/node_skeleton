  const socket = io('http://localhost:3000');
  const messageForm = document.getElementById('send-container');
  const receivedMessage = document.getElementById('received-message');
  const messageInput = document.getElementById('message-input');
  const outgoingMessage = document.getElementById('sent-message');
  $(() => {

    const escape = function(str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };


// Create new messages
    fetch('/api/messages')
    .then(res => {
      return res.json();
    })
    .then((data) => {
      // Prevent form data from submitting to server
      const username = data.user[0].username;
      const room = data.roomID;
      // console.log(data);
      socket.emit('chat-user', username);
      socket.emit("join-room", room);
      messageForm.addEventListener('submit', e => {
        e.preventDefault();
        const appendSentMessage = function (message) {
          const sendMessage = `
          <div id="sent-message" class="sent-message">
          <div class="sender"><h3>${username}:</h3>
          </div>
          <div class="message-contents"><p>${message}</p>
          </div>
        </div>
          `;
          $(".message-container").append(sendMessage);
        };
        // Store message text field and send it back to the server
        const message = escape(messageInput.value);
        appendSentMessage(message);
        socket.emit('send-chat-message', message, room);
        messageInput.value = '';
      });

      const appendReceivedMessage = function (message, user) {
        const messageElement = `
        <div id="received-message" class="received-message">
        <div class="sender"><h3>${user}</h3>
        </div>
        <div class="message-contents"><p>${message}</p>
        </div>
      </div>
      `;
        $('.message-container').append(messageElement)
      }
      socket.on('chat-message', data => {
        appendReceivedMessage(data.message, data.name);
      });
    });
  });


