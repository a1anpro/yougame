var _main = function(){
  var images = {
        //多动态动画
        //小鸟飞行
        bird1: 'img/sprites/bluebird-downflap.png',
        bird2: 'img/sprites/bluebird-midflap.png',
        bird3: 'img/sprites/bluebird-upflap.png',

        redbird1: 'img/sprites/redbird-downflap.png',
        redbird2: 'img/sprites/redbird-midflap.png',
        redbird3: 'img/sprites/redbird-upflap.png',

        //背景
        daybg: 'img/sprites/background-day.png',
        nightbg: 'img/sprites/background-night.png',
        ground: 'img/sprites/ground.png',

        pipe: 'img/sprites/pipe-green.png',

        // 粒子
        particle: 'img/particle.png',

        // gameOver
        gameover: 'img/sprites/gameover.png',

        // begin
        begin: 'img/sprites/begin.png',
    }

    var game = Game.instance(30, images, function(game){
      var begin = BeginScene.new(game)
      game.runWithScene(begin)

      window.addEventListener('keydown', function(event){
        var key = event.key
        if (key == 'k'){
          var flappybird = MainScene.new(game)
          game.replaceScene(flappybird)
        }
      })
    })
}
_main()
