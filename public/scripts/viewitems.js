$(document).ready(function() {

  // event listener for click on heart icon

  $(document).on('submit', '.heart', function(event) {
    // event.stopPropagation();
    // event.preventDefault();

    if ($(this).hasClass('active')) {
      $(this).removeClass('active')
      $(this).text('♡')

    } else {
      $(this).addClass('active')
      $(this).text('♥︎')

    }
  });


});
