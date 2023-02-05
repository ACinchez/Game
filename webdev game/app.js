document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const width = 8
    const squares = []
    let score = 0
    
    const candyColors = [
        'url(images/red-candy.png)',
        'url(images/yellow-candy.png)',
        'url(images/orange-candy.png)',
        'url(images/purple-candy.png)',
        'url(images/green-candy.png)',
        'url(images/blue-candy.png)'
      ]
    
    //create your board
    function createBoard() {
      for (let i = 0; i < width*width; i++) {
        const square = document.createElement('div')
        square.setAttribute('draggable', true)
        square.setAttribute('id', i)
        let randomColor = Math.floor(Math.random() * candyColors.length)
        square.style.backgroundImage = candyColors[randomColor]
        grid.appendChild(square)
        squares.push(square)
      }
    }
    createBoard()
    
    // Dragging the Candy
    let colorBeingDragged
    let colorBeingReplaced
    let squareIdBeingDragged
    let squareIdBeingReplaced
    
    squares.forEach(square => square.addEventListener('dragstart', dragStart))
    squares.forEach(square => square.addEventListener('dragend', dragEnd))
    squares.forEach(square => square.addEventListener('dragover', dragOver))
    squares.forEach(square => square.addEventListener('dragenter', dragEnter))
    squares.forEach(square => square.addEventListener('drageleave', dragLeave))
    squares.forEach(square => square.addEventListener('drop', dragDrop))
    
    function dragStart(){
        colorBeingDragged = this.style.backgroundImage
        squareIdBeingDragged = parseInt(this.id)
        // this.style.backgroundImage = ''
    }
    
    function dragOver(e) {
        e.preventDefault()
    }
    
    function dragEnter(e) {
        e.preventDefault()
    }
    
    function dragLeave() {
        this.style.backgroundImage = ''
    }
    
    function dragDrop() {
        colorBeingReplaced = this.style.backgroundImage
        squareIdBeingReplaced = parseInt(this.id)
        this.style.backgroundImage = colorBeingDragged
        squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced
    }
    
    function dragEnd() {
        //What is a valid move?
        let validMoves = [squareIdBeingDragged -1 , squareIdBeingDragged -width, squareIdBeingDragged +1, squareIdBeingDragged +width]
        let validMove = validMoves.includes(squareIdBeingReplaced)
    
        if (squareIdBeingReplaced && validMove) {
            squareIdBeingReplaced = null
        }  else if (squareIdBeingReplaced && !validMove) {
           squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced
           squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
        } else  squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
    }
    
    //drop candies once some have been cleared
    function moveIntoSquareBelow() {
        for (i = 0; i < 55; i ++) {
            if(squares[i + width].style.backgroundImage === '') {
                squares[i + width].style.backgroundImage = squares[i].style.backgroundImage
                squares[i].style.backgroundImage = ''
                const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
                const isFirstRow = firstRow.includes(i)
                if (isFirstRow && (squares[i].style.backgroundImage === '')) {
                  let randomColor = Math.floor(Math.random() * candyColors.length)
                  squares[i].style.backgroundImage = candyColors[randomColor]
                }
            }
        }
    }


    
    ///Checking for Matches
    //for row of Four
      function checkRowForFour() {
        for (i = 0; i < 60; i ++) {
          let rowOfFour = [i, i+1, i+2, i+3]
          let decidedColor = squares[i].style.backgroundImage
          const isBlank = squares[i].style.backgroundImage === ''
    
          const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55]
          if (notValid.includes(i)) continue
    
          if(rowOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
            score += 4
            scoreDisplay.innerHTML = score
            rowOfFour.forEach(index => {
            squares[index].style.backgroundImage = ''
            })
          }
        }
      }
      checkRowForFour()
    
    //for column of Four
      function checkColumnForFour() {
        for (i = 0; i < 39; i ++) {
          let columnOfFour = [i, i+width, i+width*2, i+width*3]
          let decidedColor = squares[i].style.backgroundImage
          const isBlank = squares[i].style.backgroundImage === ''
    
          if(columnOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
            score += 4
            scoreDisplay.innerHTML = score
            columnOfFour.forEach(index => {
            squares[index].style.backgroundImage = ''
            })
          }
        }
      }
    checkColumnForFour()
    
      //for row of Three
      function checkRowForThree() {
        for (i = 0; i < 61; i ++) {
          let rowOfThree = [i, i+1, i+2]
          let decidedColor = squares[i].style.backgroundImage
          const isBlank = squares[i].style.backgroundImage === ''
    
          const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
          if (notValid.includes(i)) continue
    
          if(rowOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
            score += 3
            scoreDisplay.innerHTML = score
            rowOfThree.forEach(index => {
            squares[index].style.backgroundImage = ''
            })
          }
        }
      }
      checkRowForThree()
    
    //for column of Three
      function checkColumnForThree() {
        for (i = 0; i < 47; i ++) {
          let columnOfThree = [i, i+width, i+width*2]
          let decidedColor = squares[i].style.backgroundImage
          const isBlank = squares[i].style.backgroundImage === ''
    
          if(columnOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
            score += 3
            scoreDisplay.innerHTML = score
            columnOfThree.forEach(index => {
            squares[index].style.backgroundImage = ''
            })
          }
        }
      }
    checkColumnForThree()
    
    // Checks carried out indefintely - Add Button to clear interval for best practise, or clear on game over/game won. If you have this indefinite check you can get rid of calling the check functions above.
    window.setInterval(function(){
        checkRowForFour()
        checkColumnForFour()
        checkRowForThree()
        checkColumnForThree()
        moveIntoSquareBelow()
      }, 100)
    })



    // When the DOM (Document Object Model) has finished loading, it creates a grid of squares, each square having a random background image from the candyColors array. 
    // The game logic allows users to drag and drop candies to swap their positions. The code uses the dragstart, dragover, dragenter, dragleave, and drop events to implement the candy swapping logic. 
    //  The code checks if the candy drop is a valid move (i.e., a move that is within the grid) using the validMoves array. If the drop is not a valid move, the candies are returned to their original positions.
    //  The code also has a function checkRowForFour that checks for four matching candies in a row, and a function moveIntoSquareBelow that moves the candies downwards. The score is displayed in the scoreDisplay element.

//     This is a JavaScript code that creates a Candy Crush-like game. It starts by creating a grid of candies with a random color, and then it allows the player to drag and drop the candies to swap their positions. The code implements the logic for dragging, dropping, and checking for matching candies.

// When the DOM (Document Object Model) is loaded, it creates the game board by creating 64 square elements, each with a random background image from the candyColors array. The squares are then pushed into the squares array.

// The code sets up event listeners for dragging and dropping candies by iterating over the squares array and attaching listeners for dragstart, dragend, dragover, dragenter, dragleave, and drop events. The dragStart function saves the color and id of the square being dragged, while the dragDrop function swaps the background image of the square being dragged with that of the square being dropped on. The dragEnd function checks if the drop was a valid move (the squares are adjacent), and if it is not, it swaps the background images back.

// The moveIntoSquareBelow function makes the candies drop down to fill empty spaces by iterating over the squares array and checking if the square below it is empty. If it is, the current square's background image is moved to the square below. If the current square is in the first row and empty, it is filled with a random candy color.

// The checkRowForFour function checks for a row of four matching candies by iterating over the squares array in sets of four and checking if they have the same background image. If they do, they are removed, and the score is incremented.

// This code implements the basic mechanics of a Candy Crush-like game, but it may not be complete or optimized