class Game{
  constructor(fps, images, runCallback){
    //设置参数
    window.fps = fps
    this.images = images
    this.runCallback = runCallback

    //场景初始化
    this.scene = null
    this.actions = {}
    this.keydowns = {}
    //得到画布和上下文
    this.canvas = document.querySelector('#id-canvas')
    this.context = this.canvas.getContext('2d')

    //events
    var self = this
    window.addEventListener('keydown', event=>{
      //存按键的状态
      self.keydowns[event.key] = 'down'
    })
    window.addEventListener('keyup', event=>{
      //存按键的状态
      self.keydowns[event.key] = 'up'
    })

    this.init()
  }

  init(){
    var game = this
    var cnt = 0
    var names = Object.keys(game.images)

    for (let i = 0; i < names.length; i++) {
      let name = names[i]
      let path = game.images[name]
      let img = new Image()
      img.src = path
      // img加载完成后执行
      img.onload = function(){
        game.images[name] = img
        ++cnt
        if (cnt == names.length){
          game._start()
        }
      }
    }
  }
  _start(){
    // 调用main给的回调函数
    this.runCallback(this)
  }

  registerAction(key, callback){
    this.actions[key] = callback
  }

  static instance(...args){
    this.i = this.i || new this(...args)
    return this.i
  }

  drawImage(img){
    this.context.drawImage(img.texture, img.x, img.y)
  }

  imageByName(name){
    var game = this
    var img = game.images[name]
    var image = {
      w: img.width,
      h: img.height,
      image: img,
    }
    return image
  }

  textureByName(name){
    var game = this
    var img = game.images[name]
    return img
  }
  replaceScene(scene){
    this.scene = scene
  }

  update(){
    this.scene.update()
  }
  draw(){
    this.scene.draw()
  }


  runloop(){
    var actionKeys = Object.keys(this.actions)

    for (var i = 0; i < actionKeys.length; i++) {
      var key = actionKeys[i]
      var status = this.keydowns[key]

      if (status == 'down'){
        this.actions[key]('down')
      } else if (status == 'up') {
        this.actions[key]('up')
        this.keydowns[key] = null
      }
    }

    this.update()
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.draw()

    var g = this
    setTimeout(function(){
      g.runloop()
    }, 1000/window.fps)
  }

  runWithScene(scene){
    var g = this
    g.scene = scene
    setTimeout(function(){
      g.runloop()
    }, 1000/window.fps)
  }
}
