---
layout: base
permalink: /JSCalculator
title: JS Calculator
---

<style>
  .button {
    width: auto;
    height: auto;
    border-radius: 10px;
    background-color: #21807c;
    border: 3px solid black;
    font-size: 1.5em;

    display: flex;
    justify-content: center;
    align-items: center;

    grid-column: span 1;
    grid-row: span 1;
    
    transition: all 0.5s; 
  }

   /* darkens the background color on hover to create a selecting effect */
  .button:hover {
    background-color: #373737;
  }

  /* "row style" is flexible size and aligns pictures in center */
  .row {
    align-items: center;
    display: flex;
  }

  /* "column style" is one-third of the width with padding */
  .column {
    flex: 16.66%;
    padding: 3px;
  }
  /* class to create the calculator's container; uses CSS grid dsiplay to partition off buttons */
  .calculator-container { 
    width: 90vw; /* this width and height is specified for mobile devices by default */
    height: 80vh;
    margin: 0 auto;
  
    display: grid;
    grid-template-columns: repeat(4, 1fr); /* fr is a special unit; learn more here: https://css-tricks.com/introduction-fr-css-unit/  */
    grid-template-rows: 0.5fr repeat(4, 1fr);
    gap: 10px 10px;
  }
  
  @media (min-width: 600px) { 
    .calculator-container {
        width: 40vw;
        height: 80vh;
    }
  }
  
  /* styling for the calculator clear button */
  .calculator-clear {
    background-color: #e68b1c;
  }
  
  /* styling for the calculator equals button */
  .calculator-equals {
    background-color: #e70f0f;
  }
  .calculator-output {
    /* calulator output 
      top bar shows the results of the calculator;
      result to take up the entirety of the first row;
      span defines 4 columns and 1 row
    */
    grid-column: span 4;
    grid-row: span 1;
  
    border-radius: 10px;
    padding: 0.25em;
    font-size: 20px;
    border: 5px solid black;
  
    display: flex;
    align-items: center;
    justify-content: flex-end; /* Right-justify the content */
  }
</style>

<div>
  <div class="calculator-container">
      <!--result-->
      <div class="calculator-output" id="output">0</div>
      <!--row 1-->
      <div class="calculator-number button">1</div>
      <div class="calculator-number button">2</div>
      <div class="calculator-number button">3</div>
      <div class="calculator-operation button">+</div>
      <!--row 2-->
      <div class="calculator-number button">4</div>
      <div class="calculator-number button">5</div>
      <div class="calculator-number button">6</div>
      <div class="calculator-operation button">-</div>
      <!--row 3-->
      <div class="calculator-number button">7</div>
      <div class="calculator-number button">8</div>
      <div class="calculator-number button">9</div>
      <div class="calculator-operation button">*</div>
      <!--row 4-->
      <div class="calculator-operation button">SQRT</div>
      <div class="calculator-operation button">/</div>
      <!--row 5-->
      <div class="calculator-clear button">A/C</div>
      <div class="calculator-number button">0</div>
      <div class="calculator-number button">.</div>
      <div class="calculator-equals button">=</div>
  </div>
</div>

<!-- JavaScript (JS) implementation of the calculator. -->
<script>
// initialize important variables to manage calculations
var firstNumber = null;
var operator = null;
var nextReady = true;
// build objects containing key elements
const output = document.getElementById("output");
const numbers = document.querySelectorAll(".calculator-number");
const operations = document.querySelectorAll(".calculator-operation");
const clear = document.querySelectorAll(".calculator-clear");
const equals = document.querySelectorAll(".calculator-equals");

// Number buttons listener
numbers.forEach(button => {
  button.addEventListener("click", function() {
    number(button.textContent);
  });
});

// Number action
function number (value) { // function to input numbers into the calculator
    if (value != ".") {
        if (nextReady == true) { // nextReady is used to tell the computer when the user is going to input a completely new number
            output.innerHTML = value;
            if (value != "0") { // if statement to ensure that there are no multiple leading zeroes
                nextReady = false;
            }
        } else {
            output.innerHTML = output.innerHTML + value; // concatenation is used to add the numbers to the end of the input
        }
    } else { // special case for adding a decimal; can't have two decimals
        if (output.innerHTML.indexOf(".") == -1) {
            output.innerHTML = output.innerHTML + value;
            nextReady = false;
        }
    }
}

// Operation buttons listener
operations.forEach(button => {
  button.addEventListener("click", function() {
    operation(button.textContent);
  });
});

// Operator action
function operation (choice) { // function to input operations into the calculator
    if ((firstNumber == null) && (choice != "SQRT")) { // once the operation is chosen, the displayed number is stored into the variable firstNumber
        firstNumber = parseFloat(output.innerHTML);
        nextReady = true;
        operator = choice;
        return; // exits function
    }
    if(choice == "SQRT"){
      operator = choice;
      firstNumber = "0";
    }
    // occurs if there is already a number stored in the calculator
    firstNumber = calculate(firstNumber, parseFloat(output.innerHTML)); 
    operator = choice;
    output.innerHTML = firstNumber.toString();
    nextReady = true;
}

// Calculator
function calculate (first, second) { // function to calculate the result of the equation
    let result = 0;
    switch (operator) {
        case "+":
            result = first + second;
            break;
        case "-":
            result = first - second;
            break;
        case "*":
            result = first * second;
            break;
        case "/":
            result = first / second;
            break;
        case "SQRT":
            result = Math.sqrt(first + second);
            break;
        default: 
            break;
    }
    return result;
}

// Equals button listener
equals.forEach(button => {
  button.addEventListener("click", function() {
    equal();
  });
});

// Equal action
function equal () { // function used when the equals button is clicked; calculates equation and displays it
    firstNumber = calculate(firstNumber, parseFloat(output.innerHTML));
    output.innerHTML = firstNumber.toString();
    nextReady = true;
}

// Clear button listener
clear.forEach(button => {
  button.addEventListener("click", function() {
    clearCalc();
  });
});

// A/C action
function clearCalc () { // clears calculator
    firstNumber = null;
    output.innerHTML = "0";
    nextReady = true;
}
</script>
