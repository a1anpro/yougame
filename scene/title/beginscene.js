class BeginScene extends YanScene{
  constructor(game){
    super(game)

    // 背景
    var bg = YanImage.new(game, 'daybg')
    this.addElement(bg)

    // 水管
    var pipes = Pipes.new(game)
    this.addElement(pipes)

    // 地面
    var grounds = Grounds.new(game)
    this.addElement(grounds)

    // 游戏开始画面
    var begin = YanImage.new(game, 'begin')
    begin.x = 110
    begin.y = 200
    this.addElement(begin)
  }
}
