// Client facing scripts here
$(document).ready(function() {

    $(document).on('click', '.arrow', function() {
        // Toggle the "active" class on the clicked element
        $(this).toggleClass('active');
        $(".nav-button-container").slideToggle('slow')
    });

  
  
  });
  