'use strict';

/**
 * Constructor for our JSTimeBox.
 *
 * @param timeBoxId The DOM id of the element (e.g. a 'div') that should hold our JSTimeBox elements.
 */
var JSTimeBox = function(timeBoxId) {
	var exports = {};
	var _timeBox = document.getElementById(timeBoxId);
	var _placeHolder = "Time";
    var _hours = null;
    var _minutes = null;
    var _ampm = null;
	var _input = document.createElement("input");
	_input.type = "text";
	_input.placeholder = _placeHolder
	_input.className = "timeBoxInput"; // set the CSS class
	
	_input.onfocus = function() {
		if (this.value == "") {
			this.placeholder = "";
		}
	}

	_input.onblur = function() {
		if (this.value == "") {
			this.placeholder = _placeHolder;
			_hours = null;
			_minutes = null;
			_ampm = null;
		} else {
			var time = formatTime(this.value);
			if (time == "") {
				this.placeholder = _placeHolder;
				_hours = null;
				_minutes = null;
				_ampm = null;
			}
			this.value = time;
		}
	}
	
	_timeBox.appendChild(_input); // put it into the DOM
	
	/**
	 * Converts from a 24-hour clock to 12-hour clock format.
	 *
	 * Takes a time value in the format H:M, HH:M, HH:  MM, HH:M PM, HH:MAM, HHMM, HH:, H, HH, :MM, etc and formats it to HH:MM AM/PM
	 *
	 * @param value The text value to parse to a valid time format
	 */
	function formatTime(value) {
		console.log("Info: Value= '"+value+"'");
		
		var error = false;
		var NOON = 12; // less than NOON is 'am'. Equal or greater NOON is 'pm'
		
		// remove leading and trailing whitespaces first
		value = value.trim();
		
		// remove spaces within value
		value = value.replace(/\s/g, '');
		
		if (value == "") {
			console.log("Error: Value is empty");
			error = true;
		} else {
		
			if (value.indexOf(":") != -1)	{
				console.log("Info: Value is of the format _hours:_minutes");
				
				var parts = value.split(":");
				console.log("Info: First part '"+parts[0]+"' second part '"+parts[1]+"'");
				
				// Process first part
				if (isNaN(parts[0])) {
					console.log("Error: First part is NaN!");
					error = true;
				} else {	
					_hours = Number(parts[0]);
				} //fi isNaN(parts[0])
				
				// Process (possible) second part
				if (parts.length > 1) {	
					
					var ampmIndex = parts[1].indexOf("a");
					if (ampmIndex > -1) {
						_ampm = "am";
					} else if (parts[1].indexOf("p") > -1) {
						ampmIndex = parts[1].indexOf("p");
						_ampm = "pm";
					}
					
					if (ampmIndex > -1) {
						_minutes = parts[1].substring(0, Math.min(ampmIndex, 2));
					} else {
						_minutes = parts[1].substring(0, 2);
					}
					
					if (isNaN(_minutes)) {
						console.log("Error: Second part '"+parts[1]+"' is NaN!");
						error = true;
					}
				} else {
					_minutes = 0;
				}
				
			} else {
				console.log("Info: Value does not contain the split character ':'");
								
				// Value can may in the following format HHM, HHMM, 0000HHM, 00HHMM, HHMMpm, HHM pm, etc
				var ampmIndex = value.indexOf("a");
				if (ampmIndex > -1) {
					_ampm = "am";
				} else if (value.indexOf("p") > -1) {
					ampmIndex = value.indexOf("p");
					_ampm = "pm";
				}
				
				
				// If we have an "am", "a.m", "pm" or "p.m", etc we have to strip it out
				if (ampmIndex > -1) {
					value = value.substring(0, ampmIndex);
				}
				
				if (isNaN(value) == false) {
					// Remove leading zeros
					var strip;
					if (value.length == 3) {
						strip = '0' + Number(value);
					} else { 
						strip = '' + Number(value);
					}
					_hours = strip.substring(0, 2);
					_minutes = strip.substring(2, 4);
					if (_minutes == '') {
						_minutes = 0;
					}
					
				} else {
					console.log("Error: Value is NaN");
					error = true;
				}
			}// fi indexOf(':')
			
			
			if (_hours != null && _minutes != null) {
				_minutes = Number(_minutes);
				_hours = Number(_hours);
				
				console.log("Info: _hours: '"+_hours+"'  _minutes: '"+_minutes+"'");
				
				// _hours
				if (_hours > 24 || _hours < 0) {
					console.log("Error: _hours are not in the interval [0, 23]")	;
					_hours = 11;
					_minutes = 59;
					_ampm = "am";
				} else {
					if (_hours > NOON) {
						_hours = _hours - 12;
						_ampm  = "pm"; 
					} else if (_hours == NOON) {
						_ampm  = "pm";
					} else if (_hours == 0) {
						_hours = 12;
						_ampm  = "am";	
					} else {
						if (_ampm == null) {
							_ampm  = "am";
						}
					}	
				} // fi (_hours>24 ...)	
				
				
				
				// _minutes
				if (_minutes > 59 || _minutes < 0) {
					console.log("Error: _minutes are not in the interval [0, 59]")	;
					_minutes = 59;
				} else {
					if (_minutes < 10) {
						_minutes = "0" + _minutes;
					}
				}
				
				return _hours+":"+_minutes+" "+_ampm;
			}
			
			if (error) {
				return "";	
			}
		} // fi == ""
	}
	
    ////////////////////////////////////////////////
    // PUBLIC METHODS
    ////////////////////////////////////////////////
    
    function getTime() {
        return _input.value;
    }
    
    function getHours() {
        return _hours;
    }
    
    function getMinutes() {
        return _minutes;
    }
	
    function getAmPm() {
	return _ampm;
    }
    
    ////////////////////////////////////////////////
    // EXPORT PUBLIC METHODS
    ////////////////////////////////////////////////
    exports.getTime     = getTime;
    exports.getHours    = getHours;
    exports.getMinutes  = getMinutes;
    exports.getAmPm		= getAmPm;
    return exports;
}
