class Pipes{
   constructor(game){
      this.game = game
      this.pipes = []
      // 固定的上下间距
      this.passSpace = 150

      // 每页管子数
      this.countOfPipes = 3

      // 两根管子之间的间距
      this.distance = 300
      this.debug()

      // 静止
      this.stop = false

      for (var i = 0; i < this.countOfPipes; i++) {
        // 两根管子是上下相对的
        var p1 = YanImage.new(game, 'pipe')
        p1.flipY = true
        //设置x
        p1.x = 500 + i * 200

        var p2 = YanImage.new(game, 'pipe')
        p2.x = p1.x
        this.resetPipesPosition(p1, p2)

        // 每次都是把上下两根push进去了，所以有countOfPipes * 2个管子
        this.pipes.push(p1)
        this.pipes.push(p2)
      }
   }

   static new(game){
     return new this(game)
   }

   resetPipesPosition(p1, p2){
     p1.y = randomBetween(-200, 0)
     p2.y = p1.y + p1.h + this.passSpace
   }

   debug(){
     this.distance = input_config.pipe_distance._value
     this.passSpace = input_config.pass_space._value
   }

   allStop(){
     this.stop = true
   }

   update(){
     if (this.stop){
       return
     }
     // 刷新管子坐标，也就是相对屏幕移动
     for (var i = 0; i < this.pipes.length / 2; i += 2) {
       var p1 = this.pipes[i]
       var p2 = this.pipes[i+1]

       p1.x -= 8
       p2.x -= 8

       if (p1.x < -80){
         p1.x += this.distance * this.countOfPipes
       }
       if (p2.x < -80){
         p2.x += this.distance * this.countOfPipes
         this.resetPipesPosition(p1, p2)
       }
     }
   }

   draw(){
     var context = this.game.context
     for (var p of this.pipes) {
       context.save()
       var w2 = p.w / 2
       var h2 = p.h / 2
       context.translate(p.x + w2, p.y + h2)
       var scaleX = p.flipX ? -1 : 1
       var scaleY = p.flipY ? -1 : 1
       context.scale(scaleX, scaleY)
       context.rotate(p.rotation * Math.PI / 180)
       context.translate(-w2, -h2)
       context.drawImage(p.texture, 0, 0)

       context.restore()
     }
   }
}
