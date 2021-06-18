// define the time limit 
let TIME_LIMIT = 60; 
  
// define quotes to be used 
let quotes_array = [ 
  "Proofreader applicants are tested primarily on their spelling, speed, and skill in finding errors in the sample text. Toward that end, they may be given a list of ten or twenty classically difficult words and a proofreading test, both tightly timed. The proofreading test will often have a maximum number of errors per quantity of text and a minimum amount of time to find them. The goal of this approach is to identify those with the best skill set.", 
  "Hunt and peck (two-fingered typing), also known as Eagle Finger, is a common form of typing in which the typist presses each key individually. Instead of relying on the memorized position of keys, the typist must find each key by sight. Use of this method may also prevent the typist from being able to see what has been typed without glancing away from the keys. Although good accuracy may be achieved, any typing errors that are made may not be noticed immediately due to the user not looking at the screen. There is also the disadvantage that because fewer fingers are used, those that are used are forced to move a much greater distance.", 
  "When we talk about motivating others, the justification is the end result (either we want to avoid the pain or go towards pleasure) or what we want to get the person to do. How we achieve the end result, are our alternatives. As a manager, we need to understand the other person's justification and then come up with alternatives. We may then choose the right alternative. However, in general, we choose the first or the emotionally satisfying one. Typically people stop at this level of analysis and start to act. But a good manager would think of the following also: Will the action guarantee the consequence? What about other unintended consequences? This requires a certain experience. Are we capable of doing this action? Intention and the selection of the most ideal alternative do not guarantee execution, if we do not have the skills and the experience. Most motivational tactics fail, because without execution capability, they is only wishful thinking.", 
  "Some people combine touch typing and hunt and peck by using a buffering method. In the buffer method, the typist looks at the source copy, mentally stores one or several sentences, then looks at the keyboard and types out the buffer of sentences. This eliminates frequent up and down motions with the head and is used in typing competitions in which the typist is not well versed in touch typing. Not normally used in day-to-day contact with keyboards, this buffer method is used only when time is of the essence. (Wikipedia)", 
  "Some people combine touch typing and hunt and peck by using a buffering method. In the buffer method, the typist looks at the source copy, mentally stores one or several sentences, then looks at the keyboard and types out the buffer of sentences. This eliminates frequent up and down motions with the head and is used in typing competitions in which the typist is not well versed in touch typing. Not normally used in day-to-day contact with keyboards, this buffer method is used only when time is of the essence. (Wikipedia)", 
  "A data entry clerk is a member of staff employed to enter or update data into a computer system. Data is often entered into a computer from paper documents using a keyboard. The keyboards used can often have special keys and multiple colors to help in the task and speed up the work. Proper ergonomics at the workstation is a common topic considered. The Data Entry Clerk may also use a mouse, and a manually-fed scanner may be involved. Speed and accuracy, not necessarily in that order, are the key measures of the job; it is possible to do this job from home."
]; 
  
// selecting required elements 
let timer_text = document.querySelector(".curr_time"); 
let accuracy_text = document.querySelector(".curr_accuracy"); 
let error_text = document.querySelector(".curr_errors"); 
let cpm_text = document.querySelector(".curr_cpm"); 
let wpm_text = document.querySelector(".curr_wpm"); 
let quote_text = document.querySelector(".quote"); 
let input_area = document.querySelector(".input_area"); 
let restart_btn = document.querySelector(".restart_btn"); 
let cpm_group = document.querySelector(".cpm"); 
let wpm_group = document.querySelector(".wpm"); 
let error_group = document.querySelector(".errors"); 
let accuracy_group = document.querySelector(".accuracy"); 
  
let timeLeft = TIME_LIMIT; 
let timeElapsed = 0; 
let total_errors = 0; 
let errors = 0; 
let accuracy = 0; 
let characterTyped = 0; 
let current_quote = ""; 
let quoteNo = 0; 
let timer = null;
var email = $_SESSION["user"];


