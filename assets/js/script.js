$( document ).ready(function() {
    
    var upperLimit ="";
    var difficulty= "";
    
    //determines range of numbers
    $(".btn-info").click(function(){
        $(".btn-info").removeClass("active");
        $(this).addClass("active");
        upperLimit = $(this).text();
        upperLimit = parseInt(upperLimit.substring(2, upperLimit.length));
    });
    
     //determines level of difficulty
      $(".btn-secondary").click(function(){
        $(".btn-secondary").removeClass("active");
        $(this).addClass("active");
        difficulty = $(this).text();
    });
    
    
           $(".btn-success").click(function() {
        if (upperLimit==="" && difficulty==="") {
            $("#error-alert").html('<p><span class="smiley">&#9787;</span> Please choose a range of numbers and a level of difficulty.</p>');
            console.log("yes");
        }
        else if (upperLimit==="" && difficulty.length>0) {
        $("#error-alert").html('<p><span class="smiley">&#9787;</span> Please choose a range of numbers.</p>');
        }
        else if (upperLimit != isNaN() && difficulty==="") {
        $("#error-alert").html('<p><span class="smiley">&#9787;</span> Please choose a level of difficulty.</p>');
        }
        else {
        $("#selection-box").fadeOut(1000);
        }
           });

        
    
    
    
});