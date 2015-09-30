// CONTROLS
function get_keyboard_input(){
  document.onkeydown = handleKeyDown;
  document.onkeyup = handleKeyUp;

  var currentlyPressedKeys = {};

  function handleKeyDown(event){
    currentlyPressedKeys[event.keyCode] = true;

    //if (String.fromCharCode(event.keyCode) == "F") {}

    handleKeys();
  }


  function handleKeyUp(event){
    currentlyPressedKeys[event.keyCode] = false;
  }


  function handleKeys(){
    // Left cursor key
    if (currentlyPressedKeys[37] || currentlyPressedKeys[65]){
      move_player_character("left");
    }

    // Right cursor key
    if (currentlyPressedKeys[39] || currentlyPressedKeys[68]){
      move_player_character("right");
    }

    // Up W key
    if (currentlyPressedKeys[38]){
      move_player_2_character("up");
    }

    // Down S key
    if (currentlyPressedKeys[40]){
      move_player_2_character("down");
    }

    // Up arrow key
    if (currentlyPressedKeys[87]){
      move_player_character("up");
    }

    // Down arrow key
    if (currentlyPressedKeys[83]){
      move_player_character("down");
    }
  };
};
