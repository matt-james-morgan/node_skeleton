const { getAllItems } = require("../../db/database");

// $(document).ready(function() {

//   const loadItems = function() {
//     const allItems = [];
//     getAllItems()
//       .then(items => {
//         items.forEach(function(item) {
//           allItems.push(item);
//         })
//       })

//     console.log(allItems);
//   }

// });

const loadItems = function() {
  const allItems = [];
  getAllItems()
    .then(items => {
      items.forEach(function(item) {
        allItems.push(item);
      })
    })

  console.log(allItems);
}

loadItems();
