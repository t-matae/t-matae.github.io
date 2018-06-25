(function(ext) {

  // コメントは補足の説明なので書かなくてもいいです

  // Extension が終了するときに呼ばれる
  // 今は特に何もしない
  ext._shutdown = function() {};

  // Extension の状態を返す
  // デバイスが繋がっていないときにはエラーを返したりする
  // ---
  // 返す値, 表示される色, 意味
  //      0,          red, error
  //      1,       yellow, not ready
  //      2,        green, ready
  // ---
  // 今回はデバイスなどは使用しないので常に準備完了
  // ということで 2 を返します。
  ext._getStatus = function() {
    return {status: 2, msg: 'Ready'};
  };

  //////////
  // ブロックの処理
  /////

  // log表示ブロック
  ext.no_operation = () => {
     // no operation
  };


  // log表示ブロック
  ext.log = function(str) {
    alert(str);       // ログを出力するだけ
  };

  // // postのテストブロック
  ext.post_test = function() {
        // Make an AJAX call to the Open Weather Maps API
        $.ajax({
              // url: 'http://192.168.22.108:8080/',
              url: 'http://localhost:8080//',

              // url: 'https://www.muryou-tools.com/test/aaaa.php',
              type: 'POST',
              dataType: 'json',
              data: {"jobs":[{"operation":{"startTime":"2017-12-22 14:20:38.688","touchFlag":"false","actions":[{"x":0,"y":0,"z":10,"speed":0.5,"emotion":"normal","gaze":"on","cheeks":"red","eyecolor":"aqua","complexioncolor":"red","transmittance":0,"delay":0,"reset":"false","talk":""}]},"schedule":"* * * * * *","topic":"yupibow2"}]},

        });
    };
    // // postのテストブロック
    ext.move_to_up = function() {
          // Make an AJAX call to the Open Weather Maps API
          $.ajax({
                // url: 'http://192.168.22.108:8080/',
                url: 'http://localhost:8080//',

                // url: 'https://www.muryou-tools.com/test/aaaa.php',
                type: 'POST',
                dataType: 'json',
                data: {"jobs":[{"operation":{"startTime":"2017-12-22 14:20:38.688","touchFlag":"false","actions":[{"x":10,"y":0,"z":0,"speed":0.5,"emotion":"normal","gaze":"on","cheeks":"red","eyecolor":"aqua","complexioncolor":"red","transmittance":0,"delay":0,"reset":"false","talk":""}]},"schedule":"* * * * * *","topic":"yupibow2"}]},

          });
      };

      // // postのテストブロック
      ext.move_to_down = function() {
            // Make an AJAX call to the Open Weather Maps API
            $.ajax({
                  // url: 'http://192.168.22.108:8080/',
                  url: 'http://localhost:8080//',

                  // url: 'https://www.muryou-tools.com/test/aaaa.php',
                  type: 'POST',
                  dataType: 'json',
                  data: {"jobs":[{"operation":{"startTime":"2017-12-22 14:20:38.688","touchFlag":"false","actions":[{"x":-30,"y":0,"z":0,"speed":0.5,"emotion":"normal","gaze":"on","cheeks":"red","eyecolor":"aqua","complexioncolor":"red","transmittance":0,"delay":0,"reset":"false","talk":""}]},"schedule":"* * * * * *","topic":"yupibow2"}]},

            });
        };

  // ブロックをどういう風に表示するかを書きます
  // ここの書き方は結構難しいので今は説明しません
  var descriptor = {
    blocks: [
      // [' ', 'ログ表示(同期) %s',              'log', 'アラートでログを出力します'],
      // ['w', 'ログ表示(非同期) %s',            'log', 'アラートでログを出力します'],
      // [' ', 'websocet:post (同期)',         'post_test'],
      // ['w', 'websocet:post (非同期)',         'post_test'],
      [' ', '%m.move_to_direction に動かす', 'no_operation','体を右に'],
      [' ', '%s としゃべらせる',               'no_operation', 'ぼく、ユピ坊！'],
      [' ', 'up',         'move_to_up'],
      [' ', 'down',         'move_to_down'],
    ],
    menus: {
      move_to_direction: ['顔を上に','顔を下に','顔を右に','顔を左に','体を右に','体を左に'],
      lessMore: ['<', '>']
    },
  };

  // Scratch に作ったブロックを登録します
  ScratchExtensions.register('Yupibow制御ブロック', descriptor, ext);
})({});
