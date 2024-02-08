$(() => {

  // Prevent XSS input
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


  // get all messages that relate to a particular user

  fetch('/api/messageCards')
  .then(res => {
    return res.json();
  })
  .then(data => {
    
    $('.message-feed').empty();
    data.buyerMessages.forEach(function(message) {
      const msgHTML = $(
        `
        <li>
        <a class="item-card" href ="/messages/${message.id}"
          <div class="item-text">
            <img class="message-card-img" src="${escape(message.image_url)}" alt="${escape(message.title)}">
            <div class="message-card-info">
              <h3>Item Name: ${escape(message.title)}</h3>
              <p>Item Description: ${escape(message.description)}</p>
              <p>Buyer: ${escape(message.name)} (<i>Me</i>)</p>
            </div>
          </div>
        </li>
        `
      );
      $('.message-feed').append(msgHTML);
      

    });

    data.sellerMessages.forEach(function(message) {
      const msgHTML = $(
        `
        <li>
        <a class = "message" href ="/messages/${message.id}"
          <div class="message-card">
            <img class="message-card-img" src="${escape(message.image_url)}" alt="${escape(message.title)}">
            <div class="message-card-info">
              <h3>Item Name: ${escape(message.title)}</h3>
              <p>Item Description: ${escape(message.description)}</p>
              <p>Seller: ${escape(message.name)}</p>
            </div>
          </div>
        </li>
        `
      );
      $('.message-feed').append(msgHTML);
      
    });
  })
  .catch(err => console.log("error loading messages: ", err));
});
