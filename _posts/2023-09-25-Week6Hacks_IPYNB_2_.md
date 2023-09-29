---
toc: True
comments: True
layout: post
title: Week 6 Web Programming Basics, HTML, Data Type, DOM, Javascript, JS Debugging Hacks
type: hacks
---

## HTML Hacks


```python
%%html
<div>
    <p>p element</p>
    <button>button</button>
</div>

```


<div>
    <p>p element</p>
    <button>button</button>
</div>




```python
%%html
<div>
    <a href="https://tianbinliu.github.io/Personalblog3/2023/09/21/Sprite_IPYNB_2_.html">Random link</a><br>
    <a href="https://tianbinliu.github.io/Personalblog3/2023/09/21/Sprite_IPYNB_2_.html">Random link</a>
    <p>You know what it is</p>
</div>
```


<div>
    <a href="https://tianbinliu.github.io/Personalblog3/2023/09/21/Sprite_IPYNB_2_.html">Random link</a><br>
    <a href="https://tianbinliu.github.io/Personalblog3/2023/09/21/Sprite_IPYNB_2_.html">Random link</a>
    <p>You know what it is</p>
</div>



## Data Types Hacks


```python
%%js
//Create an object representing yourself as a person. The object should have keys for your name, age, current classes, interests, and two more of your choosing
let person = {
    name:"Tianbin",
    age:18,
    currentclasses: "CSSE",
    interests: ["Video game, coding"],//Your object must contain keys whose values are arrays. The arrays can be arrays of strings, numbers, or even other objects if you would like
    gender: "male",
    sport: "soccer"
}
//Print the entire object with console.log after declaring it
console.log(person);
//Manipulate the arrays within the object and print the entire object with console.log as well as the specific changed key afterwards
person.name="john";
console.log(person);
console.log(person.name);

//Perform mathematical operations on fields in your object such as +, -, /, % etc. and print the results with console.log along with a message contextualizing them
person.age += 3;
console.log(person.age);

//Use typeof to determine the types of at least 3 fields in your object
console.log(typeof person.name);
console.log(typeof person.age);
console.log(typeof person.interests);
```


    <IPython.core.display.Javascript object>


## DOM Hacks


```python
%%html

<div>
    <p>button to switch the two links below</p>
    <button id="switch" onclick="switchLink()">button</button>
</div>

<div>
    <a id="link1" href="https://tianbinliu.github.io/Personalblog3/2023/09/21/Sprite_IPYNB_2_.html">Random link</a><br>
    <a id="link2" href="https://tianbinliu.github.io/Personalblog3/2023/09/21/Sprite_IPYNB_2_.html">Random link</a>
</div>

<script>
    var myButton = document.getElementById("switch");
    var link1 = document.getElementById("link1");
    var link2 = document.getElementById("link2");

    function switchLink(){
        link1.href="https://www.google.com/";
        link2.href="https://www.google.com/";
    }

</script>
```



<div>
    <p>button to switch the two links below</p>
    <button id="switch" onclick="switchLink()">button</button>
</div>

<div>
    <a id="link1" href="https://tianbinliu.github.io/Personalblog3/2023/09/21/Sprite_IPYNB_2_.html">Random link</a><br>
    <a id="link2" href="https://tianbinliu.github.io/Personalblog3/2023/09/21/Sprite_IPYNB_2_.html">Random link</a>
</div>

<script>
    var myButton = document.getElementById("switch");
    var link1 = document.getElementById("link1");
    var link2 = document.getElementById("link2");

    function switchLink(){
        link1.href="https://www.google.com/";
        link2.href="https://www.google.com/";
    }

</script>



## Javascript Hacks


```python
%%js

var a = 17
var b = 37

if (a > b) {
    // runs if age1 is more than age2
    console.log("a is greater")

} else if (a === b) {
    // runs if age1 and age2 are the same
    console.log("both are equal")

// (age1 < age2)
} else  {
    // runs if age2 is more than age1
    console.log("b is greater")
}

```


    <IPython.core.display.Javascript object>


## JS Debugging Hacks


```python
%%js

var alphabet = "abcdefghijklmnopqrstuvwxyz";
var alphabetList = [];

for (var i = 0; i < alphabet.length; i++) {
	alphabetList.push(alphabet.substring(i,i+1));
}

console.log(alphabetList);
```


    <IPython.core.display.Javascript object>



```python
%%js

var alphabet = "abcdefghijklmnopqrstuvwxyz";
var alphabetList = [];

for (var i = 0; i < alphabet.length; i++) {
	alphabetList.push(alphabet.substring(i,i+1));
}

console.log(alphabetList);

let letterNumber = 5

for (var i = 1; i < alphabetList.length; i++) {
	if (i === letterNumber) {
		console.log(alphabetList[i-1] + " is letter number " + letterNumber +" in the alphabet")
	}
}


```


    <IPython.core.display.Javascript object>



```python
%%js
//Intended behavior: print a list of all the odd numbers below 10
let evens = [];
let i = 0;

while (i < 10) {
  if(i%2 === 1){
    evens.push(i);
  }
  i++;
}

console.log(evens);
```


    <IPython.core.display.Javascript object>

