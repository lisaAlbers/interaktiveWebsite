/*Searchbar*/
const bubbles = document.querySelectorAll('.bubble');
const bubblePosition = [0, 50]
const search = document.querySelector('.search-wrapper');
const S = document.querySelector('.S');
const input = document.createElement('input');
input.type = 'text';
input.className = 'inputSearch';
input.placeholder = '_ type something';
let counter = 0;
let distanceAll = [];

function bubbling() {
    if(counter < bubbles.length) {
        setTimeout(function() {
            bubbles[counter].classList.add('animate');
            let distance = ([counter] * 50) + 'px';
            distanceAll[counter] = distance;
            counter++;
            bubbling(counter);
        }, 80);
    }
}

bubbling();
search.addEventListener('mouseover', function() {
    console.log('ciao');
    bubbles[0].style = 'width: 350px; border-radius: 10px;  z-index: 1;';
    bubbles[0].classList.remove('animate');
    input.placeholder = '>';
    S.style.color = '#333333';
    setTimeout(() => {
        S.innerHTML = '';
        bubbles[0].appendChild(input);
        let inputAppended = document.querySelector('.inputSearch');
        inputAppended.focus();
        inputAppended.style = 'caret-color: transparent';
        inputAppended.addEventListener('keypress', (e) => {
            if(e.keyCode == 13) {
                console.log('Now I am removing text but you can do whatever you want with text value');
                inputAppended.value = '';              
            }            
        });
    }, 1000);
});

search.addEventListener('mouseout', function() {
    console.log('ciao');
    let inputAppended = document.querySelector('.inputSearch');
    bubbles[0].style = '';
    bubbles[0].classList.add('animate');
    S.style.color = '#4C83F0';
    inputAppended.value = '';
    inputAppended.style = 'caret-color: transparent; z-index: -1;';
    input.placeholder = '';

    setTimeout(() => {
        bubbles[0].removeChild(input);
        S.innerHTML = 'S';
    }, 1000);
});

/*Slideshow*/
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
/*Counter*/
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
/*mouseeffect*/
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
/*cool Effects*/
// Little Canvas things
var canvas = document.querySelector("#canvas"),
    ctx = canvas.getContext('2d');

// Set Canvas to be window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Configuration, Play with these
var config = {
  particleNumber: 800,
  maxParticleSize: 10,
  maxSpeed: 40,
  colorVariation: 50
};

// Colors
var colorPalette = {
    bg: {r:12,g:9,b:29},
    matter: [
      {r:36,g:18,b:42}, // darkPRPL
      {r:78,g:36,b:42}, // rockDust
      {r:252,g:178,b:96}, // solorFlare
      {r:253,g:238,b:152} // totesASun
    ]
};

// Some Variables hanging out
var particles = [],
    centerX = canvas.width / 2,
    centerY = canvas.height / 2,
    drawBg,

// Draws the background for the canvas, because space
drawBg = function (ctx, color) {
    ctx.fillStyle = "rgb(" + color.r + "," + color.g + "," + color.b + ")";
    ctx.fillRect(0,0,canvas.width,canvas.height);
};

// Particle Constructor
var Particle = function (x, y) {
    // X Coordinate
    this.x = x || Math.round(Math.random() * canvas.width);
    // Y Coordinate
    this.y = y || Math.round(Math.random() * canvas.height);
    // Radius of the space dust
    this.r = Math.ceil(Math.random() * config.maxParticleSize);
    // Color of the rock, given some randomness
    this.c = colorVariation(colorPalette.matter[Math.floor(Math.random() * colorPalette.matter.length)],true );
    // Speed of which the rock travels
    this.s = Math.pow(Math.ceil(Math.random() * config.maxSpeed), .7);
    // Direction the Rock flies
    this.d = Math.round(Math.random() * 360);
};

// Provides some nice color variation
// Accepts an rgba object
// returns a modified rgba object or a rgba string if true is passed in for argument 2
var colorVariation = function (color, returnString) {
    var r,g,b,a, variation;
    r = Math.round(((Math.random() * config.colorVariation) - (config.colorVariation/2)) + color.r);
    g = Math.round(((Math.random() * config.colorVariation) - (config.colorVariation/2)) + color.g);
    b = Math.round(((Math.random() * config.colorVariation) - (config.colorVariation/2)) + color.b);
    a = Math.random() + .5;
    if (returnString) {
        return "rgba(" + r + "," + g + "," + b + "," + a + ")";
    } else {
        return {r,g,b,a};
    }
};

// Used to find the rocks next point in space, accounting for speed and direction
var updateParticleModel = function (p) {
    var a = 180 - (p.d + 90); // find the 3rd angle
    p.d > 0 && p.d < 180 ? p.x += p.s * Math.sin(p.d) / Math.sin(p.s) : p.x -= p.s * Math.sin(p.d) / Math.sin(p.s);
    p.d > 90 && p.d < 270 ? p.y += p.s * Math.sin(a) / Math.sin(p.s) : p.y -= p.s * Math.sin(a) / Math.sin(p.s);
    return p;
};

// Just the function that physically draws the particles
// Physically? sure why not, physically.
var drawParticle = function (x, y, r, c) {
    ctx.beginPath();
    ctx.fillStyle = c;
    ctx.arc(x, y, r, 0, 2*Math.PI, false);
    ctx.fill();
    ctx.closePath();
};

// Remove particles that aren't on the canvas
var cleanUpArray = function () {
    particles = particles.filter((p) => { 
      return (p.x > -100 && p.y > -100); 
    });
};


var initParticles = function (numParticles, x, y) {
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(x, y));
    }
    particles.forEach((p) => {
        drawParticle(p.x, p.y, p.r, p.c);
    });
};

// That thing
window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
     window.webkitRequestAnimationFrame ||
     window.mozRequestAnimationFrame ||
     function(callback) {
        window.setTimeout(callback, 1000 / 60);
     };
})();


// Our Frame function
var frame = function () {
  // Draw background first
  drawBg(ctx, colorPalette.bg);
  // Update Particle models to new position
  particles.map((p) => {
    return updateParticleModel(p);
  });
  // Draw em'
  particles.forEach((p) => {
      drawParticle(p.x, p.y, p.r, p.c);
  });
  // Play the same song? Ok!
  window.requestAnimFrame(frame);
};

// Click listener
document.body.addEventListener("click", function (event) {
    var x = event.clientX,
        y = event.clientY;
    cleanUpArray();
    initParticles(config.particleNumber, x, y);
});

// First Frame
frame();

// First particle explosion
initParticles(config.particleNumber);

