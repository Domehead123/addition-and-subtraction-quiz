
Also, I wanted to create something that my other half might be able to use in her job as a primary school quiz.

## Installation

To use this it’s just one web page, one css file, plus two script files – the custom script and jquery 3.3.1 (you could of course link to that instead).

## Spec

This is a maths quiz for primary school students. Each time a user plays they are given ten random addition and subtraction questions. Before they start the can pick one of ten levels of difficulty, ranging from numbers 1-10 to 1-100.

The user has to pick the correct answer from four numbers, which are all of a near magnitude,

At the end they are given a score out of ten.

## Functionality

The numbers involved are generated randomly, based on the range that the users choose. Whether the operator is to be addition or subtraction is also randomly generated.

The first obvious problem is that on subtracting one number from another, you may get a negative number – something children at this level are unlikely to understand. So if the second random number is bigger than the first, the numbers have to be swapped.

After the result of adding or subtracting the numbers has been calculated, the number is pushed to an array. Three other numbers (within a range of five less to five more than this number) are then generated and pushed to this array. Each time the script checks that these numbers are not the same as one already in an array.

The array then has to be shuffled, to ensure that the correct answer is not always the first answer in the array. I googled how to shuffle array and ended up directly taking [this](https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array)

The array is then written to buttons on the page. If user clicks a button its colour changes and the guess is recorded. If they click ‘Answer’ without a guess they get an error message. If they click answer after making a guess the buttons change colour to green for “correct” or red for “incorrect”. The user is told if they got the question right or not, and what the correct result is. These colour changes and text changes are handled by jquery.

A counter keeps track of the number of question and the score of correct answers is also tallied. I had some issues with the score until I used the jquery off() on the answer button immediately after it was pressed.

## Frameworks used

The application uses jquery 3.3.1. It also uses Bootstrap 4.1.1, though just for the buttons. It also uses a couple of Google fonts.

## Testing 

During development I was constantly console logging all the variable to make sure they delivered the expected results. Variables were also changed to constants to make results were as expected. And then it was rigorous testing to make sure ever possible combination of button clicks still delivered the expected results and scores.

The responsiveness was tested using responinator.com
