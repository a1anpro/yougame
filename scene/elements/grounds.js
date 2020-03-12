class Grounds{
  constructor(game){
    this.game = game

    this.stop = false
    this.skipCount = 5
    this.grounds = []
    for (var i = 0; i < 30; i++) {
      var g = YanImage.new(game, 'ground')
      g.x = i * 20
      g.y = 520
      this.grounds.push(g)
    }
  }
  static new(game){
    return new this(game)
  }
  allStop(){
    this.stop = true
  }
  update(){
    if (this.stop){
      return
    }
    // 地面砖块的初始移动速度
    var offset = -5
    this.skipCount--
    if (this.skipCount == 0){
      this.skipCount = 4
      offset = 15 // 一下子移动三步
    }

    //移动地面
    for (var i = 0; i < 30; i++) {
      var g = this.grounds[i]
      g.x += offset
    }
  }

  draw(){
    for (var i = 0; i < this.grounds.length; i++) {
      var g = this.grounds[i]
      this.game.drawImage(g)
    }
  }
}
