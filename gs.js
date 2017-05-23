
var request1;
var request2;

$("#heyyou").submit(function(event){
    if (request1) {
        request1.abort();
    }
    var $form = $(this);
    var $inputs = $form.find("input, select, button, textarea");
    var serializedData = $form.serialize();
    console.log(serializedData);
    $inputs.prop("disabled", true);


    request1 = $.ajax({
        url: "https://script.google.com/macros/s/AKfycbwI5Y0SzfdoWyTy-ud6KLSszV_4R3OxUJ8-kvXCCzleyZscKNgc/exec",
        type: "post",
        data: serializedData
    });


    request1.done(function (response, textStatus, jqXHR){
        console.log("OKOKOKOK");
        console.log(response);  
        console.log(textStatus);
        console.log(jqXHR);
    });

    request1.fail(function (jqXHR, textStatus, errorThrown){
        
        console.error(
            "The following error occurred: "+
            textStatus, errorThrown
        );
    });

    request1.always(function () {
        $inputs.prop("disabled", false);
    });

    event.preventDefault();
});


$("#edit_hours").submit(function(event){
    if (request2) {
        request2.abort();
    }
    var $form = $(this);
    var $inputs = $form.find("input, select, button");
    var serializedData = $form.serialize();
    console.log(serializedData);
    $inputs.prop("disabled", true);


    request2 = $.ajax({
        url: "https://script.google.com/macros/s/AKfycbwI5Y0SzfdoWyTy-ud6KLSszV_4R3OxUJ8-kvXCCzleyZscKNgc/exec",
        type: "post",
        data: serializedData
    });


    request2.done(function (response, textStatus, jqXHR){
        console.log("OKOKOKOK");
        console.log(response);
        console.log(textStatus);
        console.log(jqXHR);
    });

    request2.fail(function (jqXHR, textStatus, errorThrown){
        
        console.error(
            "The following error occurred in your code : "+
            textStatus, errorThrown
        );
    });

    request2.always(function () {
        $inputs.prop("disabled", false);
    });

    event.preventDefault();
});

