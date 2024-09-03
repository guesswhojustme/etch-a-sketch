const drawingContainer = document.getElementById('container');
const button = document.getElementById('btn');

function createDiv(size) {
    const gridDiv = document.createElement("div");
    gridDiv.style.width = `${size}px`;
    gridDiv.style.height = `${size}px`;
    gridDiv.className = "divman"
    drawingContainer.appendChild(gridDiv);    
}

function divDefault(){
    const size = 800 / 16; 
    for (let i = 0; i < 16 * 16; i++) {   
        createDiv(size);
    }
};

divDefault();

button.addEventListener('click', () => {
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



