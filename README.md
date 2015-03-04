# jstimebox
A javascript time field that formats inputted values into 12-hour clock format.

<a href="http://lucaslouca.github.io/jsdtimebox/" target="_blank">Demo</a>

<img src="https://cloud.githubusercontent.com/assets/10542894/6098126/5b1ea5d4-afd5-11e4-8665-53b481bab334.png" width="450"/>

## How to use it

Include the neccesary stylesheet and javascript files:
```
<link rel="stylesheet" type="text/css" href="jstimebox.css" media="screen" />
<script src='jstimebox.js'></script>
```

Include a simple div to hold your datepicker:
```
<div id="timeBox" class="jsTimeBox"></div>
```

Initialise the time box:
```
<script>
	var myTimeBox = new JSTimeBox('timeBox');	
</script>
```

## Public methods
> `getTime()`

>Returns the text value of the time box field.

<br>

> `getHours()`

>Returns the hours part of the time.

<br>

> `getMinutes()`

>Returns the minutes part of the time.

<br>

> `getAmPm()`

>Returns 'am' if AM and 'pm' if PM.
