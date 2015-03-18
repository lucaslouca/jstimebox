# jstimebox
A javascript time field that formats inputted values into 12-hour clock format.

<a href="http://lucaslouca.github.io/jstimebox/" target="_blank">Demo</a>

<img src="https://cloud.githubusercontent.com/assets/10542894/6479581/ea9de3da-c247-11e4-82c7-278f04f3ebd8.PNG" width="450"/>

## How to use it

Include the neccesary stylesheet and javascript files:
```
<link rel="stylesheet" type="text/css" href="jstimebox.css" media="screen" />
<script src='jstimebox.js'></script>
```

Include a simple div to hold your datepicker:
```
<div id="my-time-box" class="js-time-box"></div>
```

Initialise the time box:
```
<script>
	var myTimeBox = new JSTimeBox('my-time-box');	
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
