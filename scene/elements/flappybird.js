
// 需要动画素材的物体，只需要配置自己要用哪些资源，让父类配置即可
class FlappyBird extends YanAnimation{
  constructor(game, cfg){
    super(game, cfg)

    // 如果小鸟的debug模式开启，则不会碰撞
    this.debugModeEnabled = true

    // 是否活着（都还可以优化
    this.alive = true

    this.birdSpeed = 5
    this.jumpHeight = 5
    // 重力加速度
    this.gy = 10.0
    this.vy = 0

    // 旋转的角度
    this.rotation = 0

    // 下降透明
    this.alpha = 1.0

    // 鸟的飞行高度
    this.height = this.y + this.h
  }

  static new(game, cfg){
    return new this(game, cfg)
  }

  fall(){
    // 下降
    // 下降过程中旋转了，所以头会砸进地面
    var d = this.y + this.h
    if (d < 500){
      this.y += this.vy
      this.vy += this.gy * 0.1
    }
    this.height = d
  }

  kill(){
    // 撞到水管则挂掉，垂直下落
    this.alive = false
    this.changeAnimation('died')
    // 动画切换
    this.changeToStatic()
  }

  move(x, keyStatus){
    if (!this.alive){
      return
    }
    this.flipX = x < 0
    this.x += x
  }

  jump(){
    if (!this.alive){
      return
    }
    var tempy = this.y-this.jumpHeight

    this.y = tempy

    //每次跳完之后都把垂直方向的速度归零
    this.vy = 0

    //跳跃的时候修改旋转角度
    this.rotation = -45

    this.alpha = 1.0
  }

  // 设置小鸟的debug
  debug(){
    // 上层调用者会自己调用这个debug
    this.birdSpeed = input_config.bird_speed._value
    this.jumpHeight = input_config.jump_height._value
  }

  update(){
    //更新旋转角度
    if (this.rotation <= 45){
      this.rotation += 10
    }

    this.fall()

    super.update()
    if (!this.alive){
      return
    }
  }

  draw(){
    var context = this.game.context

    context.save()

    var w2 = this.w / 2
    var h2 = this.h / 2

    context.translate(this.x + w2, this.y + h2)
    if (this.flipX){
      context.scale(-1, 1)
    }
    context.rotate(this.rotation * Math.PI / 180)
    context.translate(-w2, -h2)
    context.globalAlpha = this.alpha
    context.drawImage(this.texture, 0, 0)

    context.restore()
  }
}
