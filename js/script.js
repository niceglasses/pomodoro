(function() {


// set up sound
var start = new Howl({
  urls: ['sounds/start.mp3']
});

var complete = new Howl({
  urls: ['sounds/complete.mp3'],
  loop: false;
});

// init clock;
var clock = document.getElementById('clock');
    clock.innerHTML = "00:00";

// clock logic

var pomodoro = 25 * 60;
var shortbreak = 5 * 60;
var longbreak = 10 * 60;
var test = 5;


var deadline;

function getDeadline(timeType) {
  deadline = new Date(Date.parse(new Date()) + timeType * 1000);
}


function getTimeRemaining() {
  var t = Date.parse(deadline) - Date.parse(new Date());
  var seconds = Math.floor( (t/1000) % 60 );
  var minutes = Math.floor( (t/1000/60) % 60 );
  return {
    'total': t,
    'minutes': ('0' + minutes).slice(-2),
    'seconds': ('0' + seconds).slice(-2)
  };
}


function doTheTimerThing() {

  function updateClock() {
      var t = getTimeRemaining();

      clock.innerHTML = t.minutes + ':' + t.seconds;

      if (t.total <= 0) {
          complete.play();
          clearInterval(timeinterval);
      }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

// Grab buttons
var button25 = document.getElementsByClassName("25min")[0],
    button5 = document.getElementsByClassName("5min")[0],
    button10 = document.getElementsByClassName("10min")[0],
    buttontest = document.getElementsByClassName("test")[0];


// Add Click Events
button25.addEventListener("click", function() {
  start.play();
  getDeadline(pomodoro);
  doTheTimerThing();
}, false);

button5.addEventListener("click", function() {
  start.play();
  getDeadline(shortbreak);
  doTheTimerThing();
}, false);

button10.addEventListener("click", function() {
  start.play();
  getDeadline(longbreak);
  doTheTimerThing();
}, false);

buttontest.addEventListener("click", function() {
  start.play();
  getDeadline(test);
  doTheTimerThing();

}, false);


// end anonymous function
}());