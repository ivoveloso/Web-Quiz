
	  /**
  	 * Set the information about your questions here. The correct answer string needs to match
  	 * the correct choice exactly, as it does string matching. (case sensitive)
  	 *
  	 */

    var startEl = document.getElementById('start');
    var startbtnEl = document.getElementById('startbtn');
    var timerEl = document.getElementById('timer');
    var currentQuestion = 0;
    var score = 0;
    var askingQuestion = true;
	var checkEl = document.getElementById("check");
	var questionEl = document.getElementById('question');
	var wintime = 0;
	var winpct = 0;
    var quiz = [
        {
            "question"		: 	"Q1: Commonly used data types DO NOT include",
            "choices"		: 	[
                                    "strings",
                                    "booleans",
                                    "alerts",
                                    "numbers"
                                ],
            "correct"		: 	"alerts",
            "explanation"	: 	"Alerts are a method.",
            
        },
        {
            "question"		: 	"Q2: Arrays in JavaScript can be used to store ________",
            "choices"		: 	[
                                    "numbers and strings",
                                    "other arrays",
                                    "booleans",
                                    "all of the above"
                                ],
            "correct"		: 	"all of the above",
            "explanation"	: 	"Arrays is JavaScript can store all the above elements",
        },
        {
            "question"		: 	"Q3: String values must be enclosed within ______ when being assigned to variables",
            "choices"		: 	[
                                    "commas",
                                    "curly brackets",
                                    "quotes",
                                    "parenthesis"
                                ],
            "correct"		: 	"quotes",
            "explanation"	: 	"Quotes are required to show that the value is a string",
        },
		{
            "question"		: 	"Q4: A very useful tool used during development and debugging for printing content to the debugger is:",
            "choices"		: 	[
                                    "JavaScript",
                                    "terminal / bash",
                                    "for loops",
                                    "console.log"
                                ],
            "correct"		: 	"console.log",
            "explanation"	: 	"With console.log you can use console to log what is happening to your application.",
        },
		{
            "question"		: 	"Q5: The condition in an if / else statement is enclosed within ______.",
            "choices"		: 	[
                                    "commas",
                                    "curly brackets",
                                    "square brackets",
                                    "parenthesis"
                                ],
            "correct"		: 	"parenthesis",
            "explanation"	: 	"Parenthesis are the corect syntax",
        },

    ];

    var timerid;
    var timeleft = 100;

    function startquiz() {

        timerid = setInterval(timercallback, 1000);
        timerEl.textContent = `Time Left: 100 secs.`;
		checkEl.setAttribute('class', 'unhide');
		questionEl.textContent = "Question here"
        loadQuestion();
		startbtnEl.parentNode.removeChild(startbtnEl); //js requires you to delete elements from the parent

      }

      function timercallback() {
        timeleft--;
        timerEl.textContent = `Time Left: ${timeleft} secs.`;
        if (timeleft <= 0) {
            showFinalResults();
			clearInterval(timerid);
        }
      }



	function loadQuestion(){
			
			//set temporary variable for creating radio buttons
			var radioButton;
			
			//clear out radio buttons from previous question
			document.getElementById('content').innerHTML = "";
			
			//loop through choices, and create radio buttons
			for(var i=0; i < quiz[currentQuestion]["choices"].length; i++){
				
				radioButton  = document.createElement('input');
				radioButton.type = 'radio';
				radioButton.name = 'quiz';
				radioButton.id = 'choice'+ (i+1);
				radioButton.value = quiz[currentQuestion]["choices"][i];
				
				//create label tag, which hold the actual text of the choices
				var label = document.createElement('label');
				label.setAttribute('for','choice'+ (i+1));
				label.innerHTML = quiz[currentQuestion]["choices"][i];
				
				//create a <br> tag to separate options
				var br = document.createElement('br');
				
				//attach them to content. Attach br tag, then label, then radio button
				document.getElementById('content').insertBefore(br, null);
				document.getElementById('content').insertBefore(label, br);
				document.getElementById('content').insertBefore(radioButton, label);
			}
			
			//load the question
			document.getElementById('question').innerHTML = quiz[currentQuestion]["question"];
			
			//setup score for first time
			if(currentQuestion == 0){
				document.getElementById('score').innerHTML = '<p>score: 0 right answers out of ' + quiz.length +' possible</p>';
			}
		}
		
		function checkAnswer(){
			
			//are we asking a question, or proceeding to next question?
			if(askingQuestion){
				
				//change button text to next question, so next time they click it, it goes to next question
				document.getElementById('check').innerHTML = 'Next Question';
				askingQuestion = false;
				
				//determine which radio button they clicked
				var userpick;
				var correctIndex;
				var radios = document.getElementsByName('quiz');
				for(var i=0; i < radios.length; i++){
					if(radios[i].checked){ //if this radio button is checked
						userpick = radios[i].value;
					}
					//get index of correct answer
					if(radios[i].value == quiz[currentQuestion]["correct"]){
						correctIndex = i;
					}
				}
				
				//set the color if they got it right, or wrong
				if(userpick == quiz[currentQuestion]["correct"]){
					score++;
					document.getElementsByTagName('label')[correctIndex].style.color = "green";
					document.getElementsByTagName('label')[correctIndex].style.fontWeight = "bold";
					document.getElementById('explanation').innerHTML = "<h3>Correct!</h3>";
				} else {
                    timeleft -= 10;
                    timerEl.textContent = `Time Left: ${timeleft} secs.`;
					document.getElementsByTagName('label')[correctIndex].style.color = "red";
					document.getElementsByTagName('label')[correctIndex].style.fontWeight = "bold";
					document.getElementById('explanation').innerHTML = "<h3>Incorrect</h3>";
				}
				
				document.getElementById('explanation').innerHTML += '<p>' + quiz[currentQuestion]["explanation"] + '</p>';
				document.getElementById('score').innerHTML = '<p>score: '+ score +' right answers out of ' + quiz.length +' possible</p>';
				
				
			} else { //reset form and move to next question

				//setting up so user can ask a question
				askingQuestion = true;
				
				//change button text back to 'submit answer'
				document.getElementById('check').innerHTML = 'Submit Answer';
				
				document.getElementById('explanation').innerHTML = "";
				
				//if we're not on last question, increase question number
				if(currentQuestion < quiz.length - 1){
					currentQuestion++;
					loadQuestion();		
				} else {
					showFinalResults();
				}

			}
		}
		
		function showFinalResults(){
			
			clearInterval(timerid);
			var winpct = Math.round(score/quiz.length * 100);
			document.getElementById('content').innerHTML = '<h2>You Completed The Quiz! Congratulations!</h2>';
			document.getElementById('content').innerHTML += '<p>Below are your results:</p>';
			document.getElementById('content').innerHTML += '<h2>' + score + ' out of ' + quiz.length + ' questions, ' + winpct + '%</h2>';
			document.getElementById('content').innerHTML += '<h2> Your time left is ' + timeleft + ' seconds.</h2>';
			localStorage.setItem("wintimer", timeleft);
			localStorage.setItem("winpctr", winpct);

			//delete the button
			var button = document.getElementById('check');
			button.parentNode.removeChild(button); //js requires you to delete elements from the parent
			
			//remove question
			document.getElementById('question').innerHTML = "";
			
		}