const container = document.getElementById('container');
 
function createDiv(){
    const div = document.createElement("div");
    container.appendChild(div)    
}

function divs16by16(){
    for(i = 0; i <= 255; i++){   
        createDiv();
    }
};

divs16by16();

