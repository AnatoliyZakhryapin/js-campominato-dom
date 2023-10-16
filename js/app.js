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

    //         - Creare il ciclo for per aggiungere evento su ogni elemento del dom
    for (let i = 0; i < cellDOMElements.length; i++){
        const currentCellElement = cellDOMElements[i];
        // console.log(currentCellElement);

        // - Chiamare l'evento click per currentCell e assegnare la funzione 
        currentCellElement.addEventListener('click', function () {
            const currentNumber =  parseInt(currentCellElement.innerHTML);
			if(bombsArray.includes(currentNumber)){
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
            } else if (!bombsArray.includes(currentNumber)){
                currentCellElement.classList.add('bg-skyblue')
            }
            
			// prendo il numero della casella

			// - SE il numero della casella è presente nell'array di bombe
			// - aggiungialo la classe bg-red
			// - game over
			// - ALTRIMENTI
			// - incrementiamo il punteggio
			// - aggiungo la classe bg-blue
			// - SE utente ha vinto
			// - stampiamo hai vinto con il punteggio
		})
    }
   
    // let counter = 0; // - riassegnamo il valore di counter

    // // - creamo la funzione gridClickListener
    // function gridClickListener (event) {
    //     const currentCellElement = event.target
    //     const currentNumber = parseInt(currentCellElement.innerHTML);
    //     console.log(currentNumber)
    //     if (bombsArray.includes(currentNumber)){
    //         for (let i = 0; i < bombsArray.length; i++){
    //             const iCellToChange = bombsArray[i] - 1;
    //             cellDOMElements[iCellToChange].classList.add("bg-red");
    //         }
    //         const isWinner = false;
    //         console.log("Partita Terminata");
    //         counter = 0;
    //     } else if (!bombsArray.includes(currentNumber)) {
    //         currentCellElement.classList.add("bg-skyblue");
    //         counter++;
    //     } else {
    //         if (counter === (maxRange - number)){
    //             const isWinner = true;
    //             console.log("Partita Terminata Hai");
    //             console.log(counter);
    //             counter = 0;
    //         }
    //     }
        
    //     // - SE utente ha vinto
	// 		// - stampiamo hai vinto con il punteggio
    //     console.log("counter", counter);
    // }
    // // // Rimuove tutti eventi click precedentemente applicati
    // // gridDOMElement.removeEventListener('click', gridClickListener);

    // // Chiama la funzione gridClickListener con evento click sul griDOMElement
    // gridDOMElement.addEventListener('click', gridClickListener);


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
// // - funzione onCellClick()
// function onCellClick(){
//     this.classList.add("selected");
// }

// - funzione onCellClick()
// function onCellClick(bombsArray,currentNumber,currentCellElement){
//     if (bombsArray.includes(currentNumber)){
//         currentCellElement.classList.add("bg-red");
//     } else {
//         currentCellElement.classList.add("bg-skyblue");
//     }
// }

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