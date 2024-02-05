  const socket = io('http://localhost:8080');
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


    fetch('/api/messages')
    .then(res =>{
      // console.log(res.json());
      return res.json();
    }).then((data) => {
      // socket.emit('new-user', data.messages[0].name)
      const fetchUserCookie = function () {
        fetch('/')
      };
      // Prevent form data from submitting to server
      messageForm.addEventListener('submit', e => {
        e.preventDefault();
        const appendSentMessage = function (message) {
          const sendMessage = `
          <div id="sent-message" class="sent-message">
          <div class="sender"><h3>You:</h3>
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
        socket.emit('send-chat-message', message);
        messageInput.value = '';
      });

      const appendReceivedMessage = function (message) {
        const messageElement = `
        <div id="received-message" class="received-message">
        <div class="sender"><h3>${data.messages[0].name}</h3>
        </div>
        <div class="message-contents"><p>${message}</p>
        </div>
      </div>
      `;
        $('.message-container').append(messageElement)
      }
      socket.on('chat-message', data => {
        appendReceivedMessage(data);
      })
    });



// socket.on('chat-message', data => {
//   appendMessage(data);
// });


  });


