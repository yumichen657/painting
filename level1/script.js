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
let currentColor = null;

function renderBoard() {
    boardEl.innerHTML = '';
    for (let i=0;i<boardData.length;i++){
        for (let j=0;j<boardData[i].length;j++){
            const cell = document.createElement('div');
            cell.className='cell';
            cell.style.backgroundColor = boardData[i][j];
            cell.dataset.row=i;
            cell.dataset.col=j;
            cell.addEventListener('click', ()=>{
                cell.classList.add('selected');
                setTimeout(()=>cell.classList.remove('selected'),150);
                if(currentColor) selectedCell(i,j);
            });
            boardEl.appendChild(cell);
        }
    }
}
renderBoard();

// 調色盤事件
document.querySelectorAll('.color-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
        document.querySelectorAll('.color-btn').forEach(b=>b.classList.remove('selected'));
        btn.classList.add('selected');
        currentColor = btn.dataset.color;
    });
});

// Flood Fill
const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
function floodFill(r,c,oldColor,newColor){
    if(r<0||r>=boardData.length||c<0||c>=boardData[0].length) return;
    if(boardData[r][c]!==oldColor) return;
    boardData[r][c]=newColor;
    for(let d of dirs){
        floodFill(r+d[0],c+d[1],oldColor,newColor);
    }
}

// 點選色塊
function selectedCell(r,c){
    const oldColor = boardData[r][c];
    if(oldColor===currentColor) return;
    floodFill(r,c,oldColor,currentColor);
    renderBoard();
    checkWin();
}

// 勝利判定
function checkWin(){
    const first = boardData[0][0];
    if(boardData.every(row=>row.every(cell=>cell===first))){
        setTimeout(()=>alert('恭喜過關！'),100);
    }
}

// 教學控制
const tutorial = document.getElementById('tutorial');
document.getElementById('tutorialOk').addEventListener('click', ()=>{
    tutorial.style.display='none';
});
document.getElementById('helpBtn').addEventListener('click', ()=>{
    tutorial.style.display='flex';
});
