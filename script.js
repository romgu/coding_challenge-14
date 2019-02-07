// create a one-time event
function onetime(node, type, callback) {

	// create event
	node.addEventListener(type, function(e) {
		// remove event
		e.target.removeEventListener(e.type, arguments.callee);
		// call handler
		return callback(e);
	});

}

// one-time event
onetime(document.querySelector("#cards"), "click", handler);

// handler function
function handler(e) {
	markPresent();
}



//

function markPresent(){
    window.markDate = new Date();
    updateClock();
}

const updateClock = () => {  
    const currDate = new Date();
    const diff = currDate - markDate;
    document.getElementById("timer").innerHTML = format(diff/1000);
	    setTimeout(function() {
	    	updateClock()
	    }, 1000);
}

const format = (seconds) => {
const numhours = parseInt(Math.floor(((seconds % 31536000) % 86400) / 3600),10);
const numminutes = parseInt(Math.floor((((seconds % 31536000) % 86400) % 3600) / 60),10);
const numseconds = parseInt((((seconds % 31536000) % 86400) % 3600) % 60,10);
    return ((numhours<10) ? "0" + numhours : numhours)
    + ":" + ((numminutes<10) ? "0" + numminutes : numminutes)
    + ":" + ((numseconds<10) ? "0" + numseconds : numseconds);
}


