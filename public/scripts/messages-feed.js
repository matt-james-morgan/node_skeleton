$(() => {

  // Prevent XSS input
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // get all messages that relate to a particular user

  fetch('/messages')
  .then(res => {
    console.log(res);
  })
})
