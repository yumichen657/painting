const rows3=10, cols3=8, maxMoves3=7;
let movesLeft3=maxMoves3;
const board3=document.getElementById("board");
const movesDisplay3=document.getElementById("movesLeft");
const paletteBtns3=document.querySelectorAll(".color-btn");
movesDisplay3.textContent=movesLeft3;

const initialColors3=[
["blue","blue","blue","blue","blue","blue","blue","blue"],
["blue","green","green","green","green","green","green","blue"],
["blue","green","yellow","yellow","yellow","yellow","green","blue"],
["blue","green","yellow","red","red","yellow","green","blue"],
["blue","green","yellow","red","red","yellow","green","blue"],
["blue","green","yellow","yellow","yellow","yellow","green","blue"],
["blue","green","green","green","green","green","green","blue"],
["blue","blue","blue","blue","blue","blue","blue","blue"],
["blue","blue","blue","blue","blue","blue","blue","blue"],
["blue","blue","blue","blue","blue","blue","blue","blue"]
];

let grid3=[];
function createBoard3(){
  for(let i=0;i<rows3;i++){
    grid3[i]=[];
    for(let j=0;j<cols3;j++){
      const cell=document.createElement("div");
      cell.classList.add("cell");
      cell.style.background=initialColors3[i][j];
      cell.dataset.color=initialColors3[i][j];
      board3.appendChild(cell);
      grid3[i][j]=cell;
    }
  }
}

function floodFill3(targetColor){
  const originalColor=grid3[0][0].dataset.color;
  if(originalColor===targetColor) return;
  function dfs(i,j){
    if(i<0||j<0||i>=rows3||j>=cols3) return;
    if(grid3[i][j].dataset.color!==originalColor) return;
    grid3[i][j].dataset.color=targetColor;
    grid3[i][j].style.background=targetColor;
    setTimeout(()=>{},50);
    dfs(i+1,j); dfs(i-1,j); dfs(i,j+1); dfs(i,j-1);
  }
  dfs(0,0);
}

function checkWin3(){
  const color=grid3[0][0].dataset.color;
  for(let i=0;i<rows3;i++){
    for(let j=0;j<cols3;j++){
      if(grid3[i][j].dataset.color!==color) return false;
    }
  }
  return true;
}

paletteBtns3.forEach(btn=>{
  btn.onclick=()=>{
    if(movesLeft3<=0) return;
    paletteBtns3.forEach(b=>b.classList.remove("selected"));
    btn.classList.add("selected");
    floodFill3(btn.dataset.color);
    movesLeft3--;
    movesDisplay3.textContent=movesLeft3;
    if(checkWin3()) setTimeout(()=>alert("恭喜過關！"),100);
    else if(movesLeft3===0) setTimeout(()=>alert("失敗了，再試一次！"),100);
  };
});

createBoard3();
