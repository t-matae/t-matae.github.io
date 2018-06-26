(function(ext) {

  // Extension が終了するときに呼ばれる
  ext._shutdown = function() {};

  // Extension の状態を返す
  // デバイスが繋がっていないときにはエラーを返したりする
  // ---
  // 返す値, 表示される色, 意味
  //      0,          red, error
  //      1,       yellow, not ready
  //      2,        green, ready
  // ---
  // 今回はデバイスの状態は考慮しないので 2,Ready にする
  ext._getStatus = function() {
    return {status: 2, msg: 'Ready'};
  };


  //////////
  // 各ブロックの処理
  //////////

  // debug用
  // no operation
  ext.no_operation = () => {
     // no operation
  };

  // ScratchX上でlog表示
  ext.log_alert = (str) => {
    alert(str);         // ログをアラート表示するだけ
  };

  // ユピ坊制御
  // 初期位置
  ext.move_to_init = function() {

    var send_data = JSON.stringify({jobs:[{operation:{startTime:"2017-12-22 14:20:38.688",touchFlag:"false",actions:[{x:0,y:0,z:0,speed:0.5,emotion:"normal",gaze:"on",cheeks:"red",eyecolor:"aqua",complexioncolor:"red",transmittance:0,delay:0,reset:"false",talk:"初期位置に移動！"}]},schedule:"******",topic:"yupibow1"}]});

    $.ajax({
      url: 'http://localhost:8080//',
      type: 'POST',
      dataType: 'json',
      data: send_data,
    });
  };

  // 顔を上げる
  ext.move_to_up = function() {

    var send_data = JSON.stringify({jobs:[{operation:{startTime:"2017-12-22 14:20:38.688",touchFlag:"false",actions:[{x:0,y:7,z:0,speed:0.5,emotion:"normal",gaze:"on",cheeks:"red",eyecolor:"aqua",complexioncolor:"red",transmittance:0,delay:0,reset:"false",talk:"上に移動！"}]},schedule:"* * * * * *",topic:"yupibow1"}]});

    $.ajax({
      url: 'http://localhost:8080//',
      type: 'POST',
      dataType: 'json',
      data: send_data,
    });
  };

  // postのテストブロック
  ext.move_to_down = function() {

    var send_data = JSON.stringify({jobs:[{operation:{startTime:"2017-12-22 14:20:38.688",touchFlag:"false",actions:[{x:0,y:-30,z:0,speed:0.5,emotion:"normal",gaze:"on",cheeks:"red",eyecolor:"aqua",complexioncolor:"red",transmittance:0,delay:0,reset:"false",talk:"下に移動！"}]},schedule:"* * * * * *",topic:"yupibow1"}]});

    $.ajax({
      url: 'http://localhost:8080//',
      type: 'POST',
      dataType: 'json',
      data: send_data,
    });
  };

  // ブロック表示
  var descriptor = {
    blocks: [
      [' ', '%m.move_to_direction に動かす', 'no_operation',  '体を右に'      ],
      [' ', '%s としゃべらせる',              'no_operation',  'ぼく、ユピ坊！' ],
      [' ', 'up',                           'move_to_up'    ],
      [' ', 'down',                         'move_to_down'  ],
      [' ', '初期位置に戻る',                 'move_to_init'  ],
    ],
    menus: {
      move_to_direction: ['顔を上に','顔を下に','顔を右に','顔を左に','体を右に','体を左に'],
    },
  };

  // Scratch に作ったブロックを登録します
  ScratchExtensions.register('Yupibow制御ブロック', descriptor, ext);
})({});
