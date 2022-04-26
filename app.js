document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const resultDisplay = document.getElementById('result')
    const width = 4;
    let score = 0;
    let squares = []

    //creeate a board
    function createBoard() {
        for(var i = 0; i < width*width; i++) {
            square = document.createElement('div')
            square.innerHTML = 0
            gridDisplay.appendChild(square)
            squares.push(square);
        }
        generate();
        generate();
        changeColor();
    }

    //generate a number to the board
    function generate(){
        //recursion created errors, do while loop was used instead
        let t = true
        do{
            let randomNumber = Math.floor(Math.random() * squares.length)
            if(squares[randomNumber].innerHTML == 0){
                squares[randomNumber].innerHTML = 2;
                t = false;
            }
        }while(t);    
        checkForGameOver();
    }

    //move squares
    //move right
    function moveRight(){
        for(let i = 0; i < width*width; i++){
            if(i % 4 === 0){
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i + 1].innerHTML;
                let totalThree = squares[i + 2].innerHTML;
                let totalFour = squares[i + 3].innerHTML;

                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

                let filteredRow = row.filter(num => num);
                let missing = 4 - filteredRow.length
                let zeroes = Array(missing).fill(0);
                let newRow = zeroes.concat(filteredRow);

                squares[i].innerHTML = newRow[0];
                squares[i+1].innerHTML = newRow[1];
                squares[i+2].innerHTML = newRow[2];
                squares[i+3].innerHTML = newRow[3];
            }
        }
    }
    //move left
    function moveLeft(){
        for(let i = 0; i < width*width; i++){
            if(i % 4 === 0){
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i + 1].innerHTML;
                let totalThree = squares[i + 2].innerHTML;
                let totalFour = squares[i + 3].innerHTML;

                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

                let filteredRow = row.filter(num => num);
                let missing = 4 - filteredRow.length
                let zeroes = Array(missing).fill(0);
                let newRow = filteredRow.concat(zeroes);

                squares[i].innerHTML = newRow[0];
                squares[i+1].innerHTML = newRow[1];
                squares[i+2].innerHTML = newRow[2];
                squares[i+3].innerHTML = newRow[3];
            }
        }
    }

    //move up
    function moveUp(){
        for(let i = 0; i < 4; i++){
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i + width].innerHTML;
            let totalThree = squares[i + (width * 2)].innerHTML;
            let totalFour = squares[i + (width * 3)].innerHTML;

            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

            let filteredColumn = column.filter(num => num);
            let missing = 4 - filteredColumn.length
            let zeroes = Array(missing).fill(0);
            let newColumn = filteredColumn.concat(zeroes);

            squares[i].innerHTML = newColumn[0]
            squares[i + width].innerHTML = newColumn[1]
            squares[i + (width * 2)].innerHTML = newColumn[2]
            squares[i + (width * 3)].innerHTML = newColumn[3]
        }
    }

    //move down
    function moveDown(){
        for(let i = 0; i < 4; i++){
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i + width].innerHTML;
            let totalThree = squares[i + (width * 2)].innerHTML;
            let totalFour = squares[i + (width * 3)].innerHTML;

            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

            let filteredColumn = column.filter(num => num);
            let missing = 4 - filteredColumn.length
            let zeroes = Array(missing).fill(0);
            let newColumn = zeroes.concat(filteredColumn);

            squares[i].innerHTML = newColumn[0]
            squares[i + width].innerHTML = newColumn[1]
            squares[i + (width * 2)].innerHTML = newColumn[2]
            squares[i + (width * 3)].innerHTML = newColumn[3]
        }
    }

    //combine numbers of rows
    function combineRow(){
        for(let i = 0; i < (width*width) - 1; i++){
            if(squares[i].innerHTML === squares[i+1].innerHTML){
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML);
                squares[i].innerHTML = combinedTotal
                squares[i+1].innerHTML = 0
                score += combinedTotal;
                scoreDisplay.innerHTML = score
            }
        }
        checkForWin();
    }
    function combineColumn(){
        for(let i = 0; i < 12; i++){
            if(squares[i].innerHTML === squares[i+width].innerHTML){
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+width].innerHTML);
                squares[i].innerHTML = combinedTotal
                squares[i+width].innerHTML = 0
                score += combinedTotal;
                scoreDisplay.innerHTML = score
            }
        }
        //changeColor();
        checkForWin();
    }

    //change color of tiles based on number
    function changeColor(){
        for(var i=0; i<squares.length; i++){
            if(squares[i].innerHTML == 0){
                squares[i].style.backgroundColor = "wheat";
            }
            else if(squares[i].innerHTML == 2){
                squares[i].style.backgroundColor = "DarkKhaki";
            } else if(squares[i].innerHTML == 4){
                squares[i].style.backgroundColor = "DarkOliveGreen";
            }
            else if(squares[i].innerHTML == 8){
                squares[i].style.backgroundColor = "DarkGreen";
            }
            else if(squares[i].innerHTML == 16){
                squares[i].style.backgroundColor = "DarkTurquoise";
            }
            else if(squares[i].innerHTML == 32){
                squares[i].style.backgroundColor = "DeepSkyBlue";
            }
            else if(squares[i].innerHTML == 64){
                squares[i].style.backgroundColor = "DodgerBlue";
            }
            else if(squares[i].innerHTML == 128){
                squares[i].style.backgroundColor = "Orange";
            }
            else if(squares[i].innerHTML == 256){
                squares[i].style.backgroundColor = "OrangeRed";
            }
            else if(squares[i].innerHTML == 512){
                squares[i].style.backgroundColor = "Red";
            }
            else if(squares[i].innerHTML == 1024){
                squares[i].style.backgroundColor = "Purple";
            }
            else if(squares[i].innerHTML == 2048){
                squares[i].style.backgroundColor = "Black";
            }
        }
    }

    //assign keycodes 
    function control(e){
        if(e.keyCode === 39){
            keyRight()
        }
        else if(e.keyCode === 37){
            keyLeft()
        }
        else if(e.keyCode === 38){
            keyUp()
        }
        else if(e.keyCode === 40){
            keyDown()
        }
    }
    document.addEventListener("keyup",control)

    function keyRight(){
        moveRight()
        combineRow()
        moveRight()
        generate()
        changeColor()
    }
    function keyLeft(){
        moveLeft()
        combineRow()
        moveLeft()
        generate()
        changeColor()
    }
    function keyDown(){
        moveDown()
        combineColumn()
        moveDown()
        generate()
        changeColor()
    }
    function keyUp(){
        moveUp()
        combineColumn()
        moveUp()
        generate()
        changeColor()
    }

    //check for winning squares
    function checkForWin(){
        for(var i = 0; i < squares.length; i++){
            if(squares[i].innerHTML == 2048){
                resultDisplay.innerHTML = "You win!"
                document.removeEventListener('keyUp', control)
            }
        }
    }

    //check for game over
    function checkForGameOver(){
        let zeroes = 0;
        for(var i = 0; i < squares.length; i++){
            if(squares[i].innerHTML == 0){
                zeroes++;
            }
        }

        if(zeroes === 0){
            resultDisplay.innerHTML = "You Lose!"
            document.removeEventListener('keyUp', control)
        }
    }

    createBoard()
})