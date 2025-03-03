const container = document.getElementById('container');
const resetButton = document.getElementById('reset-button');
const gridSizeButton = document.getElementById('grid-size');
const colorMode = document.getElementById('color-mode');

let columns= 16;

function createGrid(numColumns){
   container.innerHTML = '';
   
   for (let i=0;i<numColumns * numColumns; i++){
        const square = document.createElement('div');
        let squareId =container.childElementCount;
        let squareSize = (1 / numColumns) * 100;
        

    
        square.setAttribute('id',squareId + 1);
        square.style.width = squareSize + '%';
        square.style.height = squareSize +'%';
        square.style.flexBasis =squareSize +'%';
        square.classList.add('square');
        container.appendChild(square);
        square.dataset.alpha = 0;

        square.addEventListener('mouseover',() => {
            let alpha = parseFloat(square.dataset.alpha); 
            if (alpha < 1) {
                alpha += 0.1;
                square.dataset.alpha = alpha;
            }
            square.style.backgroundColor =`rgba(73,73,73,${alpha})`;
        });
        container.appendChild(square);
    }
}

createGrid(columns);

function randomNumber(max){
    return Math.floor(Math.random() * (max + 1));
}


colorMode.addEventListener('click',() => {
    resetSketchPad();
    const squares =document.querySelectorAll('.square');

    resetSketchPad();

    squares.forEach ((square) =>{
        square.dataset.alpha = 0;

        square.addEventListener('mouseover',() => {
         let alpha = parseFloat(square.dataset.alpha);
            if (alpha < 1) {
            alpha += 0.1;
            square.dataset.alpha = alpha;
          }  
          let red = randomNumber(255);
          let green = randomNumber(255);
          let blue = randomNumber(255);
          square.style.backgroundColor= `rgba(${red},${green},${blue},${alpha})`;

    });
    });
});

gridSizeButton.addEventListener('click', () =>{
    columns= Number (prompt('Chose a number of columns! (Maximum 100)'));
    
    if (isNaN (newSize) || newSize <= 0) {
        alert ('Not a valid number. Try again!');
        return;
    }
    
    if (newSize > 100) {
        alert (`That's too high. Enter a number less than or equal to 100.`);
        return;
    }
    columns = newSize;

    createGrid(columns);
});

container.addEventListener('dblclick', resetSketchPad);

function resetSketchPad() {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        square.style.backgroundColor = `rgba(0,0,0,0)`;
        square.dataset.alpha = 0;
    });
}



resetButton.addEventListener('click',() => {
      
    createGrid(columns);
    container.classList.add('tilt-shaking');
    resetSketchPad();

    container.addEventListener('animationend', () =>  {
    container.classList.remove('tilt-shaking');
    });
});

