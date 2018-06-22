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
        }
        else if (upperLimit==="" && difficulty.length>0) {
        $("#error-alert").html('<p><span class="smiley">&#9787;</span> Please choose a range of numbers.</p>');
        }
        else if (upperLimit != isNaN() && difficulty==="") {
        $("#error-alert").html('<p><span class="smiley">&#9787;</span> Please choose a level of difficulty.</p>');
        }
        else {
        $("#selection-box").fadeOut(1000,runQuiz())
        }
           });
           
       // runs the quiz    
        function runQuiz(){
            var firstNumber = createRandom(1, upperLimit);
            var secondNumber = createRandom(1, upperLimit);
            var plusOrMinus = createRandom(0, 1);
            if (plusOrMinus == 0) {
                performAddition(firstNumber, secondNumber);
            }
            else {
                performSubtraction(firstNumber, secondNumber);
            }
            console.log (firstNumber, secondNumber, plusOrMinus, result);
            
            var multipleChoice=[result];
            
            createMultipleChoice(result,multipleChoice);
           
             $("#question-box").hide().html('<div class="button-row"><button type="button" class="btn btn-info" id="number">' + multipleChoice[0] +'</button><button type="button" class="btn btn-info" id="number">' + multipleChoice[1] + '</button> <button type="button" class="btn btn-info" id="number">' + multipleChoice[2] + '</button><button type="button" class="btn btn-info" id="number">' + multipleChoice[3] + '</button></div><div class="button-row"><button type="button" class="btn btn-success"id="answer">Answer</button></div>').delay(1000).fadeIn(1000);
         
             $(".btn-info").click(function(){
        $(".btn-info").removeClass("active");
        $(this).addClass("active");
    });
            

        }
        
        //add two numbers and returns result
        function performAddition(firstNumber,secondNumber){
            result = firstNumber + secondNumber;
            return result;
        }
        
        //takes smaller number form larger number and returns result
        function performSubtraction(firstNumber,secondNumber){
            if (firstNumber >= secondNumber) {
                result = firstNumber - secondNumber;
                return result;
            }
            else {
                //swaps numbers if second one is bigger to prevent negative numbets
                var thirdNumber = firstNumber;
                firstNumber = secondNumber;
                secondNumber = thirdNumber;
                result = firstNumber - secondNumber;
                return result, firstNumber, secondNumber;
            }
            
        }
        
        
        
        function createMultipleChoice(result, multipleChoice){
            console.log (multipleChoice);
             //determines range for multiple choice options, preventing negative numbers
            
            var rangeBottom;
            var rangeTop;
            
            if (result<5){
                rangeBottom = 0;
                rangeTop = 10;
            }
            else {
                rangeBottom = result-5;
                rangeTop = result +5;
            }
            //fills array with multiple choice options, checking for duplicates
            var  duplicate=false;
            while (multipleChoice.length<4){
                var nearNumber = createRandom(rangeBottom,rangeTop);
                for (i=0;i<multipleChoice.length; i++){
                    if (nearNumber==multipleChoice[i]){
                        duplicate=true;
                    }
                }
                
                if (duplicate==false){
                multipleChoice.push(nearNumber);
                }
                
                else{
                    duplicate = false;
                }
                
            }
          
           
           
         
            
        }
        
        //generates random numbers
        function createRandom(min, max) {
            return Math.floor(Math.random() * (max - min + 1) ) + min;
        }
        
        
        function shuffleArray(array) {
            var currentIndex = array.length, temporaryValue, randomIndex;
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