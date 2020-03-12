class Particle extends YanImage{
  constructor(game){
    super(game, 'particle')
    this.setup()
  }
  //烟花是我们放的，所以位置也是自己设置的
  init(x, y, vx, vy){
    this.x = x
    this.y = y
    this.vx = vx
    this.vy = vy
  }
  setup(){
    this.lifes = 6
  }
  update(){
    this.lifes--
    this.x += this.vx
    this.y += this.vy
    var factor = 0.2
    this.vx += factor * this.vx
    this.vy += factor * this.vy
  }
  //YanImage已经有自己的draw方法了
}
class YanParticleSystem{
  constructor(game){
    this.game = game
    this.setup()
  }
  static new(game){
    return new this(game)
  }
  setup(){
    this.duration = 5
    this.x = 150
    this.y = 150
    this.numberOfParticles = 500
    this.particles = []
  }
  draw(){
    // TODO: 应该在scene中自己删除自己才对，因为它自己在elements中
    // if (this.duration<0){
    //   return
    // }
    // 把所有小火花都画出来
    for (var p of this.particles) {
      //火花的绘制也是自己完成的
      p.draw()
    }
  }
  update(){
    this.duration--
    //必须得有update，因为烟花自己的行为是火星散落
    //添加小火花
    //保证添加的火花数量不超界
    if (this.particles.length < this.numberOfParticles){
      var p = Particle.new(this.game)
      //初始化火花的坐标
      var s = 2
      var vx = randomBetween(-s, s)
      var vy = randomBetween(-s, s)

      p.init(this.x, this.y, vx, vy)
      this.particles.push(p)
    }
    //更新所有小花火
    for (var p of this.particles) {
      //火花的坐标更新也都是自己完成的
      p.update()
    }
    //删除所有死掉的小火花
    this.particles = this.particles.filter(p => p.lifes > 0)
  }

  removeSelf(es){
    for (var i = 0; i < es.length; i++) {
      if (this == es[i]){
        es.splice(i,1)
      }
    }
  }
}
