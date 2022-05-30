$(document).on('click', '#entry', function() {
    // Hide entry button and show form
    $("#entry").addClass("hide");
    $("#entryForm").removeClass("hide");
});

// When entry form is submitted sort the headers and send the password
$(document).on('submit', '#entryForm', function(e) {
    e.preventDefault();

    var form = $("#entryForm");
    var actionUrl = form.attr('action');
    
    var data = form.serializeArray().reduce((obj, item) => Object.assign(obj, { [item.name]: item.value }), {});

    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(settings.type)) {
                xhr.setRequestHeader("X-CSRFToken", data['csrf_token'])
            }
        }
    })

    $.ajax({
        type: "POST",
        url: actionUrl,
        contentType: "application/json",
        data: JSON.stringify({'password': data['password']}),
        success: function(obj){
            // If login fails - run shake animation.
            if (obj.login=== 'fail') {
                $("#entryFormError").removeClass("invisible");
                $("#password").addClass("animation-shake");
                $("#cant_park_there").trigger("play");
                setTimeout(function() {
                    $("#password").removeClass("animation-shake");
                  }, 500);
            }
            else {
                location.reload();
            }
        }
    });
});

// If logging out - log the user out
$(document).on('submit', '#logoutForm', function(e) {
    e.preventDefault();

    var form = $("#logoutForm");
    var actionUrl = form.attr('action');
    
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(settings.type)) {
                xhr.setRequestHeader("X-CSRFToken", data['csrf_token'])
            }
        }
    })

    $.ajax({
        type: "GET",
        url: actionUrl,
        success: function(obj){
            if (obj.logout=== 'success') {
                location.reload();
            }
        }
    });
});

$(document).on('click', '#hiddenMessageYes', function() {
    $("#message").addClass("hide");
    $("#hiddenMessage").removeClass("hide");
    $("#hiddenMessage").trigger("play")
});

$(document).on('click', '#hiddenMessageNo', function() {
    console.log("I'm not ready yet!");
});

$(document).on('click', '#playVideoYes', function() {
    $("#message").addClass("hide");
    $("#video").removeClass("hide");
    $("#video").trigger("play")
});

$(document).on('click', '#playVideoNo', function() {
    $("#noSound").attr("currentTime", 0.5)
    $("#noSound").trigger("play")
});
