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


  ////////
  // ユピ坊制御

  // Json 制御用テンプレート
  let tempate_json_message = JSON.stringify({jobs:[{operation:{startTime:"2017-12-22 14:20:38.688",touchFlag:"false",actions:[{x:'direction_x',y:'direction_y',z:'direction_z',speed:'speed',emotion:"normal",talk:'sentences',gaze:"on",cheeks:"red",eyecolor:"aqua",complexioncolor:"red",transmittance:0,delay:0,reset:"false"}]},schedule:"******",topic:"yupibow1"}]});
  // var send_massage = JSON.stringify({jobs:[{operation:{startTime:"2017-12-22 14:20:38.688",touchFlag:"false",actions:[{x:'direction_x',y:'direction_y',z:'direction_z',speed:'speed',emotion:"normal",talk:'sentences',gaze:"on",cheeks:"red",eyecolor:"aqua",complexioncolor:"red",transmittance:0,delay:0,reset:"false"}]},schedule:"******",topic:"yupibow1"}]});

  let action_tempate = JSON.stringify({actions:{x:'direction_x',y:'direction_y',z:'direction_z',speed:'speed',emotion:"normal",talk:'sentences',gaze:"on",cheeks:"red",eyecolor:"aqua",complexioncolor:"red",transmittance:0,delay:0,reset:"false"}});

  // not JSON
  // let tempate_notjson_message = {jobs:[{operation:{startTime:"2017-12-22 14:20:38.688",touchFlag:"false",actions:[{x:'direction_x',y:'direction_y',z:'direction_z',speed:'speed',emotion:"normal",talk:'sentences',gaze:"on",cheeks:"red",eyecolor:"aqua",complexioncolor:"red",transmittance:0,delay:0,reset:"false"}]},schedule:"******",topic:"yupibow1"}]};
  var send_notjson_massage = {jobs:[{operation:{startTime:"2017-12-22 14:20:38.688",touchFlag:"false",actions:[{x:'direction_x',y:'direction_y',z:'direction_z',speed:'speed',emotion:"normal",talk:'sentences',gaze:"on",cheeks:"red",eyecolor:"aqua",complexioncolor:"red",transmittance:0,delay:0,reset:"false"}]},schedule:"******",topic:"yupibow1"}]};

  var send_massage = JSON.stringify({jobs:[{operation:{startTime:"2017-12-22 14:20:38.688",touchFlag:"false",actions:'actions_data_array'},schedule:"******",topic:"yupibow1"}]});
  let action_json_tempate = JSON.stringify({x:'direction_x',y:'direction_y',z:'direction_z',speed:'speed_vale',emotion:"emotion_type",talk:'sentences',gaze:"on",cheeks:"red",eyecolor:"aqua",complexioncolor:"red",transmittance:0,delay:0,reset:"false"});
  let action_notjson_tempate = {x:'direction_x',y:'direction_y',z:'direction_z',speed:'speed_vale',emotion:"emotion_type",talk:'sentences',gaze:"on",cheeks:"red",eyecolor:"aqua",complexioncolor:"red",transmittance:0,delay:0,reset:"false"};

  var data = [
    { name : "taro",
      exam : {
        math : 100,
        lang : 100
      },
      grade : "a"
    },
    { name : "jiro", exam : { math : 50, lang : 50 }, grade : "c" },
    { name : "saburo", exam : { math : 10, lang : 10 }, grade : "d" }
  ];



  // 顔を上げる
  ext.move_to_up = () => {

    let send_data = JSON.stringify({jobs:[{operation:{startTime:"2017-12-22 14:20:38.688",touchFlag:"false",actions:[{x:0,y:7,z:0,speed:0.5,emotion:"normal",gaze:"on",cheeks:"red",eyecolor:"aqua",complexioncolor:"red",transmittance:0,delay:0,reset:"false",talk:"上に移動！"}]},schedule:"* * * * * *",topic:"yupibow1"}]});

    $.ajax({
      url: 'http://localhost:8080//',
      type: 'POST',
      dataType: 'json',
      data: send_data,
    });
  };



  // 動かす
  ext.move_to_X = (arg_y) => {
    let send_data = tempate_json_message
                      .replace('sentences','')
                      .replace('direction_y',arg_y);

    $.ajax({
      url: 'http://localhost:8080//',
      type: 'POST',
      dataType: 'json',
      data: send_data,
    });
  };

  // テスト機能
  ext.test_func_button = () => {

    var addData =
      { name : "shiro", exam : { math : 10, lang : 100 }, grade : "b" };

    data.push(addData);
    alert(JSON.stringify(data));
    var test = send_massage.replace('actions_data_array',JSON.stringify(data));
    alert(test);

  };



  ////////////////////
  // 共通変数
  ////////////////////

  // 送信データ変数
  let current_send_templete_data = {
                            x : 0,
                            y : 0,
                            z : 0,
                            speed : 0.0,
                            emotion : "normal",
                            talk : "",
                            gaze : "on",
                            cheeks : "red",
                            eyecolor : "aqua",
                            complexioncolor : "red",
                            transmittance : 0,
                            delay : 0,
                            reset : "false"
                          };

  let current_send_data = current_send_templete_data;
  let input_send_data = new Array();



  ////////////////////
  // ブロック処理
  ////////////////////

  /////
  // 共有ブロック
  ////


  // 組み合わせ用ブロック
  ext.multi_setting_button = ( arg_x, arg_y, arg_z, arg_speed, arg_emotion, arg_talk) => {

    let arg_set_data = {
                          x : arg_x,
                          y : arg_y,
                          z : arg_z,
                          speed : arg_speed,
                          emotion : arg_emotion,
                          talk : arg_talk,
                          gaze : "on",
                          cheeks : "red",
                          eyecolor : "aqua",
                          complexioncolor : "red",
                          transmittance : 0,
                          delay : 0,
                          reset : "false"
                        };

    current_send_data.x = arg_x;
    current_send_data.y = arg_y;
    current_send_data.z = arg_z;
    current_send_data.speed = arg_speed;
    current_send_data.emotion = arg_emotion;
    current_send_data.talk = arg_talk;

    // alert(JSON.stringify(input_send_data));
    // alert(JSON.stringify(current_send_data));

    input_send_data.push(arg_set_data);

    // alert(JSON.stringify(input_send_data));
    // alert(JSON.stringify(current_send_data));

  };


  // メッセージ送信
  ext.message_send_button = () => {

    if(input_send_data == 0) {
      alert("no input data");
    } else {
      send_notjson_massage.jobs[0].operation.actions = input_send_data;
      var send_data = JSON.stringify(send_notjson_massage);
      // alert(send_data);

      $.ajax({
        url: 'http://localhost:8080//',
        type: 'POST',
        dataType: 'json',
        data: send_data,
      });
    }
  };


  // 変数クリア
  ext.message_clear_button = () => {
    input_send_data = [];
    current_send_data = current_send_templete_data;
  }


  // 入力変数 内容表示
  ext.current_input_message_button = () => {
    return JSON.stringify(input_send_data);
  }


  // 設定済み 変数内容表示
  ext.current_message_button = () => {
    return JSON.stringify(current_send_data);
  }

  // ユピ坊にしゃべらせるブロック
  ext.speak_sentences = (arg_talk) => {

    let arg_set_data = {
                          x : current_send_data.x,
                          y : current_send_data.y,
                          z : current_send_data.z,
                          speed : current_send_data.speed,
                          emotion : current_send_data.emotion,
                          talk : current_send_data.talk,
                          gaze : "on",
                          cheeks : "red",
                          eyecolor : "aqua",
                          complexioncolor : "red",
                          transmittance : 0,
                          delay : 0,
                          reset : "false"
                        };

    current_send_data.talk = arg_talk;
    arg_set_data.talk = arg_talk;
    input_send_data.push(arg_set_data);

  };


  // ユピ坊の動き設定ブロック：メニュー表示
  ext.move_to_mulit_direction = (arg_direction) => {

    let arg_set_data = {
                          x : current_send_data.x,
                          y : current_send_data.y,
                          z : current_send_data.z,
                          speed : current_send_data.speed,
                          emotion : current_send_data.emotion,
                          talk : current_send_data.talk,
                          gaze : "on",
                          cheeks : "red",
                          eyecolor : "aqua",
                          complexioncolor : "red",
                          transmittance : 0,
                          delay : 0,
                          reset : "false"
                        };

    arg_set_data.talk = "";

    switch (arg_direction) {
      case "顔を上に":
        current_send_data.y = 7;
        arg_set_data.y = 7;
        break;

      case '顔を下に':
        current_send_data.y = -20;
        arg_set_data.y = -20;
        break;

      case '顔を右に':
        current_send_data.x = 10;
        arg_set_data.x = 10;
        break;

      case '顔を左に':
        current_send_data.x = -10;
        arg_set_data.x = -10;
        break;

      case '体を右に':
        current_send_data.z = 60;
        arg_set_data.z = 60;
        break;

      case '体を左に':
        current_send_data.z = -60;
        arg_set_data.z = -60;
        break;
      default:
        current_send_data = current_send_templete_data;
        arg_set_data = current_send_data;
    }

    input_send_data.push(arg_set_data);

  };


  // ユピ坊の動き設定ブロック：単一方向  顔を下げる
  ext.move_to_init = () => {

    let arg_set_data = {
                          x : current_send_data.x,
                          y : current_send_data.y,
                          z : current_send_data.z,
                          speed : current_send_data.speed,
                          emotion : current_send_data.emotion,
                          talk : current_send_data.talk,
                          gaze : "on",
                          cheeks : "red",
                          eyecolor : "aqua",
                          complexioncolor : "red",
                          transmittance : 0,
                          delay : 0,
                          reset : "false"
                        };

    current_send_data.x = 0;
    current_send_data.y = 0;
    current_send_data.z = 0;
    current_send_data.speed = 0.5;
    arg_set_data.x = 0;
    arg_set_data.y = 0;
    arg_set_data.z = 0;
    arg_set_data.speed = 0.5;
    input_send_data.push(arg_set_data);

  };



  // ユピ坊の動き設定ブロック：単一方向  上下
  ext.move_to_updown = (arg_updown) => {

    let arg_set_data = {
                          x : current_send_data.x,
                          y : current_send_data.y,
                          z : current_send_data.z,
                          speed : current_send_data.speed,
                          emotion : current_send_data.emotion,
                          talk : current_send_data.talk,
                          gaze : "on",
                          cheeks : "red",
                          eyecolor : "aqua",
                          complexioncolor : "red",
                          transmittance : 0,
                          delay : 0,
                          reset : "false"
                        };

    current_send_data.y = arg_updown;
    arg_set_data.y = arg_updown;
    input_send_data.push(arg_set_data);

  };


  // ユピ坊の動き設定ブロック：単一方向  左右
  ext.move_to_leftright = (arg_leftright) => {

    let arg_set_data = {
                          x : current_send_data.x,
                          y : current_send_data.y,
                          z : current_send_data.z,
                          speed : current_send_data.speed,
                          emotion : current_send_data.emotion,
                          talk : current_send_data.talk,
                          gaze : "on",
                          cheeks : "red",
                          eyecolor : "aqua",
                          complexioncolor : "red",
                          transmittance : 0,
                          delay : 0,
                          reset : "false"
                        };

    current_send_data.z = arg_leftright;
    arg_set_data.z = arg_leftright;
    input_send_data.push(arg_set_data);

  };


  // ユピ坊の動き設定ブロック：単一方向  右左回
  ext.move_to_rotation = (arg_rotation) => {

    let arg_set_data = {
                          x : current_send_data.x,
                          y : current_send_data.y,
                          z : current_send_data.z,
                          speed : current_send_data.speed,
                          emotion : current_send_data.emotion,
                          talk : current_send_data.talk,
                          gaze : "on",
                          cheeks : "red",
                          eyecolor : "aqua",
                          complexioncolor : "red",
                          transmittance : 0,
                          delay : 0,
                          reset : "false"
                        };

    current_send_data.x = arg_rotation;
    arg_set_data.x = arg_rotation;
    input_send_data.push(arg_set_data);

  };

  // ユピ坊の動き設定ブロック：単一方向  右左回
  ext.set_emotion = (arg_emotion) => {

    let arg_set_data = {
                          x : current_send_data.x,
                          y : current_send_data.y,
                          z : current_send_data.z,
                          speed : current_send_data.speed,
                          emotion : current_send_data.emotion,
                          talk : current_send_data.talk,
                          gaze : "on",
                          cheeks : "red",
                          eyecolor : "aqua",
                          complexioncolor : "red",
                          transmittance : 0,
                          delay : 0,
                          reset : "false"
                        };

    switch(arg_emotion){
      case "寝てる":
        arg_emotion = "close";
        break;

      case "笑顔":
        arg_emotion = "smile";
        break;

      case "ふつう":
        arg_emotion = "normal";
        break;

      case "怒っている":
        arg_emotion = "angry";
        break;

      case "悲しい":
        arg_emotion = "sad";
        break;

      default:
        arg_emotion = "normal";
        break;
    }

    current_send_data.emotion = arg_emotion;
    arg_set_data.emotion = arg_emotion;
    input_send_data.push(arg_set_data);

  };

  // ユピ坊の動き設定ブロック：単一方向  右左回
  ext.set_speed = (arg_speed) => {

    let arg_set_data = {
                          x : current_send_data.x,
                          y : current_send_data.y,
                          z : current_send_data.z,
                          speed : current_send_data.speed,
                          emotion : current_send_data.emotion,
                          talk : current_send_data.talk,
                          gaze : "on",
                          cheeks : "red",
                          eyecolor : "aqua",
                          complexioncolor : "red",
                          transmittance : 0,
                          delay : 0,
                          reset : "false"
                        };

    current_send_data.emotion = arg_speed;
    arg_set_data.emotion = arg_speed;
    input_send_data.push(arg_set_data);

  };

  // ブロック表示
  var descriptor = {
    blocks: [
      // 共通ブロック
      [' ', ' message_send ',           'message_send_button'              ],
      [' ', ' message_clear ',          'message_clear_button'             ],
      ['r', ' current_input_message ',  'current_input_message_button'     ],
      ['r', ' current_message ',        'current_message_button'           ],

      // 複合ブロック
      // [' ', ' 顔上下 : %n , 体左右 : %n , 顔傾き : %n , うごく速さ : %n , 表情 : %s , 話す内容 : %s  ',  'multi_setting_button' , 0, 0, 0, 0.0, "normal", "初期値"],
      [' ', ' X: %m.move_to_X_direction Y: %m.move_to_Y_direction Z: %m.move_to_Z_direction speed: %m.speed_range emotion : %m.emotion_type talk : %s ',  'multi_setting_button' , 0, 0, 0, 0.0, "normal", ""],

      [' ', '初期位置に戻る',                 'move_to_init'                 ],
      [' ', '%s としゃべらせる',           'speak_sentences',            'ぼく、ユピ坊！' ],
      [' ', '%m.move_to_direction に動かす', 'move_to_mulit_direction', '顔を上に'      ],

      //単一ブロック
      [' ', '顔を上下に %m.move_to_Y_direction 度動かす',  'move_to_updown',     0           ],
      [' ', '体を左右に %m.move_to_Z_direction 度動かす',  'move_to_leftright',  0           ],
      [' ', '顔を左右に %m.move_to_X_direction 度回す',    'move_to_rotation',   0           ],
      [' ', '気分を %m.emotion_jp_type にする',           'set_emotion',       "normal"     ],
      [' ', 'うごく速さを %m.speed_range にする',          'set_speed',          0.5         ],

    ],
    menus: {
      move_to_direction: ['顔を上に','顔を下に','顔を右に','顔を左に','体を右に','体を左に'],
      move_to_X_direction: [10,5,0,-5,-10],
      move_to_Y_direction: [5,0,-5,-10,-20,-30],
      move_to_Z_direction: [120.100,80,60,40,20,10,5,0,-5,-10,-20,-40,-60,-80,-100,-120],
      speed_range:         [1.0,0.75,0.5,0.25,0.1],
      emotion_type:        ["normal","close","smile","angry","sad"],
      emotion_jp_type:     ["目をとじている顔","スマイル","ふつうの顔","怒っている顔","悲しい顔"],
    },
  };

  // Scratch に作ったブロックを登録します
  ScratchExtensions.register('Yupibow制御ブロック', descriptor, ext);
})({});
