$(document).ready(function() {

    var counter = 0;
    var score = 0;
    var upperLimit = "";

    //determines range of numbers
    $(".btn-info").click(function() {
        $(".btn-info").removeClass("active");
        $(this).addClass("active");
        upperLimit = $(this).text();
        upperLimit = parseInt(upperLimit.substring(2, upperLimit.length));
    });

    //error message if nothing selected - otherwise run quiz   
    $(".start").click(function() {

        if (upperLimit === "") {
            $(".error-alert").html('<p><span class="smiley">&#9787;</span> Please choose a range of numbers.</p>');
        }

        else {
            $(".start-box").addClass("hidden");
            $(".selection-box").addClass("hidden");
            runQuiz();
        }

        //runs quiz again if next button clicked
        $(".next").click(function() {
            runQuiz();
        });

        //reloads page if restart button clicked
        $(".restart").click(function() {
            location.reload();
        });
    });

    // runs the quiz    
    function runQuiz() {

        //sets or resets variables
        counter++;
        var firstNumber = createRandom(1, upperLimit);
        var secondNumber = createRandom(1, upperLimit);
        var sign;
        var guess;
        var plusOrMinus = createRandom(0, 1);

        //performs addition or subtraction
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

        //pushes the result to an array of answers;
        var multipleChoice = [result];

        //runs function to get multiple choice options
        createMultipleChoice(result, multipleChoice);

        //writes question and multiple choices to page 
        $(".question-box").removeClass("hidden").addClass("unhidden");
        $(".question-box").html('<h2>' + firstNumber + sign + secondNumber + ' = ?</h2><div class="button-row"><button type="button" class="btn btn-info number" id="0">' + multipleChoice[0] + '</button><button type="button" class="btn btn-info number" id="1">' + multipleChoice[1] + '</button> <button type="button" class="btn btn-info number" id="2">' + multipleChoice[2] + '</button><button type="button" class="btn btn-info number" id="3">' + multipleChoice[3] + '</button></div><div class="button-row"><div class=error-alert></div></div>')
        $(".answer-box").removeClass("hidden").addClass("unhidden");
        $(".next-box").removeClass("unhidden").addClass("hidden");

        //determines user's guess 
        $(".btn-info").click(function() {
            $(".btn-info").removeClass("active");
            $(".btn-info").removeClass("guess");
            $(this).addClass("active");
            $(this).addClass("guess");
            guess = parseInt($('#' + i).text());

        });

        //actions when answer button is clicked    
        $(".answer").click(function() {


            //checks if guess has been made 
            if ($('#0').hasClass("guess") || $('#1').hasClass("guess") || $('#2').hasClass("guess") || $('#3').hasClass("guess")) {

                //disables buttons and changes page
                $(".answer").off("click");
                $(".btn-info").off("click")
                $(".btn-info").removeClass("active").removeClass("correct").removeClass("incorrect");
                $(".error-alert").empty();
                $(".answer-box").removeClass("unhidden").addClass("hidden");

                //checks if counter has reached 10. If so, add restart button rather than next button
                if (counter == 10) {
                    $(".restart-box").removeClass("hidden").addClass("unhidden");
                }
                else {
                    $(".next-box").removeClass("hidden").addClass("unhidden");
                }

                //loops through options and changes their colour based on whether they are correct or not
                for (i = 0; i < 4; i++) {

                    if (parseInt($('#' + i).text()) == result) {
                        $('#' + i).addClass("correct");
                    }
                    else {
                        $('#' + i).addClass("incorrect");
                    }

                }

                //tells user if answer is correct or not
                guess = parseInt($(".guess").text());
                if (guess == result) {
                    $("h2").text('That\'s right! ' + firstNumber + sign + secondNumber + ' = ' + result);
                    //calculates score
                    score++;
                }
                else {
                    $("h2").text('That\'s wrong. ' + firstNumber + sign + secondNumber + ' = ' + result);
                }

                //gives score if counter has reached 10
                if (counter == 10) {
                    $("h2").append('<br /><span>You scored ' + score + ' out of 10');
                }

                //fix to stop buttons changing colour after answer has been given
                $(".btn-info").mouseenter(function() {

                    if (parseInt($(this).text()) == result) {
                        $(".btn-info:hover").css({ "background-color": "#1e7e34", "border-color": "#1e7e34" });
                    }
                    else {
                        $(".btn-info:hover").css({ "background-color": "red", "border-color": "red" })
                    }

                });
            }

            //if no answer is selected
            else {
                $(".error-alert").html('<p><span class="smiley">&#9787;</span> Please choose an answer.</p>');
                $(this).on("click");
            }

        });

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

    //shuffles array so correct answer mot always in same position
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
    
    function addTwoNumbers(d,f){
    return d + f;
}
   
});
