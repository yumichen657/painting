// 溢彩畫染色邏輯
let boardData = [
  ['red','red','red','red','red','red','red','red','red','red'],
  ['red','green','green','green','green','green','green','green','green','red'],
  ['red','green','green','green','green','green','green','green','green','red'],
  ['red','green','green','green','green','green','green','green','green','red'],
  ['red','green','green','green','green','green','green','green','green','red'],
  ['red','green','green','green','green','green','green','green','green','red'],
  ['red','red','red','red','red','red','red','red','red','red'],
  ['red','blue','blue','blue','blue','blue','blue','blue','blue','red']
];

const boardEl = document.getElementById('board');

function renderBoard() {
    boardEl.innerHTML = '';
    for (let i = 0; i < boardData.length; i++) {
        for (let j = 0; j < boardData[i].length; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.style.backgroundColor = boardData[i][j];
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', () => {
                selectedCell(i, j);
            });
            boardEl.appendChild(cell);
        }
    }
}
renderBoard();

let currentColor = null; // 調色盤選擇的顏色
let selectedCells = [];  // 點選的起始區塊

// 調色盤事件
document.querySelectorAll('.color-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
        currentColor = btn.dataset.color;
    });
});

// 點選畫板色塊作為起點
function selectedCell(r, c){
    if(!currentColor) return;
    const oldColor = boardData[r][c];
    if(oldColor === currentColor) return; // 同色不動
    floodFill(r, c, oldColor, currentColor);
    renderBoard();
    checkWin();
}

// 四個方向
const dirs = [[1,0],[-1,0],[0,1],[0,-1]];

// 正確 Flood Fill，只染色起始點相連的區域
function floodFill(r, c, oldColor, newColor){
    if(r<0 || r>=boardData.length || c<0 || c>=boardData[0].length) return;
    if(boardData[r][c] !== oldColor) return;
    boardData[r][c] = newColor;
    for(let d of dirs){
        floodFill(r+d[0], c+d[1], oldColor, newColor);
    }
}

// 勝利判定
function checkWin(){
    const first = boardData[0][0];
    let won = boardData.every(row => row.every(cell => cell === first));
    if(won){
        setTimeout(()=>{ alert('恭喜過關！'); }, 100);
    }
}
