// LEVEL 1 - 完整程式 (遵守你提供的遊戲規則)
// boardData: 10x8 (rows x cols)
const levelConfig = {
  boardData: [
    ['red','red','red','red','red','red','red','red','red','red'],
    ['red','green','green','green','green','green','green','green','green','red'],
    ['red','green','green','green','green','green','green','green','green','red'],
    ['red','green','green','green','green','green','green','green','green','red'],
    ['red','green','green','green','green','green','green','green','green','red'],
    ['red','green','green','green','green','green','green','green','green','red'],
    ['red','red','red','red','red','red','red','red','red','red'],
    ['red','blue','blue','blue','blue','blue','blue','blue','blue','red']
  ],
  target: 'blue',
  maxMoves: 2
};

let boardData = JSON.parse(JSON.stringify(levelConfig.boardData)); // copy
const boardEl = document.getElementById('board');
const paletteBtns = document.querySelectorAll('.color-btn');
const helpBtn = document.getElementById('helpBtn');
const tutorial = document.getElementById('tutorial');
const tutorialOk = document.getElementById('tutorialOk');
const runDemoBtn = document.getElementById('runDemo');
const movesLeftEl = document.getElementById('movesLeft');
const targetLabelEl = document.getElementById('targetLabel');

let currentColor = null;
let movesLeft = levelConfig.maxMoves;
targetLabelEl.textContent = levelConfig.target;
movesLeftEl.textContent = movesLeft;

// render board
function renderBoard(){
  boardEl.innerHTML = '';
  for(let r=0;r<boardData.length;r++){
    for(let c=0;c<boardData[r].length;c++){
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.style.backgroundColor = boardData[r][c];
      cell.dataset.r = r;
      cell.dataset.c = c;
      cell.addEventListener('click', ()=> {
        // show quick selection effect
        cell.classList.add('selected');
        setTimeout(()=>cell.classList.remove('selected'),150);

        // must have color selected
        if(!currentColor) return;
        // perform action
        const oldColor = boardData[r][c];
        if(oldColor === currentColor) return; // same color → 無效
        if(movesLeft <= 0) return; // no moves left
        movesLeft--;
        movesLeftEl.textContent = movesLeft;
        floodFill(r,c,oldColor,currentColor);
        renderBoard();
        checkWinLose();
      });
      boardEl.appendChild(cell);
    }
  }
}
renderBoard();

// color palette handlers
paletteBtns.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    // visual selected
    paletteBtns.forEach(b=>b.classList.remove('selected'));
    btn.classList.add('selected');
    currentColor = btn.dataset.color;
  });
});

// help / tutorial
helpBtn.addEventListener('click', ()=> tutorial.style.display = 'flex');
tutorialOk.addEventListener('click', ()=> tutorial.style.display = 'none');

// flood fill (correct: only affects connected region of clicked cell)
const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
function floodFill(r,c,oldColor,newColor){
  if(r<0||r>=boardData.length||c<0||c>=boardData[0].length) return;
  if(boardData[r][c] !== oldColor) return;
  boardData[r][c] = newColor;
  for(let d of dirs){
    floodFill(r+d[0], c+d[1], oldColor, newColor);
  }
}

// win/lose check
function checkWinLose(){
  // win: all cells equal to target color
  const allTarget = boardData.every(row => row.every(cell => cell === levelConfig.target));
  if(allTarget){
    setTimeout(()=> alert('恭喜過關！'), 80);
    return;
  }
  if(movesLeft <= 0){
    // lost
    setTimeout(()=> {
      if(!confirm('步數用完，挑戰失敗。要重試嗎？')) return;
      resetLevel();
    }, 80);
  }
}

// reset
function resetLevel(){
  boardData = JSON.parse(JSON.stringify(levelConfig.boardData));
  movesLeft = levelConfig.maxMoves;
  movesLeftEl.textContent = movesLeft;
  currentColor = null;
  paletteBtns.forEach(b=>b.classList.remove('selected'));
  renderBoard();
}

// DEMO: 示範第一關推薦步驟（兩步示範：把紅 → 綠，然後綠 → 藍）
// 用動畫逐步改變畫面（注意：教學演示不會消耗真正的 movesLeft）
function runDemo(){
  // copy original
  const demo = JSON.parse(JSON.stringify(levelConfig.boardData));
  // step1: 把所有紅變綠 from click at any red that connects them (we simulate red->green on red regions)
  // but to obey rules, demo uses: select red cell at (0,0) and change to green, which will connect green areas
  const demoSteps = [
    {r:0,c:0,newColor:'green'},
    {r:2,c:1,newColor: levelConfig.target} // then green->target (blue)
  ];
  // show sequence visually on the real board but revert afterwards
  let i = 0;
  const originalBoard = JSON.parse(JSON.stringify(boardData));
  function step(){
    if(i>=demoSteps.length){
      // finish: restore original board and close tutorial
      setTimeout(()=>{
        // restore
        boardData = JSON.parse(JSON.stringify(originalBoard));
        renderBoard();
      }, 400);
      return;
    }
    const s = demoSteps[i];
    // apply floodFill on a temporary board for visual effect
    floodFillDemo(s.r, s.c, demo, demo[s.r][s.c], s.newColor);
    // render demo -> map demo to board temporarily
    boardData = JSON.parse(JSON.stringify(demo)); renderBoard();
    i++;
    setTimeout(step, 700);
  }
  step();
}

// floodFill used for demo copy
function floodFillDemo(r,c,board,oldColor,newColor){
  if(r<0||r>=board.length||c<0||c>=board[0].length) return;
  if(board[r][c] !== oldColor) return;
  board[r][c] = newColor;
  for(let d of dirs) floodFillDemo(r+d[0], c+d[1], board, oldColor, newColor);
}

// bind demo button
runDemoBtn.addEventListener('click', runDemo);

// on load: open tutorial automatically
window.addEventListener('load', ()=> {
  tutorial.style.display = 'flex';
});
