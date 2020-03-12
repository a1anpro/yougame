const randomBetween = function(start, end){
  var n = Math.random() * (end - start + 1)
  return Math.floor(n + start)
}

const log = console.log.bind(console)

const isRectIntersect = function(a, b){
    var r2W = a.w
    var r2H = a.h
    var r1W = b.w
    var r1H = b.h
    var r1 = b
    var r2 = a
    if ((r1.y + r1H < r2.y) || (r2.y + r2H < r1.y) || (r1.x + r1W < r2.x) || (r2.x + r2W < r1.x)){
        return false
    }
    return true
}
