$(document).ready(function() {
    const displayItems = function(minPrice, maxPrice) {

        fetch('/api/faveItems')
        .then(res => {
          return res.json()
        })
        .then(data => {
          $('.main-feed').empty();
    
          data.items.forEach(function(item) {
            if((item.price_cents / 100) >= minPrice && (item.price_cents / 100) <= maxPrice){
    
              let additionalHTML = '';
              if(item.sold) {
                additionalHTML = '<p>SOLD</p>';
              };
    
              const itemHTML = $(
                `<li>
                  <a class="item-card" href="/${item.id}">
                    <div class="item-text">
                      <div class="top-card">
                        <h2>${escape(item.title)}</h2>
                        ${additionalHTML}
                        <p class="heart">♡</p>
                      </div>
                      <p>$${(item.price_cents / 100).toFixed(2)}</p>
                      <p>${escape(item.description)}</p>
                    </div>
                    <img src="${item.image_url}" alt="${escape(item.title)}">
                  </a>
                </li>`
              );
              $('.main-feed').append(itemHTML);
            }
          });
          
        })
        .catch(err => {
          console.log('Error loading items:', err);
        });
    
      }
      displayItems();
})