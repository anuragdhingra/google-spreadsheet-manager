
var request;

$("#heyyou").submit(function(event){
    if (request) {
        request.abort();
    }
    var $form = $(this);
    var $inputs = $form.find("input, select, button, textarea");
    var serializedData = $form.serialize();
    console.log(serializedData);
    $inputs.prop("disabled", true);

    
    request = $.ajax({
        url: "https://script.google.com/macros/s/AKfycbxLmJIdx8eD7URy1CsSgk0MZumUXG1yIJkhzj_r4p4tEuC-_L7B/exec",
        type: "post",
        data: serializedData
    });


    request.done(function (response, textStatus, jqXHR){
        console.log("OKOKOKOK");
        console.log(response);
        console.log(textStatus);
        console.log(jqXHR);
    });

    request.fail(function (jqXHR, textStatus, errorThrown){
        
        console.error(
            "The following error occurred: "+
            textStatus, errorThrown
        );
    });

    request.always(function () {
        $inputs.prop("disabled", false);
    });

    event.preventDefault();
});
