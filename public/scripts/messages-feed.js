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
        <a class="item-card" href ="/messages/${message.id}">
          <div class="item-text">
            <div class="top-card">
                <h3>Item Name: ${escape(message.title)}</h3>
                </div>
                <p>Item Description: ${escape(message.description)}</p>
                <p>Buyer: ${escape(message.name)} (<i>Me</i>)</p>
            </div>
          <img class="message-card-img" src="${escape(message.image_url)}" alt="${escape(message.title)}">
          </a>
        </li>
        `
      );
      $('.message-feed').append(msgHTML);
      

    });

    data.sellerMessages.forEach(function(message) {
      const msgHTML = $(
        `
        <li>
        <a class = "item-card" href ="/messages/${message.id}">
          <div class="item-text">
            <div class="top-card">
              <h3>Item Name: ${escape(message.title)}</h3>
              </div>
              <p>Item Description: ${escape(message.description)}</p>
              <p>Seller: ${escape(message.name)}</p>
          </div>
          <img class="message-card-img" src="${escape(message.image_url)}" alt="${escape(message.title)}">
        </a>
        </li>
        `
      );
      $('.message-feed').append(msgHTML);
      
    });
  })
  .catch(err => console.log("error loading messages: ", err));
});
