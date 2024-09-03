const drawingContainer = document.getElementById('container');
const setGridBtn = document.getElementById('set-btn');
const penBtn = document.getElementById('pen-btn');
const eraserBtn = document.getElementById('eraser-btn');
const clearBtn = document.getElementById('clear-btn');
const hoverBtn = document.getElementById('hover-btn');

let isEraserActive = false;
let isPenActive = false;
let isHoverActive = false;
let isDrawing = false; 

eraserBtn.addEventListener('click', () => {
    isEraserActive = true;
    isPenActive = false;
    isHoverActive = false; 
});

penBtn.addEventListener('click', () => {
    isPenActive = true;
    isEraserActive = false;
    isHoverActive = false;  
});

hoverBtn.addEventListener('click', () => {
    isHoverActive = true;
    isPenActive = false;
    isEraserActive = false; 
});

clearBtn.addEventListener('click', () => {
    location.reload();
});

function createDiv(size) {
    const gridDiv = document.createElement("div");
    gridDiv.style.width = `${size}px`;
    gridDiv.style.height = `${size}px`;
    gridDiv.className = "divman";

    gridDiv.addEventListener('mousedown', () => {
        if (isPenActive) {
            isDrawing = true;
            gridDiv.classList.add('hovered');  
        }
    });

    gridDiv.addEventListener('mouseover', () => {
        if (isHoverActive) {
            gridDiv.classList.add('hovered');
        } else if (isEraserActive) {
            gridDiv.style.backgroundColor = ""; 
            gridDiv.classList.remove('hovered');
        } else if (isDrawing) {
            gridDiv.classList.add('hovered'); 
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



