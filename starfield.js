

var maxH = window.outerHeight
  , maxW = window.outerWidth
  , messages = []
  , waiting = []
  ;

var N = 500, S = 0.04, I = 20, screenDist = 1000;

function css (obj, props) {
  for(var k in props) {
    obj.style.setProperty(k, props[k])
  }
}

function random(max) { 
  return Math.ceil(max*Math.random()); 
}
function random2(max) { 
  return max*(Math.random() - 0.5)*2; 
}

var center = new Vector(window.outerWidth / 2, window.outerHeight / 2)
console.error("CENTER:", center)

function Star (origin, velocity) {
  this.velocity = velocity
  this.origin = origin
}
Star.prototype.move = function (timeslice) {

  this.origin.add(new Vector(this.velocity).add(timeslice))
}
Star.prototype.draw = function () {

  var coord = new Vector(this.origin).add(screenDist / this.origin.z)

  if(this.element)
    css(this.element, { 
      left: center.x + coord.x + 'px', 
      top: center.y + coord.y + 'px'
      //width: //figure out correct amount to scale by...
      //height: 
    })
    console.error(coord.x, coord.y, coord.z)
    
}
function init () {

  var star = new Star(new Vector(random2(10000),random2(5000),10000), new Vector(0,0,-100))
  star.element = document.createElement('div')
  star.element.classList.add('star')
  return star
}

var stars = []
while (stars.length < 30) {
  var star
  stars.push(star = init(stars.length))
  document.body.appendChild(star.element)
  star.draw()
}

var oldTime = Date.now()
function moveAll() {
  var now = Date.now()
  var timeslice = (now - oldTime) / 1000;
  stars.forEach(function (e) {
    e.move(1 /*timeslice*/)
    e.draw()
  })
  oldTime = now
}

setInterval(moveAll, 100)
