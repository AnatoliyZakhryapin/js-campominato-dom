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

// counter scoure
let counter = 0; 

const counterDOMElement = document.getElementById("counter");
//     - Creare evento click sul btn-startDOMElement  
btnStartDOMElement.addEventListener("click", function(){

    //         - Chiamare la funzione "deleteContentDOMElement" per svuotare il nostro contenuto con ogni 
    deleteContentDOMElement(gridDOMElement);
    //         - Dichiarare la variabile "numberElement ed assegnare il valore tramite funzione valueSelect
    const numberElement = valueSelect(selectDOMElement);
    // console.log(numberElement);

    // Dichiarare le variabile 
    let className;
    const minRange = 1;
    let maxRange;
    const number = 16;
    if (numberElement == 10){
        className = "cell cell-10";
        maxRange = 100; 
    } else if (numberElement == 9){
        className = "cell cell-9";
        maxRange = 81;
    } else if (numberElement == 7){
        className = "cell cell-7";
        maxRange = 49;
    }
    // console.log(className)

    // creare array con le bombe
    const bombsArray = getArrayOfRandomIntBetween(minRange,maxRange,number);
    console.log(bombsArray);

    //         - Chiamare la funzione "creaContenDOMElement"
    creaContentDOMElement(numberElement, className, gridDOMElement);
    //         - Dichiarare la variabile "cellDOMElement" per recuperare tutte le celle
    const cellDOMElements = gridDOMElement.querySelectorAll(".cell");
    // console.log(cellDOMElements);

    // RESET counter
    counterDOMElement.innerHTML = 0;
    counter = 0;

    //         - Creare il ciclo for per aggiungere evento su ogni elemento del dom
    for (let i = 0; i < cellDOMElements.length; i++){
        const currentCellElement = cellDOMElements[i];
        // console.log(currentCellElement);

        // - Chiamare l'evento click per currentCell e assegnare la funzione 
        currentCellElement.addEventListener('click', function () {
            const currentNumber =  parseInt(currentCellElement.innerHTML);
			if(isBomb(currentNumber, bombsArray)){
                for (let i = 0; i < bombsArray.length; i++){
                    const iCellToChange = bombsArray[i] - 1;
                    cellDOMElements[iCellToChange].classList.add("bg-red");
                }
                currentCellElement.classList.add("bg-red");
                console.log("Partita Terminata")
                gridDOMElement.innerHTML += `
                        <div class="cover">
                            <div class="messege-game-over">GAME OVER</div>
                        </div>
                    `;;
            } else if (!isBomb(currentNumber, bombsArray)){
                if(!currentCellElement.classList.contains("selected")){
                    currentCellElement.classList.add('selected');
                    counter++;
                }
                //  Logica per assegnazione dei numeri con le bombe presenti all'intorno 
                let controlCell = () => {
                    const line = parseInt(valueSelect(selectDOMElement));
                    const qLine = parseInt(valueSelect(selectDOMElement));
                    // console.log(line, qLine)
                    const last = line * qLine;
                    const array = [];
                    let left = currentNumber - line - 1;
                    let middle = currentNumber - line;
                    let right = currentNumber - line + 1;
                    let n = 3;
                    
                    // - Se si parte dalla prima linea le variabili prendono seguenti valori:
                    if (middle < 0) {
                        left = currentNumber - 1;
                        middle = currentNumber;
                        right = currentNumber + 1;
                        n = 2;
                    }
                    // - Se si parte dalla ultima linea la variabile n prende seguente valore:
                    if (middle + line * 2 > last) {
                        n = 2;
                    }
                    // - Se si parte dalla prima colona di sinistra la variabile left prende seguente valore:
                    if ((left % line) === 0) {
                        left = 0;
                    }
                    // - Se si parte dalla prima colona di sinistra la variabile right prende seguente valore:
                    if (currentNumber % line === 0) {
                        right = 0;
                    }
                    // - Ciclo per stabilire quantità di bombe all'intorno di currenteNumber
                    for (let i = 0; i < n; i++) {
                        // console.log("ciclo " + i)
                        // console.log("left", left)
                        // console.log("middle", middle)
                        // console.log("right", right)
                        if(isBomb(top, bombsArray)){
                            array.push(top)
                        }
                        if(isBomb(middle, bombsArray)){
                            array.push(middle)
                        }
                        if(isBomb(right, bombsArray)
                        ){
                            array.push(right)
                        }
                        if(i < n - 1 ){
                            if (left > 0) {
                                left += line;
                            }
                            middle += line;
                            if(right > 0){
                                right += line;
                            }
                        }
                        // console.log("left", left)
                        // console.log("middle", middle)
                        // console.log("right", right)
                    }
                    // Inserimento del numero delle bombe che ci sono all'intorno
                    let arrayLength = array.length;
                    if (arrayLength === 0){
                        currentCellElement.innerHTML = "";
                    } else {
                        currentCellElement.innerHTML = arrayLength;
                    }
                    if(arrayLength === 1){
                        currentCellElement.classList.add("f-green");
                    } else if (arrayLength === 2 ) {
                        currentCellElement.classList.add("f-blue");
                    } else {
                        currentCellElement.classList.add("f-red");
                    }
                    return array;
                }
                console.log("CONTROL", controlCell())
                console.log(counter);
                counterDOMElement.innerHTML = counter;
                if (counter === (maxRange - number)){
                    gridDOMElement.innerHTML += `
                        <div class="cover">
                            <div class="messege-win">YOU WIN</div>
                        </div>
                    `;;
                }
            }
		})
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

// - funzione crea un array dei numeri random tra minRange e maxRange con un numero massimo di array number 
function getArrayOfRandomIntBetween(minRange,maxRange,number){
    const numbersArray = []; 

    while(numbersArray.length < number){
        // generare un numero random da rangeMin a rangeMAx
        const n = getRandomIntInclusive(minRange,maxRange);

        // SE n non è presente nell'array fare push di n
        if (!numbersArray.includes(n)){
			// pushare il numero nell'array
			numbersArray.push(n);
		}
    }
    // return array con i numeri generati
    return numbersArray;
}

// - funzione getRandomIntInclusive - crea il numero random nel range indicato
function getRandomIntInclusive(min, max){
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1) + min) // The maximum is inclusive and the minimum is inclusive
}

function isBomb(number, bombs){
    if(bombs.includes(number)){
        return true;
    }
    return false;
}