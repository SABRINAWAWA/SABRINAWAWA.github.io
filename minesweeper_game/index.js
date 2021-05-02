function Mine(tr, td, mineNum) {
  this.tr = tr;   //number of row
  this.td = td;   //number of column
  this.mineNum = mineNum;  //number of mines

  this.squares = [];  
  this.tds = [];  
  this.surplusMine = mineNum;  //number of mines left in the grid

  this.parent = document.querySelector('.gameBox');
}

// Generate random numbers
Mine.prototype.randomNum = function () {
  var square = new Array(this.tr * this.td);
  for(var i = 0; i < square.length; i++) {
    square[i] = i;
  }
  square.sort(function() {
    return 0.5 - Math.random()
  });

  return square.slice(0, this.mineNum);
}

// Initialing mine
Mine.prototype.init = function () {
  var rn = this.randomNum();  //Mine in the board
  var n = 0;
  for(var i = 0; i < this.tr; i++) {
    this.squares[i] = [];
    for(var j = 0; j < this.td; j++) {
      if(rn.indexOf(n++) != -1) {
        this.squares[i][j] = {
          type: 'mine',
          x: j,    
          y: i
        };
      }else {
        this.squares[i][j] = {
          type: 'number',
          x: j,
          y: i,
          value: 0
        };
      }

    }
  }

  this.parent.oncontextmenu = function() {
    return false;
  }
  this.updateNum();
  this.createDom();

  this.mineNumDom = document.querySelector('.mineNum');
  this.surplusMine = this.mineNum;
  this.mineNumDom.innerHTML = this.surplusMine;

  document.querySelector(".result").style.display = 'none';
}

// Create dom
Mine.prototype.createDom = function () {
  var This = this;
  var table = document.createElement('table');
  
  for (var i = 0; i < this.tr; i++) {
    var domTr = document.createElement('tr');
    this.tds[i] = [];

    for (var j = 0; j < this.td; j++) {
      var domTd = document.createElement('td');

      domTd.pos = [i,j];
      domTd.onmousedown = function() {
        This.play(event, this);  
      };
      
      this.tds[i][j] = domTd;

      domTr.appendChild(domTd);
    }

    table.appendChild(domTr);
  }

  this.parent.innerHTML = '';  
  this.parent.appendChild(table);
}

// find eight squares around the square clicked
Mine.prototype.getAround = function(square) {
  var x = square.x;
  var y = square.y;
  var result = [];

  for(var i = x-1; i <= x+1; i++) {
    for(var j = y-1; j <= y+1; j++) {
      if(
        i < 0 ||  
        j < 0 ||  
        i > this.td - 1 ||  
        j > this.tr - 1 ||  
        (i == x && j == y) ||     
        this.squares[j][i].type == 'mine'    
      ) {
        continue;
      }

      result.push([j,i]);   
    }
  }

  return result;
}

// Renew all grid
Mine.prototype.updateNum = function() {
  for(var i = 0; i < this.tr; i++) {
    for(var j = 0; j < this.td; j ++) {
      // Renew all eight squares around the click number
      if(this.squares[i][j].type == 'number') {
        continue;
      }

      var num = this.getAround(this.squares[i][j]);

      for(var k = 0; k < num.length; k++) {
        this.squares[num[k][0]][num[k][1]].value += 1;  //if mines in around eight squares, plus one.
      }
    }
  }
}

Mine.prototype.play = function(ev, obj) {
  var This = this;

  //right click to mark red flag
  if(ev.which == 1 && obj.className != 'flag') {

    var curSquare = this.squares[obj.pos[0]][obj.pos[1]];
    var cl = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];

    if(curSquare.type == 'number') {
      obj.innerHTML = curSquare.value;
      obj.className = cl[curSquare.value];

      //When click 0, then display around squares which are zero.
      if(curSquare.value == 0) {
        obj.innerHTML = '';   // cancel zero display


        function getAllZero(square) {
          var around = This.getAround(square);  

          //get zero until are not zero
          for(var i = 0; i < around.length; i++) {
            var x = around[i][0];
            var y = around[i][1];

            This.tds[x][y].className = cl[This.squares[x][y].value];  

            if(This.squares[x][y].value == 0) {

              if(!This.tds[x][y].check) {
                This.tds[x][y].check = true;
                getAllZero(This.squares[x][y]);  
              }
            }else {
              //if it is not zero, display the number.
              This.tds[x][y].innerHTML = This.squares[x][y].value;
            }
          }
        }

        getAllZero(curSquare);
        
      }
    }else {
      this.gameOver(obj);
    }
  }

  if(ev.which == 3) {

    if(obj.className && obj.className != 'flag') return;

    obj.className = obj.className ? '' : 'flag';    //right click again to cancel flag

    if(obj.className == 'flag') {
      this.mineNumDom.innerHTML = --this.surplusMine;
    } else {
      this.mineNumDom.innerHTML = ++this.surplusMine; 
    }

    // if number of flag is zero then check if flaged sqares are mines.
    if(this.surplusMine == 0) {
      for(var i = 0; i < this.tr; i++) {
        for(var j = 0; j < this.td; j++) {
          if(this.tds[i][j].className == 'flag') {
            if(this.squares[i][j].type != 'mine') {
              this.gameOver();   
              return;
            }
          }
        }
      }
      this.init();
    }

  }
}

//Game Over
Mine.prototype.gameOver = function(clickTd) {

   for(var i = 0; i < this.tr; i++) {
     for(var j = 0; j < this.td; j++) {
       if(this.squares[i][j].type == 'mine') {
         this.tds[i][j].className = 'mine';
       }

       this.tds[i][j].onmousedown = null;
     }
   }

   if(clickTd) {
     clickTd.className = 'redMine';
   }

   var result = document.querySelector(".result");
   result.style.display = 'block';
}

// buttons
var btns = document.querySelectorAll(".level button");
var mine = null;
var li = 0;  
var levelArr = [[9, 9, 10], [16, 16, 40], [28, 28, 99]];  //level of difficulities

for(let i = 0; i < btns.length - 1; i++) {
  btns[i].onclick = function() {
    btns[li].className = '';  
    this.className = 'active';

    mine = new Mine(...levelArr[i]);
    mine.init();

    li = i; 
  }
}

btns[0].onclick();  
btns[3].onclick = function() {
  mine.init();
}
