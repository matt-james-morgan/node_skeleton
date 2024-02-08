$(document).ready(function() {

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

    const displayItems = function() {

        fetch('/api/favourites')
        .then(res => {
          return res.json()
        })
        .then(data => {
          $('.main-feed').empty();


          data.items.forEach(function(item) {

              const itemHTML = $(
                `<li>
                  <a class="item-card" href="/${item.id}">
                    <div class="item-text">
                      <div class="top-card">
                        <h3>${escape(item.title)}</h3>
                      </div>
                      <p>$${(item.price_cents / 100).toFixed(2)}</p>
                      <p>${escape(item.description)}</p>
                    </div>
                    <img src="${item.image_url}" alt="${escape(item.title)}">
                  </a>
                </li>`
              );
              $('.main-feed').append(itemHTML);

          });

        })
        .catch(err => {
          console.log('Error loading items:', err);
        });

      }
      displayItems();
})
