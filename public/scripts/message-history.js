$ (() => {

  fetch('/api/messageHistory')
  .then(res => {
    return res.json();
  })
  .then((data) => {
    const appendSentMessage = function (message) {
      const username = data.username[0].username;
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
    for (let myMessage in data.sentMessages) {
      if (data.sentMessages[myMessage].sender_id === parseInt(data.user)) {
        appendSentMessage(data.sentMessages[myMessage].message_content)
      } else if (data.sentMessages[myMessage].receiver_id === parseInt(data.user)) {
        appendReceivedMessage(data.sentMessages[myMessage].message_content, data.sentMessages[myMessage].username);
      }
    }

  }).catch((err) => {"Error loading history: ", err});
});
