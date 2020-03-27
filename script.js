document.addEventListener('keydown', function(event) {
    var ekey = event.keyCode
    if( 37 === ekey ) {
      pauseSlideshow();
    previousSlide();
    } 
  if ( 39 === ekey ) {
       // right arrow
    pauseSlideshow();
    nextSlide();
    }});

var slides = document.querySelectorAll('#slides .slide');
var currentSlide = 0;
var slideInterval = setInterval(nextSlide,2000);

function nextSlide() {
    goToSlide(currentSlide+1);
}

function previousSlide() {
    goToSlide(currentSlide-1);
}

function goToSlide(n) {
    slides[currentSlide].className = 'slide';
    currentSlide = (n+slides.length)%slides.length;
    slides[currentSlide].className = 'slide showing';
}

var playing = true;
var pauseButton = document.getElementById('pause');

function pauseSlideshow() {
    pauseButton.innerHTML = '&#9658';
    playing = false;
    clearInterval(slideInterval);
}

function playSlideshow() {
    pauseButton.innerHTML = '||';
    playing = true;
    slideInterval = setInterval(nextSlide,2000);
}

pauseButton.onclick = function() {
    if(playing) {
    pauseSlideshow();
  } else {
    playSlideshow();
  }
};

var next = document.getElementById('next');
var previous = document.getElementById('previous');

next.onclick = function() {
    pauseSlideshow();
    nextSlide();
};
previous.onclick = function() {
    pauseSlideshow();
    previousSlide();
};
const counters = document.querySelectorAll('.counter');
const speed = 200; // The lower the slower

counters.forEach(counter => {
	const updateCount = () => {
		const target = +counter.getAttribute('data-target');
		const count = +counter.innerText;

		// Lower inc to slow and higher to slow
		const inc = target / speed;

		// console.log(inc);
		// console.log(count);

		// Check if target is reached
		if (count < target) {
			// Add inc to count and output in counter
			counter.innerText = count + inc;
			// Call function every ms
			setTimeout(updateCount, 1);
		} else {
			counter.innerText = target;
		}
	};

	updateCount();
});
document.onmousemove = animateCircles;
var colors = ['#ccc','#6cf','#eba13a'];
function animateCircles (event){
    var circle = document.createElement("div");
    circle.setAttribute("class","circle");
    document.body.appendChild(circle);

    circle.style.left = event.clientX + 'px';
    circle.style.top = event.clientY + 'px';

    circle.style.transition = "all 0.5s linear 0s";

    circle.style.left = circle.offsetLeft - 20 + 'px';
    circle.style.top = circle.offsetTop - 20 + 'px';

   var color = colors[ Math.floor(Math.random()*colors.length)];
   circle.style.borderColor = color;

    circle.style.width = "50px";
    circle.style.height = "50px";
    circle.style.borderWidth = "5px";
    circle.style.opacity = 0;

}