function updateQuote() { 
  quote_text.textContent = null; 
  current_quote = quotes_array[quoteNo]; 
  
  // separate each character and make an element  
  // out of each of them to individually style them 
  current_quote.split('').forEach(char => { 
    const charSpan = document.createElement('span') 
    charSpan.innerText = char 
    quote_text.appendChild(charSpan) 
  }) 
  
  // roll over to the first quote 
  if (quoteNo < quotes_array.length - 1) 
    quoteNo++; 
  else
    quoteNo = 0; 
} 

function processCurrentText() { 
  
  // get current input text and split it 
  curr_input = input_area.value; 
  curr_input_array = curr_input.split(''); 
  
  // increment total characters typed 
  characterTyped++; 
  
  errors = 0; 
  
  quoteSpanArray = quote_text.querySelectorAll('span'); 
  quoteSpanArray.forEach((char, index) => { 
    let typedChar = curr_input_array[index] 
  
    // character not currently typed 
    if (typedChar == null) { 
      char.classList.remove('correct_char'); 
      char.classList.remove('incorrect_char'); 
  
      // correct character 
    } else if (typedChar === char.innerText) { 
      char.classList.add('correct_char'); 
      char.classList.remove('incorrect_char'); 
  
      // incorrect character 
    } else { 
      char.classList.add('incorrect_char'); 
      char.classList.remove('correct_char'); 
  
      // increment number of errors 
      errors++; 
    } 
  }); 
  
  // display the number of errors 
  error_text.textContent = total_errors + errors; 
  
  // update accuracy text 
  let correctCharacters = (characterTyped - (total_errors + errors)); 
  let accuracyVal = ((correctCharacters / characterTyped) * 100); 
  accuracy_text.textContent = Math.round(accuracyVal); 
  
  // if current text is completely typed 
  // irrespective of errors 
  if (curr_input.length == current_quote.length) { 
    updateQuote(); 
  
    // update total errors 
    total_errors += errors; 
  
    // clear the input area 
    input_area.value = ""; 
  } 
} 

function startGame() { 
  
  resetValues(); 
  updateQuote(); 
  
  // clear old and start a new timer 
  clearInterval(timer); 
  timer = setInterval(updateTimer, 1000); 
} 
  
function resetValues() { 
  timeLeft = TIME_LIMIT; 
  timeElapsed = 0; 
  errors = 0; 
  total_errors = 0; 
  accuracy = 0; 
  characterTyped = 0; 
  quoteNo = 0; 
  input_area.disabled = false; 
  
  input_area.value = ""; 
  quote_text.textContent = 'Click on the area below to start the game.'; 
  accuracy_text.textContent = 100; 
  timer_text.textContent = timeLeft + 's'; 
  error_text.textContent = 0; 
  restart_btn.style.display = "none"; 
  cpm_group.style.display = "none"; 
  wpm_group.style.display = "none"; 
} 

function updateTimer() { 
  if (timeLeft > 0) { 
    // decrease the current time left 
    timeLeft--; 
  
    // increase the time elapsed 
    timeElapsed++; 
  
    // update the timer text 
    timer_text.textContent = timeLeft + "s"; 
  } 
  else { 
    // finish the game 
    finishGame(); 
  } 
}

function finishGame() { 
  // stop the timer 
  clearInterval(timer); 
  
  // disable the input area 
  input_area.disabled = true; 
  
  // show finishing text 
  quote_text.textContent = "Click on restart to start a new game."; 
  
  // display restart button 
  restart_btn.style.display = "block"; 
  
  // calculate cpm and wpm 
  cpm = Math.round(((characterTyped / timeElapsed) * 60)); 
  wpm = Math.round(((((characterTyped / 5)-errors) / timeElapsed) * 60)); 
  
  // update cpm and wpm text 
  cpm_text.textContent = cpm; 
  wpm_text.textContent = wpm; 
  
  // display the cpm and wpm 
  cpm_group.style.display = "block"; 
  wpm_group.style.display = "block"; 
  
  
  var d = new Date().toLocaleDateString();
  var t= new Date().toLocaleTimeString();
  

  
} 

