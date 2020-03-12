class Timer extends YanLabel{
  constructor(game){
    super(game, "0")
    this.x = 10
    this.y = 30

    this.startTime = new Date().getTime() / 1000

    this.stop = false
  }
  static new(game){
    return new this(game)
  }

  stopTimer(){
    this.stop = true
  }

  update(){
    if (this.stop){
      return
    }
    var now = new Date().getTime() / 1000
    this.time = now - this.startTime
    this.text = '已经坚持了' + String(this.time).split('.')[0] + '秒'
  }
}
