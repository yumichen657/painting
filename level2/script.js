const rows=10, cols=8, maxMoves=6;
let movesLeft=maxMoves;
const board=document.getElementById("board");
const movesDisplay=document.getElementById("movesLeft");
const paletteBtns=document.querySelectorAll(".color-btn");
movesDisplay.textContent=movesLeft;

const initialColors=[
["red","red","red","red","red","red","red","red"],
["red","yellow","yellow","yellow","yellow","yellow","yellow","red"],
["red","yellow","yellow","green","green","yellow","yellow","red"],
["red","yellow","green","blue","blue","green","yellow","red"],
["red","yellow","green","blue","blue","green","yellow","red"],
["red","yellow","yellow","green","green","yellow","yellow","red"],
["red","red","red","red","red","red","red","red"],
["red","blue","blue","blue","blue","blue","blue","red"],
["red","blue","blue","blue","blue","blue","blue","red"],
["red","red","red","red","red","red","red","red"]
];

let grid=[];
function createBoard(){
  for(let i=0;i<rows;i++){
    grid[i]=[];
    for(let j=0;j<cols;j++){
      const cell=document.createElement("div");
      cell.classList.add("cell");
      cell.style.background=initialColors[i][j];
      cell.dataset.color=initialColors[i][j];
      board.appendChild(cell);
      grid[i][j]=cell;
    }
  }
}

function floodFill(targetColor){
  const originalColor=grid[0][0].dataset.color;
  if(originalColor===targetColor) return;
  function dfs(i,j){
    if(i<0||j<0||i>=rows||j>=cols) return;
    if(grid[i][j].dataset.color!==originalColor) return;
    grid[i][j].dataset.color=targetColor;
    grid[i][j].style.background=targetColor;
    dfs(i+1,j); dfs(i-1,j); dfs(i,j+1); dfs(i,j-1);
  }
  dfs(0,0);
}

function checkWin(){
  const color=grid[0][0].dataset.color;
  for(let i=0;i<rows;i++){
    for(let j=0;j<cols;j++){
      if(grid[i][j].dataset.color!==color) return false;
    }
  }
  return true;
}

paletteBtns.forEach(btn=>{
  btn.onclick=()=>{
    if(movesLeft<=0) return;
    paletteBtns.forEach(b=>b.classList.remove("selected"));
    btn.classList.add("selected");
    floodFill(btn.dataset.color);
    movesLeft--;
    movesDisplay.textContent=movesLeft;
    if(checkWin()) setTimeout(()=>alert("恭喜過關！"),100);
    else if(movesLeft===0) setTimeout(()=>alert("失敗了，再試一次！"),100);
  };
});

createBoard();
