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
    console.log(data);
    $('.message-feed').empty();
    data.buyerMessages.forEach(function(message) {
      const msgHTML = $(
        `
        <li>
        <a class="item-card" href ="/messages/${message.item_id}">
          <div class="item-text">
            <div class="top-card">
                <h3>Item Name: ${escape(message.title)}</h3>
                </div>
                <p>Item Description: ${escape(message.description)}</p>
                <p><b><u>Buyer</b>: Me </u></p>
                <p><b><u>Seller</b>: ${escape(message.name)} </u></p>
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
        <a class = "item-card" href ="/messages/${message.item_id}">
          <div class="item-text">
            <div class="top-card">
              <h3>Item Name: ${escape(message.title)}</h3>
              </div>
              <p>Item Description: ${escape(message.description)}</p>
              <p><b><u>Buyer</b>: ${escape(message.name)}</u></p>
              <p><b><u>Seller</b>:<u> Me </u></p>
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
