const bird_config = {
  // 状态切换的资源
  status:{
    // 正常状态
    alive: {
      name: 'bird',
      count: 3,
    },

    // 死亡状态
    died: {
      name: 'redbird',
      count: 3,
    },
  },

  // 初始状态
  initStatus: 'alive',

  // 初始坐标
  initX: 100,
  initY: 100,
}

//YanScene中有elements，每次画也都是通过它的遍历来画的
class MainScene extends YanScene{
   // constructor execute at building
  constructor(game){
    super(game)

    // 设置背景
    var bg = YanImage.new(game, 'daybg')
    this.addElement(bg)

    // 设置水管
    var pipes = Pipes.new(game)
    this.pipes = pipes
    this.addElement(pipes)

    // 设置地面
    var grounds = Grounds.new(game)
    this.grounds = grounds
    this.addElement(grounds)

    // 设置鸟
    var bird = FlappyBird.new(game, bird_config)
    this.bird = bird
    this.addElement(bird)

    // 设置游戏规则
    this.setInputs()

    // 设置计时器：
    var timer = Timer.new(game)
    this.timer = timer
    this.addElement(timer)
  }

  collide_test(pipes, bird){
    var ps = pipes.pipes
    for (var i = 0; i < ps.length; i++) {
      var p = ps[i]
      if (isRectIntersect(p, bird)){
        // 撞了：
        // 管子： 静止
        // 鸟：挂掉，掉地上，游戏停止(弹出画面)
        this.gameOver()
      }
    }
  }

  falldown(){
    // 鸟落地
    if (this.bird.height >= 500){
      this.gameOver()
    }
  }

  update(){
    super.update()
    // 无敌模式
    if (this.bird.debugModeEnabled){
      return
    }
    // 因为只有一只鸟，而有很多个管子，所以在场景里做鸟和管子的碰撞检测
    this.collide_test(this.pipes, this.bird)
    this.falldown()
  }

  gameOver(){
    this.bird.kill()
    // 游戏结束，解除所有事件 和 停止所有移动场景
    this.grounds.allStop()
    this.pipes.allStop()

    this.timer.stopTimer()

    var self = this
    setTimeout(function(){
      // 设置gameover场景
      var over = YanImage.new(self.game, 'gameover')
      over.x = 110
      over.y = 200
      self.addElement(over)
    }, 400)
  }

  // 这就是小鸟的游戏场景，规则在场景里设置
  //在场景里先做测试
  setInputs(){
    var self = this
    var b = this.bird

    self.game.registerAction(' ', function(keyStatus){
      b.jump()
    })
    self.game.registerAction('a', function(keyStatus){
      b.move(-b.birdSpeed, keyStatus)
    })
    self.game.registerAction('d', function(keyStatus){
      b.move(b.birdSpeed, keyStatus)
    })
  }
}
