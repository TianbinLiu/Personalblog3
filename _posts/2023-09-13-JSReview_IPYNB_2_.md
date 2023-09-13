---
toc: True
comments: False
layout: post
title: Review of JS, JS input and output.
type: hacks
---

### Create Element
The createElement() method creates an element node.


```python
// Create a <p> element and append it to the document:
const para = document.createElement("p"); //create a <p> element equal to a object named para
para.innerText = "This is a paragraph";   //add text to the element
document.body.appendChild(para);          //put the <p> element under <body>
```


```python
//Create a <p> element and append it to an element:
const para = document.createElement("p");  //Same, create the element
para.innerHTML = "This is a paragraph.";   //Same, add text to element
document.getElementById("myDIV").appendChild(para);
//put the <p> element under the element(maybe <div>) that has an id called "myDIV"
//like below
<div id="myDIV">
    <p>"This is a paragraph."</p>
</div>
```

### Set Attribute
The setAttribute() method sets a new value to an attribute.

If the attribute does not exist, it is created first.

element.setAttribute(name, value)


```python
<style> 
    .democlass {            
        color: red;
    }
</style>

<body>
    <h1 id="myH1">The Element Object</h1>
    <h2>The setAttribute() Method</h2>

    <button onclick="myFunction()">Add Class</button>

    <script>
        function myFunction() {
            document.getElementById("myH1").setAttribute("class", "democlass");
        }
    </script>
</body>
```

### Get Elements by ID


```python
//Get the element with the specified id:

document.getElementById("demo");
```


```python
//Get the element and change its color:

const myElement = document.getElementById("demo");
myElement.style.color = "red";
```


```python
//Or just change its color directly:

document.getElementById("demo").style.color = "red";
```

### Get Elements by Name


```python
//Get all elements with the name "fname":

let elements = document.getElementsByName("fname");
```

Example of how to use it


```python
<p>First Name: <input name="fname" type="text" value="Michael"></p>
<p>First Name: <input name="fname" type="text" value="Doug"></p>

<p>The tag name of the first element with the name "fname" is:</p>

<p id="demo"></p>

<script>
let elements = document.getElementsByName("fname");
document.getElementById("demo").innerHTML = elements[0].value; //which should return Michael
</script>
```


```python
//Number of elements with name="animal":

let num = document.getElementsByName("animal").length; //return an integer

```
