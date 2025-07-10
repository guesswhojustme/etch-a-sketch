const drawingContainer = document.getElementById('container');
const setGridBtn = document.getElementById('set-btn');
const penBtn = document.getElementById('pen-btn');
const eraserBtn = document.getElementById('eraser-btn');
const clearBtn = document.getElementById('clear-btn');
const hoverBtn = document.getElementById('hover-btn');
const rainbowBtn = document.getElementById('rainbow-btn');
const colorInput = document.getElementById('colorPicker');
const fillBtn = document.getElementById('fill-btn');
const activeMsg = document.getElementById('active-state')

//Sets default active states
let isEraserActive = false;
let isPenActive = false;
let isHoverActive = false;
let isDrawing = false; 
let isRainbowActive = false; 

//makes the Eraser button active
eraserBtn.addEventListener('click', () => {
    isEraserActive = true;
    isPenActive = false;
    isHoverActive = false; 
    isRainbowActive = false;
    activeMsg.textContent = "(Eraser is active)"
});

//makes the On Click button active
penBtn.addEventListener('click', () => {
    isPenActive = true;
    isEraserActive = false;
    isHoverActive = false;  
    isRainbowActive = false;
    activeMsg.textContent = "(On Click is active)"
});

//makes the On Hover button active
hoverBtn.addEventListener('click', () => {
    isHoverActive = true;
    isPenActive = false;
    isEraserActive = false; 
    isRainbowActive = false;
    activeMsg.textContent = "(On Hover is active)"
});

//makes the Rainbow Mode button active
rainbowBtn.addEventListener('click', () =>{
    isRainbowActive = true;
    isPenActive = false;
    isEraserActive = false;
    isHoverActive = false;
    activeMsg.textContent = "(Rainbow mode is active)"
});

//Creates the squares inside the container
function createDiv(size) {
    const gridDiv = document.createElement("div");
    gridDiv.style.width = `${size}px`;
    gridDiv.style.height = `${size}px`;
    drawingContainer.appendChild(gridDiv);

    drawingOptions(gridDiv);

    //clears the color of all div
    clearBtn.addEventListener('click', () => {
        gridDiv.style.backgroundColor = "";
    });

    //fills the divs inside the container with colors
    fillBtn.addEventListener('click', () => {
        colors(gridDiv)
    });
};

//Creates and sets the number of squares inside the container base on user input
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
    } else {
        divDefault();
        alert("ERROR INPUT");
    }
});


//Sets the default size of the div
function divDefault(){
    const size = 800 / 16; 
    for (let i = 0; i < 16 * 16; i++) {   
        createDiv(size);
    }
};
divDefault();

//Sets the behaviour of each div base on the drawing buttons clicked
function drawingOptions(div){
    div.addEventListener('mousedown', () => {
        if (isPenActive) {
            isDrawing = true;
            div.style.backgroundColor = colors(div);
        } else if (isRainbowActive) {
            isDrawing = true;
            div.style.backgroundColor = getRandomColor(); 
        } else if (isEraserActive) {
            isDrawing = true;
            div.style.backgroundColor = "";
        }
    });

    div.addEventListener('mouseenter', () => {
        if (isHoverActive) {
            div.style.backgroundColor = colors(div);
        } else if (isEraserActive && isDrawing) {
                div.style.backgroundColor = "";
        } else if (isDrawing) {
            if (isRainbowActive) {
                    div.style.backgroundColor = getRandomColor(); 
            } else {
                    div.style.backgroundColor = colors(div);
            }
        }
    });

    document.addEventListener('mouseup', () => {
        isDrawing = false;
    });
}

//Gets the input color
function colors(div){
    div.style.backgroundColor = colorInput.value;
}

//Gets random color for the rainbow mode
function getRandomColor(){
    const randomHue = Math.random() * 360;
    return `hsl(${randomHue}, 70%, 80%)`;
}
    