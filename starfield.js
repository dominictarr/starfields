

/*

  seperate css/html stuff from raw 3D stuff.
  
  port it to canvas, and see if it's faster?

*/

var center = new Vector(window.outerWidth / 2, window.outerHeight / 2, 0)
var screenSize= new Vector(window.outerWidth, window.outerHeight, 0)

var maxH = window.outerHeight / 2
  , maxW = window.outerWidth / 2
  , messages = []
  , waiting = []
  ;

var N = 500, S = 0.04, I = 20, screenDist = 1000;

function css (obj, props) {
  for(var k in props) {
    obj.style.setProperty(k, props[k], null)
  }
}

function random(max) { 
  return Math.ceil(max*Math.random()); 
}

function random2(max) { 
  return max*(Math.random() - 0.5)*2; 
}

function Star (origin, velocity, size) {
  this.velocity = velocity
  this.origin = origin
  this.size = size || new Vector (10, 10, 0)

}
Star.prototype.move = function (timeslice) {

  this.origin.add(new Vector(this.velocity).add(timeslice))
}
var topLeft = {x:0, y:0}

function screenCoords(star) {
  var coord = new Vector(star.origin).add(screenDist / star.origin.z, center)
  return {
    coord: coord
  , size: new Vector(star.size).add(screenDist / star.origin.z)
  , onScreen: collide2D(coord, star.size, topLeft, screenSize)
  }
}


Star.prototype.draw = function () {}

function randPosition() {
  return new Vector(random2(10000),random2(5000),15000 + random(5000))
}

var oldTime = Date.now()
var stars = []


function createStars(N, init, tick) {
  function moveAll() {
    var now = Date.now()
    var timeslice = (now - oldTime) / 1000;

    stars.forEach(function (e) {
      e.move(1 /*timeslice*/)
      e.draw(screenCoords(e))
    })
    oldTime = now

    if('function' === typeof tick) tick(timeslice, now, oldTime)
    setTimeout(moveAll, 20)
  }
  while (stars.length < N) {
    var star
    stars.push(star = init(stars.length))
  }
  moveAll()
}


