function toggleForm() {
    // Get the checkbox
    var checkBox = document.getElementById("contactformcheck");
    // Get the output text
    var text = document.getElementById("contactForm");
  
    // If the checkbox is checked, display the output text
    if (checkBox.checked == true){
      text.style.display = "block";
    } else {
      text.style.display = "none";
    }
}

// Event-Listener für das Formular
$('#contactForm').on('submit', function(event) {
    event.preventDefault();

    var searchButton = document.getElementById('search-button');
    if (searchButton) {
        searchButton.setAttribute('disabled', 'true');
    }
  
    $.ajax({
      url: $(this).attr('action'),
      type: 'POST',
      data: $(this).serialize(),
      success: function(response) {
        // Annahme: Die Antwort enthält die ID im JSON-Format
        var messageId = response.id;
  
        // Erfolgsmeldung
        $('#success').html("<div class='alert alert-danger'>");
        $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>")
          .append("</button>");
        $('#success > .alert-danger')
          .append("<strong>Ihre Nachricht wurde gesendet. Vorgangsnummer: " + messageId + "</strong>");
        $('#success > .alert-danger')
          .append('</div>');
  
        // Alle Felder zurücksetzen
        $('#contactForm').trigger("reset");
      },
      error: function() {
        // Fehlermeldung
        $('#success').html("<div class='alert alert-danger'>");
        $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>")
          .append("</button>");
        $('#success > .alert-danger').append("<strong>Entschuldigung, es scheint, dass mein Mailserver nicht reagiert. Bitte versuchen Sie es später erneut!</strong>");
        $('#success > .alert-danger').append('</div>');
  
        if (searchButton) {
            searchButton.removeAttribute('disabled');
        }
      }
    });
  });
  