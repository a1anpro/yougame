//现在label可以随便放到哪里了，因为它可以有自己的行为，
//无论它放在哪里，都可以完成自己的行为～
class YanLabel{
  constructor(game, text){
    this.game = game
    this.text = text

    this.x = 0
    this.y = 0
  }
  static new(game, text){
    return new this(game, text)
  }
  draw(){
    var ctx = this.game.context
    ctx.font = '20px serif'
    ctx.fillStyle = "rgb(253,20,74)"

    ctx.fillText(this.text, this.x, this.y)
  }
  update(){

  }
}
