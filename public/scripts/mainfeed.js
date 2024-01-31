
$(document).ready(function() {

  const loadItems = function() {

    // escape function that neutralizes any HTML in the text
    const escape = function(str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    // get items from database and create an html element with that data
    fetch('/items')
    .then(res => {
      // console.log("res.body: ", res.body)
      return res.json()
    })
    .then(data => {
      console.log("data:", data);
        data.items.forEach(function(item) {
          const itemHTML = $(
            `<li>
              <h2>${escape(item.title)}</h2>
              <p>${escape(item.description)}</p>
              <p>Price: ${(item.price_cents / 100).toFixed(2)}</p>
              <img src="${item.image_url}" alt="${escape(item.title)}">
            </li>`
          );
          console.log("itemHTML:", itemHTML);
          $('.main-feed').append(itemHTML);
        });
    })
    .catch(err => {
      console.log('Error loading items:', err);
    });

  }

  loadItems();
});

