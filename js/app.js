// # Griglia Campo Minato

// - Creare il contenuto html statico
//     - Creare il buttone e metterlo nel header
//     - Creare il container con classe "grid"
//         - dentro grid creare la griglia 10 * 10 assegnando classe "cell" ad ogni elemento 

// - Creare il contenuto html tramite js

//     - Dichiarare la variabile "gridDOMElement" per recuperare il nostro DOM dove veranno inseriti le celle
const gridDOMElement = document.querySelector(".grid");
// console.log(gridDOMElement);

//     - Dichiarare la variabile "btnStartDOMElement" per recuperrare il nostro buttone
const btnStartDOMElement = document.getElementById("btn-start");
// console.log(btnStartDOMElement);

//     - Dichiarare la variabile "selectDOMElement" per recuperrare il valore dal nostro select
const selectDOMElement = document.getElementById("select");
// console.log(selectDOMElement);
//     - Creare evento click sul btn-startDOMElement   
btnStartDOMElement.addEventListener("click", function(){
    //         - Chiamare la funzione "deleteContentDOMElement" per svuotare il nostro contenuto con ogni 
    deleteContentDOMElement(gridDOMElement);
    //         - Dichiarare la variabile "numberElement ed assegnare il valore tramite funzione valueSelect
    const numberElement = valueSelect(selectDOMElement);
    // console.log(numberElement);

    // Dichiarare la variabile className
    let className;
    if (numberElement == 10){
        className = "cell cell-10"
    } else if (numberElement == 9){
        className = "cell cell-9"
    } else if (numberElement == 7){
        className = "cell cell-7"
    }
    // console.log(className)
    //         - Chiamare la funzione "creaContenDOMElement"
    creaContentDOMElement(numberElement, className, gridDOMElement);
    //         - Dichiarare la variabile "cellDOMElement" per recuperare tutte le celle
    const cellDOMElements = gridDOMElement.querySelectorAll(".cell");
    // console.log(cellDOMElement);

    //         - Creare il ciclo for per aggiungere evento su ogni elemento del dom
    for (let i = 0; i < cellDOMElements.length; i++){
        const currentCellElement = cellDOMElements[i];
        // console.log(currentCellElement);

        // - Chiamare l'evento click per currentCell e assegnare la funzione "onCellClick"
        currentCellElement.addEventListener("click", onCellClick)
    }
});

// FUNZIONI 
// - funzione deleteContentDOMElement(DOMElement)
function deleteContentDOMElement(DOMElement){
    DOMElement.innerHTML = "";
}
// - funzione valueSelect()
function valueSelect(selectDOMElement){
    return selectDOMElement.value;
}
// - funzione creaContentDOMElement(numberElement, classElement, DOMElement)
function creaContentDOMElement(numberElement, classElement, DOMElement){
    for (let i = 0; i < (numberElement*numberElement); i++ ){
        const n = i + 1;
        const html = `<div class="${classElement}">${n}</div>`;
        DOMElement.innerHTML += html;
    }
}
// - funzione onCellClick()
function onCellClick(){
    this.classList.add("selected");
}