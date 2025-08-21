const rows2=10, cols2=8, maxMoves2=6;
let movesLeft2=maxMoves2;
const board2=document.getElementById("board");
const movesDisplay2=document.getElementById("movesLeft");
const paletteBtns2=document.querySelectorAll(".color-btn");
movesDisplay2.textContent=movesLeft2;

const initialColors2=[
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

let grid2=[];
function createBoard2(){
  for(let i=0;i<rows2;i++){
    grid2[i]=[];
    for(let j=0;j<cols2;j++){
      const cell=document.createElement("div");
      cell.classList.add("cell");
      cell.style.background=initialColors2[i][j];
      cell.dataset.color=initialColors2[i][j];
      board2.appendChild(cell);
      grid2[i][j]=cell;
    }
  }
}

function floodFill2(targetColor){
  const originalColor=grid2[0][0].dataset.color;
  if(originalColor===targetColor) return;
  function dfs(i,j){
    if(i<0||j<0||i>=rows2||j>=cols2) return;
    if(grid2[i][j].dataset.color!==originalColor) return;
    grid2[i][j].dataset.color=targetColor;
    grid2[i][j].style.background=targetColor;
    setTimeout(()=>{},50);
    dfs(i+1,j); dfs(i-1,j); dfs(i,j+1); dfs(i,j-1);
  }
  dfs(0,0);
}

function checkWin2(){
  const color=grid2[0][0].dataset.color;
  for(let i=0;i<rows2;i++){
    for(let j=0;j<cols2;j++){
      if(grid2[i][j].dataset.color!==color) return false;
    }
  }
  return true;
}

paletteBtns2.forEach(btn=>{
  btn.onclick=()=>{
    if(movesLeft2<=0) return;
    paletteBtns2.forEach(b=>b.classList.remove("selected"));
    btn.classList.add("selected");
    floodFill2(btn.dataset.color);
    movesLeft2--;
    movesDisplay2.textContent=movesLeft2;
    if(checkWin2()) setTimeout(()=>alert("恭喜過關！"),100);
    else if(movesLeft2===0) setTimeout(()=>alert("失敗了，再試一次！"),100);
  };
});

createBoard2();
