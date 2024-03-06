---
layout: base
permalink: /GradeCalculator
title: Grade Calculator
---

<!-- Help Message -->
<h3>Input scores, press tab to add each new number.</h3>
<!-- Totals -->
<ul>
<li>
    Total : <span id="total">0.0</span>
    Count : <span id="count">0.0</span>
    Average : <span id="average">0.0</span>
</li>
</ul>
<!-- Rows added using scores ID -->
<table id="scores">
    <!-- javascript generated inputs -->
</table>

<script>
// Executes on input event and calculates totals
function calculator(event) {
    var key = event.key;
    // Check if the pressed key is the "Tab" key (key code 9) or "Enter" key (key code 13)
    if (key === "Tab" || key === "Enter") { 
        event.preventDefault(); // Prevent default behavior (tabbing to the next element)
   
        var array = document.getElementsByName('score'); // setup array of scores
        var array2 = document.getElementsByName('score2');
        var total = 0;  // running total
        var count = 0;  // count of input elements with valid values

        for (var i = 0; i < array.length; i++) {  // iterate through array
            var value = array[i].value;
            if (parseFloat(value)) {
                var parsedValue = parseFloat(value);
                total += parsedValue;  // add to running total
                count++;
            }
        }

        for (var i = 0; i < array2.length; i++) {  // iterate through array
            var value = array2[i].value;
            if (parseFloat(value)) {
                var parsedValue = parseFloat(value);
                total += parsedValue;  // add to running total
                count++;
            }
        }

        // update totals
        document.getElementById('total').innerHTML = total.toFixed(2); // show two decimals
        document.getElementById('count').innerHTML = count;

        if (count > 0) {
            document.getElementById('average').innerHTML = (total / count).toFixed(2);
        } else {
            document.getElementById('average').innerHTML = "0.0";
        }

        // adds newInputLine, only if all array values satisfy parseFloat 
        if (count === (document.getElementsByName('score').length + document.getElementsByName('score').length)) {
            newInputLine(count); // make a new input line
        }
    }
}

// Creates a new input box
function newInputLine(index) {
    var tablerow = document.createElement('tr');
    document.getElementById("scores").appendChild(tablerow); // add to HTML

    // Add a label for each score element
    var title = document.createElement('label');
    title.htmlFor = index;
    title.innerHTML = "Scores: " + index + ". ";   
    var tablecol = document.createElement('td');
    document.getElementById("scores").appendChild(tablecol);
    document.getElementById("scores").appendChild(title); // add to HTML

    // Setup score element and attributes
    var score = document.createElement("input"); // input element
    score.id =  index;  // id of input element
    score.onkeydown = calculator // Each key triggers event (using function as a value)
    score.type = "number"; // Use text type to allow typing multiple characters
    score.name = "score";  // name is used to group all "score" elements (array)
    score.style.textAlign = "right";
    score.style.width = "5em";
    document.getElementById("scores").appendChild(tablecol);
    document.getElementById("scores").appendChild(score);  // add to HTML

    var score2 = document.createElement("input"); // input element
    score2.id =  index;  // id of input element
    score2.onkeydown = calculator // Each key triggers event (using function as a value)
    score2.type = "number"; // Use text type to allow typing multiple characters
    score2.name = "score2";  // name is used to group all "score" elements (array)
    score2.style.textAlign = "right";
    score2.style.width = "5em";
    document.getElementById("scores").appendChild(tablecol);
    document.getElementById("scores").appendChild(score2);  // add to HTML

    // Create and add blank line after input box
    var br = document.createElement("br");  // line break element
    document.getElementById("scores").appendChild(br); // add to HTML

    // Set focus on the new input line
    document.getElementById(index).focus();
}

// Creates 1st input box on Window load
newInputLine(0);
</script>