class YanAnimation {
  // cfg是子类传过来的需要加载的数据
  constructor(game, cfg){
    this.game = game
    this.x = cfg.initX
    this.y = cfg.initY

    // 当前状态
    this.currentStatus = cfg.initStatus

    // 所有动画 一次加载
    this.animations = new Map()
    var keys = Object.keys(cfg.status)

    for (var i = 0; i < keys.length; i++) {
      // 给每个状态设置动画
      // key取到的是状态名, 它所对的是一个新的map
      var key = keys[i]
      var value = cfg.status[key]
      var name = value.name
      var cnt = value.count
      this.animations.set(key, [])

      // 给这个状态加元素
      for (var j = 1; j <= cnt; j++) {
        var t = game.textureByName(name + j)
        this.animations.get(key).push(t)
      }
    }
    // //当前动画，也是初始化的动画
    // this.currentAnimations = this.animations.get(this.currentStatus)

    //初始图片
    this.texture = this.frames()[0]
    this.w = this.texture.width
    this.h = this.texture.height
    this.frameIndex = 1
    this.frameCount = this.frames().length

    this.flipX = false
    this.stop = false
  }
  //用静态方法来返回该类实例
   static new(game, cfg){
     return new this(game, cfg)
   }

   changeToStatic(){
     this.stop = true
     this.frameIndex = 1
     this.texture = this.frames()[this.frameIndex]
   }

   frames(){
    var t = this.animations.get(this.currentStatus)
    return t
   }

   update(){
     if (this.stop){
       return
     }
     // 每一个动画都需要切换不同的画面
     this.frameCount--
     if (this.frameCount == 0){
       this.frameCount = 3
       this.frameIndex = (this.frameIndex + 1) % this.frames().length

       //我们在画的时候，用的是这个texture 
       this.texture = this.frames()[this.frameIndex]
     }
   }

   draw(){
   }

   // 切换动画元素
   changeAnimation(newStatus){
     // 修改状态名，由frames()函数提取
     this.currentStatus = newStatus
   }
}



// class YanAnimation {
//   // cfg是子类传过来的需要加载的数据
//   constructor(game, cfg){
//     this.game = game
//     this.config = cfg
//
//     var cnt = this.config['count']
//     var name = this.config['name']
//     for (var i = 1; i <= cnt; i++) {
//       var name = name + i
//       var t = game.textureByName(name)
//       this.animations['bird'].push(t)
//     }
//
//     this.animations = {
//       bird: [],
//     }
//
//      for (var i = 1; i <= 3; i++) {
//        var name = 'bird' + i
//        var t = game.textureByName(name)
//        this.animations['bird'].push(t)
//      }
//
//      this.animationName = 'bird'
//      this.texture = this.frames()[0]
//      this.w = this.texture.width
//      this.h = this.texture.height
//      this.frameIndex = 1
//      this.frameCount = 3
//
//      this.flipX = false
//
//      // 重力加速度
//      this.gy = 10.0
//      this.vy = 0
//
//      // 旋转的角度
//      this.rotation = 0
//
//      // 下降透明
//      this.alpha = 1.0
//   }
//   //用静态方法来返回该类实例
//    static new(game, cfg){
//      return new this(game, cfg)
//    }
//    //当前状态的每一帧
//    frames(){
//      return this.animations[this.animationName]
//    }
//
//    jump(){
//      this.y -= 10
//      //每次跳完之后都把垂直方向的速度归零
//      this.vy = 0
//
//     //跳跃的时候修改旋转角度
//     this.rotation = -45
//
//     this.alpha = 1.0
//    }
//
//    update(){
//      if (this.alpha > 0){
//        this.alpha -= 0.02
//      }
//       //更新重力
//      if (this.y + this.h <= 510){
//        this.y += this.vy
//        this.vy += this.gy * 0.2
//      }
//
//      //更新旋转角度
//      if (this.rotation <= 45){
//        this.rotation += 10
//      }
//
//      this.frameCount--
//      if (this.frameCount == 0){
//        this.frameCount = 3
//        this.frameIndex = (this.frameIndex + 1) % this.frames().length
//
//        //我们在画的时候，用的是这个texture 
//        this.texture = this.frames()[this.frameIndex]
//      }
//    }
//
//    draw(){
//      var context = this.game.context
//
//      context.save()
//
//      var w2 = this.w / 2
//      var h2 = this.h / 2
//
//      context.translate(this.x + w2, this.y + h2)
//      if (this.flipX){
//        context.scale(-1, 1)
//      }
//      context.rotate(this.rotation * Math.PI / 180)
//      context.translate(-w2, -h2)
//      context.globalAlpha = this.alpha
//      context.drawImage(this.texture, 0, 0)
//
//      context.restore()
//    }
//
//    move(x, keyStatus){
//      this.flipX = x < 0
//      this.x += x
//    }
//    changeAnimation(state){
//      this.animationName = state
//    }
// }
