$ (() => {

  fetch('/api/messageHistory')
  .then(res => {
    return res.json();
  })
  .then((data) => {
    // const username = data.user[0].username;
    console.log(data);
    for (let myMessages in data.sentMessages) {
      if (data.sentMessages[myMessages].item_id === data.roomID) {
        console.log("Start from here!")
        console.log(data);
      }
    }
    // if (data.roomID === data.sentMessages[0].item_id) {
    //   data.sentMessages.forEach(sent => {

    //   });
    // }
    const appendSentMessage = function (message) {
      const username = data.user[0].username;
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
  })
});
