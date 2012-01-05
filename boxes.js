

/*

  check if two line segments overlap;
  
    xxxxxxxxxxxxxx
             yyyyyyyyyyyy

    xxxxxxxxxxxxx
       yyyyy
       
       
        xxxxxxxxxxxxx
    yyyyyyyy


    xxxxxxxxxx
    
                  yyyyyyyy

*/


//return true if a-A overlaps with b B
function overlap(a, A, b, B) {
    
  // if a, A are smaller than b,B or a,A are greater than b,B it's not an overlap.

  //swap b,B without temp var
  if(B < b) b += B, B = b - B, b = b - B ; 

  return ! ( (a < b && A < b) || (a > B && A > B) )

}

function collide2D (self, s_size, other, other_size) {

  return (
    overlap(self.x, self.x + s_size.x, other.x, other_size.x) &&
    overlap(self.y, self.y + s_size.y, other.y, other_size.y)
    )
}

function collide3D (self, s_size, other, other_size) {

  return (
    overlap(self.x, self.x + s_size.x, other.x, other_size.x) &&
    overlap(self.y, self.y + s_size.y, other.y, other_size.y) &&
    overlap(self.z, self.z + s_size.z, other.z, other_size.z)
    )
}


function assert (test, message) {
  if(!test) throw new Error(message)
}

assert( !overlap( 0, 1, 2, 3), 'simple' )
assert( !overlap( 0, 1, 3, 2), 'wrong order' )

assert( !overlap( 0,0, 1,1 ), 'points')


assert( overlap( 0,0, 0,0 ), 'points')
assert( overlap( 0,1, 1,1 ), 'touches')
assert( overlap( 0,3, 1,2 ), 'contains')
assert( overlap( 0,2, 1,3 ), 'overlaps')


assert( !overlap( 0, 1, 2, 3), 'simple' )
assert( !overlap( 0, 1, 3, 2), 'wrong order' )

assert(
  collide2D(
    {x: 0, y: 0}, {x: 4, y:4}
  , {x: -1, y: 1}, {x: 1, y:3}
  ), '2D collision 1')

assert(
  collide2D(
    {x: 0, y: 0}, {x: 4, y:4}
  , {x: 1, y: 1}, {x: 3, y:3}
  ), '2D collision 2')

assert(
  !collide2D(
    {x: 0, y: 0}, {x: 4, y:4}
  , {x: 5, y: 5}, {x: 6, y:6}
  ), '2D no collision')

assert(
  collide2D(
    {x: 0, y: 0}, {x: 4, y:4}
  , {x: 4, y: 4}, {x: 6, y:6}
  ), '2D touch')
