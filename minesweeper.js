// Good luck!

$(document).ready(function(){

    // Inject HTML
    var size = 20;
    $table = $('#minesweeper');
    $table.html("");
    for(var i=0;i<=size-1;i+=1){
      $table.append("<tr class='unopened'></tr>")
      for(var j=0;j<=size-1;j+=1){
        $table.find('tr').last().append("<td class='unopened' id = '" + i + "_" + j + "'></td>")
      }
    }

  //New game
  //Defining bombs
  event.preventDefault();
  bombs = [];
  row = [];
  prob = 0.1;
  for(var i=0; i<=size - 1; i+=1){
    for(var j=0;j<=size - 1; j+=1){
      if(Math.random() <= prob){
        hasBomb = true;
      } else{
        hasBomb = false;
      };
      row[j] = hasBomb;
    }
    bombs[i] = row;
    row = [];
  }
  start();

});


//Click on field
function start(){
  $('td').on('click',function(){
    var col = $(this).parent().children().index($(this));
    var row = $ (this).parent().parent().children().index($(this).parent());
    blowUp = bombs[row][col];
    if(blowUp === true){
      $(this).addClass("mine");
    } else {
      if(bombsAround(row,col)==0){
        clearArea(row,col);
      }else{
        $cell = $("#" + row + "_" + col);
        openCell($cell,row,col);
      }
    };
  });
}

function clearArea(row, col){
  sweep1(row,col);
  sweep2(row,col);
  sweep3(row,col);
  sweep4(row,col);
  // sweep5(row,col);
  // sweep6(row,col);
}


function sweep1(row,col){
  if (!(bombs[row - 1] === undefined)){
    if(bombs[row - 1][col] === true){
    } else{
      if (bombsAround(row - 1,col) === 0){
        sweep1(row - 1, col)
      }
    }
  }
  $cell = $("#" + row + "_" + col);
  openCell($cell, row, col);
}

function sweep2(row,col){
  if (!(bombs[row + 1] === undefined)){
    if(bombs[row + 1][col] === true){
    } else{
      if (bombsAround(row + 1,col) === 0){
        sweep2(row + 1, col)
      }
    }
  }
  $cell = $("#" + row + "_" + col);
  openCell($cell, row, col);
}

function sweep3(row,col){
  if (!(bombs[col - 1] === undefined)){
    if(bombs[row][col - 1] === true){
    } else{
      if (bombsAround(row,col - 1) === 0){
        sweep3(row, col - 1)
      }
    }
  }
  $cell = $("#" + row + "_" + col);
  openCell($cell, row, col);
}

function sweep4(row,col){
  if (!(bombs[col + 1] === undefined)){
    if(bombs[row][col + 1] === true){
    } else{
      if (bombsAround(row,col + 1) === 0){
        sweep4(row, col + 1)
      }
    }
  }
  $cell = $("#" + row + "_" + col);
  openCell($cell, row, col);
}

  // function sweep5(row,col){
  //   if (!(bombs[col - 1] === undefined) && !(bombs[row - 1] === undefined)){
  //     if(bombs[row - 1][col - 1] === true){
  //     } else{
  //       sweep5(row - 1, col - 1)
  //     }
  //   }
  //   $cell = $("#" + (row - 1) + "_" + (col - 1));
  //   openCell($cell);
  // }

  // function sweep6(row,col){
  //   if (!(bombs[col + 1] === undefined) && !(bombs[row + 1] === undefined)){
  //     if(bombs[row + 1][col + 1] === true){
  //     } else{
  //       sweep6(row + 1, col + 1)
  //     }
  //   }
  //   $cell = $("#" + (row + 1) + "_" + (col + 1));
  //   openCell($cell);
  // }

function bombsAround(row,col){
  var bombsAround = 0;
  if (!(bombs[row - 1] === undefined) && !(bombs[col] === undefined)){
    if(bombs[row - 1][col] === true){
      bombsAround += 1;
    }
  }
  if (!(bombs[row] === undefined) && !(bombs[col - 1] === undefined)){
    if(bombs[row][col - 1] === true){
      bombsAround += 1;
    }
  }
  if (!(bombs[row + 1] === undefined) && !(bombs[col] === undefined)){
    if(bombs[row + 1][col] === true){
      bombsAround += 1;
    }
  }
  if (!(bombs[row] === undefined) && !(bombs[col + 1] === undefined)){
    if(bombs[row][col + 1] === true){
      bombsAround += 1;
    }
  }
  if (!(bombs[row - 1] === undefined) && !(bombs[col - 1] === undefined)){
    if(bombs[row - 1][col - 1] === true){
      bombsAround += 1;
    }
  }
  if (!(bombs[row + 1] === undefined) && !(bombs[col + 1] === undefined)){
    if(bombs[row + 1][col + 1] === true){
      bombsAround += 1;
    }
  }
  if (!(bombs[row - 1] === undefined) && !(bombs[col + 1] === undefined)){
    if(bombs[row - 1][col + 1] === true){
      bombsAround += 1;
    }
  }
  if (!(bombs[row + 1] === undefined) && !(bombs[col - 1] === undefined)){
    if(bombs[row + 1][col - 1] === true){
      bombsAround += 1;
    }
  }
  return bombsAround;
  alert(bombsAround);
}

function openCell($cell, row, col){
  bombsNearby = bombsAround(row,col);
  if(bombsNearby===0){
    $cell.addClass('opened');
  } else if(bombsNearby===1){
    $cell.addClass('mine-neighbour-1');
  } else if(bombsNearby===2){
    $cell.addClass('mine-neighbour-2');
  } else if(bombsNearby===3){
    $cell.addClass('mine-neighbour-3');
  } else if(bombsNearby===4){
    $cell.addClass('mine-neighbour-4');
  } else if(bombsNearby===5){
    $cell.addClass('mine-neighbour-5');
  } else if(bombsNearby===6){
    $cell.addClass('mine-neighbour-6');
  } else if(bombsNearby===7){
    $cell.addClass('mine-neighbour-7');
  } else if(bombsNearby===8){
    $cell.addClass('mine-neighbour-8');
  }
}



