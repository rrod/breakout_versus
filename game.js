////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var session_id = 12345; //[];

var express = require('express');
var app = express();

app.use(express.static(__dirname));
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var player_1_coord_y_server;
app.all('/get_initial_game_data', function(req, res){
  req.on('data', function(data){
    // player_1_coord_y_server = data.toString();
    // console.log(player_1_coord_y_server);
    var data2 = JSON.parse("[" + data + "]");
    player_1_coord_y_server = data2[0];
    player_1_ball_direction_server = parseInt(data2[1].toString());
    player_1_ball_x_server = data2[2];
    player_1_ball_y_server = data2[3];
    player_1_ball_collision_server = data2[4];

    // console.log(player_1_ball_x_server + "_" + player_1_ball_y_server);
  });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.all('/player_1_move', function(req, res){
  req.on('data', function(data){
    player_1_coord_y_server = parseInt(player_1_coord_y_server) + parseInt(data.toString()); // save the position wanted
  });

  // console.log(player_1_coord_y_server.toString());
  // console.log(player_1_ball_direction_server.toString());

  res.send(player_1_coord_y_server.toString()); // allow the position wanted
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var player_1_ball_direction_server = undefined;
app.all('/player_1_ball_data', function(req, res){
  req.on('data', function(data){
    player_1_ball_direction_server = parseInt(data.toString());
    // console.log(player_1_ball_direction_server)
  });

  res.send(player_1_ball_direction_server.toString());
});

var player_1_ball_location_server = [];
var player_1_ball_x_server = undefined;
var player_1_ball_y_server = undefined;
app.all('/player_1_ball_location', function(req, res){
  req.on('data', function(data){
    var data2 = JSON.parse("[" + data + "]");
    player_1_ball_x_server = data2[0];
    player_1_ball_y_server = data2[1];
    // player_1_ball_direction_server = parseInt(data2[1].toString());
    // console.log(player_1_ball_direction_server)
  });

  // console.log(player_1_ball_x_server + ", " + player_1_ball_y_server);

  player_1_ball_location_server[0] = player_1_ball_x_server;
  player_1_ball_location_server[1] = player_1_ball_y_server;
  res.send(player_1_ball_location_server.toString());
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WORKING ... BUT NOT SURE IF WORKING CORRECTLY
var player_1_ball_collision_server = undefined;
app.all('/player_1_ball_collision', function(req, res){
  req.on('data', function(data){
    player_1_ball_collision_server = parseInt(data.toString());

    if (player_1_ball_collision_server === 0){
      player_1_ball_collision_server = 1
    }else{
      player_1_ball_collision_server = 0;
    }

    console.log(player_1_ball_collision_server);
  });

  res.send(player_1_ball_collision_server.toString());
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var num_players_available = 0;
var player_1 = 0;
var player_2 = 0;
// app.all('/get_looking_for_game', function(req, res){
//   num_players_available += 1;
//
//   if (player_1 === 0){
//     player_1 = num_players_available;
//   }
//
//   if (player_1 != num_players_available){
//     player_2 = num_players_available;
//   }
//
//   console.log("Players: " + num_players_available);
//
//   if (num_players_available >= 2){
//     // remove those players from the queue
//     num_players_available = 0;
//
//     // create a new session id for both players
//     session_id = 555;
//
//     // send session id to both players
//
//   }
// });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.all('/get_session_id', function(req, res){
  res.send(session_id.toString());
  //res.send(session_id[0].toString());
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var server = app.listen(8081, function(){
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////