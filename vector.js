

function Vector (x, y, z) {

  if('object' == typeof x) {
    this.x = x.x; this.y = x.y; this.z = x.z;
  } else {
    this.x = x; this.y = y; this.z = z;
  }
}

Vector.prototype.add = function () {

// if an argument is a vector, add x,y,z if it is a number, multiply.

  var l = arguments.length, i = 0 
  while (i < l) {
    var v = arguments[i++]
    if('object' == typeof v) {
      this.x += v.x; this.y += v.y; this.z += v.z;
    } else {
      this.x *= v; this.y *= v; this.z *= v;
    }
  }

  return this;  
}

Vector.prototype.length = function () {
  return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2) + Math.pow(this.z,2))
}

Vector.prototype.normalize = function (l) {
  var l = this.length()
  this.x = this.x/l
  this.y = this.y/l
  this.z = this.z/l
  return this
}

function assert (test, message) {
  if(!test) throw new Error(message)
}

if(true) {

  assert(new Vector(1,0,0).length() == 1, 'should be 1')
  assert(new Vector(0,1,0).length() == 1, 'should be 1')
  assert(new Vector(0,0,1).length() == 1, 'should be 1')

  console.error(new Vector(1,1,1).length())
  assert(new Vector(1,1,1).length() == 1.7320508075688772, 'length')
  assert(new Vector(1,1,1).add(2).length() == 2*1.7320508075688772, 'mult')
  assert(new Vector(1,1,1).add(new Vector(1,1,1)).length() == 2*1.7320508075688772, 'add vector')

}


/*
  update positions like this
  
  self.orgin.add(new Vector(self.velocity).add(Time.now() - self.lastmove))

  draw something onto the screen like this
  ( assuming that the eye is at 0,0,0 and facing along the Z axis.)
  
  new Vector(other.origin).mult(other.origin.z / scrDist)
  
  scrDist determines the camera angle. 

*/


//add test for normalize. 

/*
  vectors can be direction, or pitch, roll, yaw.
  
  don't know how to convert from p,r,y to x,y,z
  
  that's not important for starfields, anyway.

  I really want to know how to do it though... ARGH. distraction.

*/
