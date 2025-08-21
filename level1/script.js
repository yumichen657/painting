// 第一關初始顏色（10x8）
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

// 初始化畫板
function renderBoard() {
    boardEl.innerHTML = '';
    for (let i=0;i<boardData.length;i++){
        for (let j=0;j<boardData[i].length;j++){
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.style.backgroundColor = boardData[i][j];
            cell.dataset.row = i;
            cell.dataset.col = j;
            boardEl.appendChild(cell);
        }
    }
}
renderBoard();

// 四個方向
const dirs = [[1,0],[-1,0],[0,1],[0,-1]];

// 染色函數（Flood Fill）
function floodFill(r,c,oldColor,newColor){
    if(r<0 || r>=boardData.length || c<0 || c>=boardData[0].length) return;
    if(boardData[r][c] !== oldColor || boardData[r][c] === newColor) return;
    boardData[r][c] = newColor;
    for(let d of dirs){
        floodFill(r+d[0], c+d[1], oldColor, newColor);
    }
}

// 調色盤事件
document.querySelectorAll('.color-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
        const newColor = btn.dataset.color;
        // 從每個格子開始，若它顏色與選中格相同，執行 floodFill
        for(let i=0;i<boardData.length;i++){
            for(let j=0;j<boardData[i].length;j++){
                if(boardData[i][j] === newColor) continue; //已經是新顏色
                floodFill(i,j,boardData[i][j], newColor);
            }
        }
        renderBoard();
        checkWin();
    });
});

// 勝利判定
function checkWin(){
    const first = boardData[0][0];
    let won = boardData.every(row=>row.every(cell=>cell===first));
    if(won){
        setTimeout(()=>{ alert('恭喜過關！'); }, 100);
    }
}
