const drawingContainer = document.getElementById('container');
const setGridBtn = document.getElementById('set-btn');
const penBtn = document.getElementById('pen-btn');
const eraserBtn = document.getElementById('eraser-btn');
const clearBtn = document.getElementById('clear-btn');
const hoverBtn = document.getElementById('hover-btn');
const brushBtn = document.getElementById('brush-btn');
const rainbowBtn = document.getElementById('rainbow-btn');
const colorInput = document.getElementById('colorPicker');

let isEraserActive = false;
let isPenActive = false;
let isHoverActive = false;
let isDrawing = false; 
let isRainbowActive = false; 
let penColor = "black"; 

eraserBtn.addEventListener('click', () => {
    isEraserActive = true;
    isPenActive = false;
    isHoverActive = false; 
    isRainbowActive = false;
});

penBtn.addEventListener('click', () => {
    isPenActive = true;
    isEraserActive = false;
    isHoverActive = false;  
    isRainbowActive = false;
});

brushBtn.addEventListener('click', () => {

});

hoverBtn.addEventListener('click', () => {
    isHoverActive = true;
    isPenActive = false;
    isEraserActive = false; 
    isRainbowActive = false;
});

clearBtn.addEventListener('click', () => {
    location.reload();
});

rainbowBtn.addEventListener('click', () =>{
    isRainbowActive = true;
    isPenActive = false;
    isEraserActive = false;
    isHoverActive = false;
});

function newColor(){
    penColor = this.value;
}
colorInput.addEventListener("change", newColor)

function getRandomColor() {
    const randomHue = Math.random() * 360;
    return `hsl(${randomHue}, 70%, 80%)`;
}

function createDiv(size) {
    const gridDiv = document.createElement("div");
    gridDiv.style.width = `${size}px`;
    gridDiv.style.height = `${size}px`;

    gridDiv.addEventListener('mousedown', () => {
        if (isPenActive) {
            isDrawing = true;
            gridDiv.style.backgroundColor = penColor;
        } else if (isRainbowActive) {
            isDrawing = true;
            gridDiv.style.backgroundColor = getRandomColor(); 
        }
    });

    gridDiv.addEventListener('mouseover', () => {
        if (isHoverActive) {
            gridDiv.style.backgroundColor = penColor;
        } else if (isEraserActive) {
            gridDiv.style.backgroundColor = ""; 
        } else if (isDrawing) {
            if (isRainbowActive) {
                gridDiv.style.backgroundColor = getRandomColor(); 
            } else {
                gridDiv.style.backgroundColor = penColor;
            }
        }
    });

    document.addEventListener('mouseup', () => {
        isDrawing = false;
    });

    drawingContainer.appendChild(gridDiv);
}

function divDefault(){
    const size = 800 / 16; 
    for (let i = 0; i < 16 * 16; i++) {   
        createDiv(size);
    }
};

divDefault();

setGridBtn.addEventListener('click', () => {
    let val = prompt("SET NUMBER OF SQUARES PERSIDE (100max)");
    while (drawingContainer.firstChild) {
        drawingContainer.removeChild(drawingContainer.firstChild);
    }
    if(val < 101){
        const size = 800 / val;
        for(i = 0; i < val * val; i++){
            createDiv(size);
        }
    } 
    else{
        divDefault();
        alert("exceeded the limits");
    }
});



