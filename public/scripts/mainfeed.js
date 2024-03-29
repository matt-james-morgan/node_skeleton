
$(document).ready(function() {


  // escape function that neutralizes any HTML in the text
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // check if there are any items that match filter, add empty class if none do
  const updateEmptyState = function() {
    const itemsLength = $('.main-feed li').length;
    if (itemsLength === 0) {
      const noResultHTML = $(
        `<p class="empty">Sorry, no items are currently for sale within this price range.</p>`
      )
      $('.main-feed').append(noResultHTML);
    };
  };

  // gets all items from database and create an html element with that data
  const displayItems = function(minPrice, maxPrice) {

    fetch('/api/items')
    .then(res => {
      return res.json()
    })
    .then(data => {

      fetch('/api/favourites')
      .then(res => {
        return res.json()
      })
      .then(favouritesData => {



        $('.main-feed').empty();

        data.items.forEach(function(item) {

          for (let i of favouritesData.items) {
            if (i.item_id === item.id) {
              item["favourited"] = true;
            }
          }
          if((item.price_cents / 100) >= minPrice && (item.price_cents / 100) <= maxPrice){

            let additionalHTML = '';
            if(item.sold) {
              additionalHTML = '<p>SOLD</p>';
            };

            const itemHTML = $(
              `<li data-id=${item.id}>
                <a class="item-card" href="/${item.id}">
                  <div class="item-text">
                    <div class="top-card">
                      <h3>${escape(item.title)}</h3>
                      ${additionalHTML}
                      <p class="heart">${item.favourited ? '♥︎' : '♡'}</p>
                    </div>
                    <p>${item.timeago}</p>
                    <p>$${(item.price_cents / 100).toFixed(2)}</p>
                    <p>${escape(item.description)}</p>
                  </div>
                  <img src="${escape(item.image_url)}" alt="${escape(item.title)}">
                </a>
              </li>`
            );
            $('.main-feed').append(itemHTML);
          }
        });
        updateEmptyState();
      })

    })
    .catch(err => {
      console.log('Error loading items:', err);
    });

  }

  // Filter form submission
  $('#filter-form').on('submit', function(event) {
    event.preventDefault();
    const minPrice = Number($('#min-price').val()) || 0;
    const maxPrice = Number($('#max-price').val()) || 1000000;
    displayItems(minPrice, maxPrice);
  });

  // Load items on page load
  displayItems(0, 1000000);

  // event listener for click on heart icon

  $(document).on('click', '.heart', function(event) {
    const itemId = $(this).closest('li').data('id')
    console.log("itemId: ", itemId)
    event.stopPropagation();
    event.preventDefault();
    console.log("You clicked the heart!");
    if ($(this).hasClass('active')) {
      $(this).removeClass('active')
      $(this).text('♡')

    } else {
      $(this).addClass('active')
      $(this).text('♥︎')

      fetch('/api/addFavourite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemId: itemId
        })
      })

    }
  });


});

