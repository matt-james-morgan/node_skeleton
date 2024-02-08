$ (() => {

  fetch('/api/messageHistory')
  .then(res => {
    return res.json();
  })
  .then((data) => {
    const prependSentMessage = function (message) {
      const username = data.username[0].username;
      const sendMessage = `
      <div id="sent-message" class="sent-message">
      <div class="sender"><h3>${username}:</h3>
      </div>
      <div class="message-contents"><p>${message}</p>
      </div>
    </div>
      `;
      $(".message-container").prepend(sendMessage);
    };

    const prependReceivedMessage = function (message, user) {
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
    // const username = data.user[0].username;
    console.log(data);
    for (let myMessage in data.sentMessages) {
      if (data.sentMessages[myMessage].sender_id === parseInt(data.user)) {
        console.log(data.sentMessages[myMessage].sender_id)
        prependSentMessage(data.sentMessages[myMessage].message_content)
      } else if (data.sentMessages[myMessage].receiver_id === parseInt(data.user)) {
        prependReceivedMessage(data.sentMessages[myMessage].message_content, data.sentMessages[myMessage].username);
      }
    }

  }).catch((err) => {"Error loading history: ", err});
});
