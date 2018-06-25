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
              data: {"jobs":[{"operation":{"startTime":"2017-12-22 14:20:38.688","touchFlag":"false","actions":[{"x":0,"y":0,"z":0,"speed":0,"emotion":"normal","gaze":"on","cheeks":"red","eyecolor":"aqua","complexioncolor":"red","transmittance":0,"delay":0,"reset":"true","talk":"ｚｚｚｚｚｚｚｚｚ "}]},"schedule":"* * * * * *","topic":"yupibow1"}]},

              // // 通信成功時の処理
              // success: function() {
              //   alert('test_post:success');
              // },
              //
              // // 通信成功時の処理
              // error: function() {
              //   alert('post_test:error');
              // }
        });
    };

  // ブロックをどういう風に表示するかを書きます
  // ここの書き方は結構難しいので今は説明しません
  var descriptor = {
    blocks: [
      [' ', 'ログ表示(同期) %s', 'log', 'アラートでログを出力します'],
      ['w', 'ログ表示(非同期) %s', 'log', 'アラートでログを出力します'],
      [' ', 'websocet:post (同期)', 'post_test'],
      ['w', 'websocet:post (非同期)', 'post_test'],
      // [' ', 'brock:send_test (同期)', 'send_test'],
      // ['w', 'brock:send_test (非同期)', 'send_test'],
    ]
  };

  // Scratch に作ったブロックを登録します
  ScratchExtensions.register('Log Extension', descriptor, ext);
})({});
