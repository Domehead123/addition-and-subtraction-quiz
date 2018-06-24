$(document).ready(function() {

    var upperLimit = "";
    var difficulty = "";

    //determines range of numbers
    $(".btn-info").click(function() {
        $(".btn-info").removeClass("active");
        $(this).addClass("active");
        upperLimit = $(this).text();
        upperLimit = parseInt(upperLimit.substring(2, upperLimit.length));
    });

    //determines level of difficulty
    $(".btn-secondary").click(function() {
        $(".btn-secondary").removeClass("active");
        $(this).addClass("active");
        difficulty = $(this).text();
    });

    //error messages if nothing selected - otherwise run quiz   
    $(".btn-success").click(function() {
        if (upperLimit === "" && difficulty === "") {
            $(".error-alert").html('<p><span class="smiley">&#9787;</span> Please choose a range of numbers and a level of difficulty.</p>');
        }
        else if (upperLimit === "" && difficulty.length > 0) {
            $(".error-alert").html('<p><span class="smiley">&#9787;</span> Please choose a range of numbers.</p>');
        }
        else if (upperLimit != isNaN() && difficulty === "") {
            $(".error-alert").html('<p><span class="smiley">&#9787;</span> Please choose a level of difficulty.</p>');
        }
        else {
            $("#selection-box").fadeOut(1000, runQuiz())
        }
    });

    // runs the quiz    
    function runQuiz() {
        var counter=1;
        if (counter < 11) {
            var firstNumber = createRandom(1, upperLimit);
            var secondNumber = createRandom(1, upperLimit);
            var sign;
            var guess = 300;
            var plusOrMinus = createRandom(0, 1);
            if (plusOrMinus == 0) {
                sign = " + ";
            var result = firstNumber + secondNumber;
            }
            else {
                sign = " - ";
                if (secondNumber > firstNumber) {
                    //swaps numbers if second one bigger, to avoid minus numbers    
                    var thirdNumber = firstNumber;
                    firstNumber = secondNumber;
                    secondNumber = thirdNumber;
                }
                result = firstNumber - secondNumber;
            }


            var multipleChoice = [result];

            createMultipleChoice(result, multipleChoice);

            $("#question-box").hide().html('<h2>' + firstNumber + sign + secondNumber + ' = ?</h2><div class="button-row"><button type="button" class="btn btn-info number" id="0">' + multipleChoice[0] + '</button><button type="button" class="btn btn-info number" id="1">' + multipleChoice[1] + '</button> <button type="button" class="btn btn-info number" id="2">' + multipleChoice[2] + '</button><button type="button" class="btn btn-info number" id="3">' + multipleChoice[3] + '</button></div><div class="button-row"><div class=error-alert></div><button type="button" class="btn btn-success "id="answer">Answer</button></div>').delay(1000).fadeIn(1000);

            $(".btn-info").click(function() {
                $(".btn-info").removeClass("active");
                $(".btn-info").removeClass("guess");
                $(this).addClass("active");
                $(this).addClass("guess");
                guess = parseInt($('#' + i).text());

            });

            //actions when answer button is clicked    
            $("#answer").click(function() {

                //checks if guess has been made - if not then error message
                if (guess == 300) {
                    $(".error-alert").html('<p><span class="smiley">&#9787;</span> Please choose an answer.</p>');
                }

                //changes multiple choice options to green (correct) or red (incorrect)

                else {
                    $(".error-alert").empty();
                    $(".btn-success").removeAttr("id");
                    $(".btn-success").attr("id", "next");
                    $(".btn-success").text("Next >");


                    for (i = 0; i < 4; i++) {
                        if (parseInt($('#' + i).text()) == result) {
                            $('#' + i).addClass("correct");

                        }
                        else {
                            $('#' + i).addClass("incorrect");
                        }
                    }

                    //tells user if answer is correct or not
                    if (parseInt($(".guess").text()) == result) {
                        $("h2").text('That\'s right! ' + firstNumber + sign + secondNumber + ' = ' + result);
                    }

                    else {
                        $("h2").text('That\'s wrong. ' + firstNumber + sign + secondNumber + ' = ' + result);
                    }


                    //fix to stop buttonc changing colour after answer has been given
                    $(".btn-info").click(function() {
                        if (parseInt($(this).text()) == result) {
                            $(".btn-info:not(:disabled):not(.disabled).active").css({ "background-color": "#1e7e34", "border-color": "#1e7e34" });
                        }
                        else {
                            $(".btn-info:not(:disabled):not(.disabled).active").css({ "background-color": "red", "border-color": "red" });
                        }

                    });

                    $(".btn-info").mouseenter(function() {

                        if (parseInt($(this).text()) == result) {
                            $(".btn-info:hover").css({ "background-color": "#1e7e34", "border-color": "#1e7e34" });
                        }
                        else {
                            $(".btn-info:hover").css({ "background-color": "red", "border-color": "red" })
                        }
                    });
                    
                     $("#next").click(function(){
                         counter++
                         
                     });




                }

            });

        }
    }



    function createMultipleChoice(result, multipleChoice) {
        //determines range for multiple choice options, preventing negative numbers

        var rangeBottom;
        var rangeTop;

        if (result < 5) {
            rangeBottom = 0;
            rangeTop = 10;
        }
        else {
            rangeBottom = result - 5;
            rangeTop = result + 5;
        }
        //fills array with multiple choice options, checking for duplicates
        var duplicate = false;
        while (multipleChoice.length < 4) {
            var nearNumber = createRandom(rangeBottom, rangeTop);
            for (i = 0; i < multipleChoice.length; i++) {
                if (nearNumber == multipleChoice[i]) {
                    duplicate = true;
                }
            }

            if (duplicate == false) {
                multipleChoice.push(nearNumber);
            }

            else {
                duplicate = false;
            }

            shuffleArray(multipleChoice);

        }





    }

    //generates random numbers
    function createRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    //shuffkes array so correct answer mot always in same position
    function shuffleArray(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

});
