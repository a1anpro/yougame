//工具场景，是场景的底层，公共场所
class YanScene {
  constructor(game){
    this.game = game
    this.elements = []
    this.debugModeEnabled = true
  }
  static new(...args){
    var i = new this(...args)
    return i
  }
  addElement(thing){
    thing.scene = this
    this.elements.push(thing)
  }
  debug(){
  }
  draw(){
    for (var i = 0; i < this.elements.length; i++) {
      var e = this.elements[i]
      e.draw()
    }
  }
  update(){
    // 如果其中有元素有debug模式的话，则调用它
    if (this.debugModeEnabled){
      for (var i = 0; i < this.elements.length; i++) {
        var e = this.elements[i]
        e.debug && e.debug()
      }
    }

    //同样，更新也是只需要场景自动更新每个元素
    for (var i = 0; i < this.elements.length; i++) {
      this.elements[i].update()
    }
  }
}
