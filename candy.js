let candies = ['Blue', 'Orange', 'Green', 'Yellow', 'Red', 'Purple']; // Array of candy colors available
let board = []; // 2D array to hold the board tiles
let rows = 9; // Number of rows on the board
let columns = 9; // Number of columns on the board
let score = 0; // Variable to keep track of the player's score
let carrTile;  // variable of the one you are clicking to drag
let otherTile; // the one that gets dropped on

// Runs when the window finishes loading
window.onload = function() {
  startGame(); // Calls the function to start the game

  window.setInterval(function(){
    crushCandy();
    slideCandy();
    generateCandy();
  }, 100); //every 0.1 seconds it will run the function
}

// Function to randomly select a candy color
function randomCandy() {
  return candies[Math.floor(Math.random() * candies.length)]; // Picks a random candy color from the candies array
}

// Function to initialize the game board
function startGame() {
  for (let r = 0; r < rows; r++) { // Loops through each row
    let row = []; // Creates an empty array for the current row
    for (let c = 0; c < columns; c++) { // Loops through each column
      let tile = document.createElement("img"); // Creates an image element for each tile
      tile.id = r.toString() + "-" + c.toString(); // Assigns a unique id based on row and column index
      tile.src = "./images/" + randomCandy() + ".png"; // Sets the image source to a random candy image

      // drag and drop functionality
      tile.addEventListener('dragstart', dragStart); // when you click on a candy
      tile.addEventListener('dragover', dragOver); // clicking on the candy and moving the mouse to drag the candy
      tile.addEventListener('dragenter', dragEnter); // dragging candy onto another candy
      tile.addEventListener('dragleave', dragLeave); // leaving a candy over another candy
      tile.addEventListener('drop', dragDrop); // dropping a candy over another candy
      tile.addEventListener('dragend', dragEnd); // after drag process completed we swap candy

      document.getElementById("board").append(tile); // Appends the tile to the board div in the HTML
      row.push(tile); // Adds the tile to the current row array
    }
    board.push(row); // Adds the row to the board array
  }
  console.log(board); // Logs the board array to the console for debugging
}

function dragStart() {
  carrTile = this; // candy that was clicked on for dragging
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
  otherTile = this; // target tile that was dropped on
}

function dragEnd() {
  if(carrTile.src.includes("blank") || otherTile.src.includes("blank")){
    return;
  }

  let currCords = carrTile.id.split("-"); // Split the id to get the row and column
  let r = parseInt(currCords[0]);
  let c = parseInt(currCords[1]);

  let otherCords = otherTile.id.split("-"); // Split the id to get the row and column
  let r2 = parseInt(otherCords[0]);
  let c2 = parseInt(otherCords[1]);

  let moveLeft = c2 == c - 1 && r == r2;
  let moveRight = c2 == c + 1 && r == r2;
  let moveUp = r2 == r - 1 && c == c2;
  let moveDown = r2 == r + 1 && c == c2;

  let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

  if (isAdjacent) {
    let currImg = carrTile.src;
    let otherImg = otherTile.src;
    carrTile.src = otherImg;
    otherTile.src = currImg;

    let validMove = checkValid();
    if(!validMove){
      let currImg = carrTile.src;
      let otherImg = otherTile.src;
      carrTile.src = otherImg;
      otherTile.src = currImg;
    }
  }
}

function crushCandy(){
  crushThree();
  crushFour();
  crushFive();
  document.getElementById('Score').innerText = score;// reflect the new score
}

function crushThree(){
  //for rows
  for (let r = 0; r < rows; r++){
    for (let c = 0; c < columns - 2; c++){
      let candy1 = board[r][c];
      let candy2 = board[r][c+1];
      let candy3 = board[r][c+2];
      if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")){
        candy1.src = "./images/blank.png";
        candy2.src = "./images/blank.png";
        candy3.src = "./images/blank.png";
        score += 30;
      }
    }
  }
  //for columns
  for(let c = 0; c < columns; c++){
    for (let r = 0; r < rows - 2; r++){
      let candy1 = board[r][c];
      let candy2 = board[r+1][c];
      let candy3 = board[r+2][c];
      if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")){
        candy1.src = "./images/blank.png";
        candy2.src = "./images/blank.png";
        candy3.src = "./images/blank.png";
        score += 30;
      }
    }
  }
}


function crushFour(){
  // Check for rows with four matching candies
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 3; c++) { // Adjusted to columns - 3 for four candies
      let candy1 = board[r][c];
      let candy2 = board[r][c + 1];
      let candy3 = board[r][c + 2];
      let candy4 = board[r][c + 3];
      if (candy1.src === candy2.src && candy2.src === candy3.src && candy3.src === candy4.src && !candy1.src.includes("blank")) {
        // If four candies in a row match, set their images to "blank"
        candy1.src = "./images/blank.png";
        candy2.src = "./images/blank.png";
        candy3.src = "./images/blank.png";
        candy4.src = "./images/blank.png";
        score += 40; // Increment score by 40 for four matching candies
      }
    }
  }

  // Check for columns with four matching candies
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows - 3; r++) { // Adjusted to rows - 3 for four candies
      let candy1 = board[r][c];
      let candy2 = board[r + 1][c];
      let candy3 = board[r + 2][c];
      let candy4 = board[r + 3][c];
      if (candy1.src === candy2.src && candy2.src === candy3.src && candy3.src === candy4.src && !candy1.src.includes("blank")) {
        // If four candies in a column match, set their images to "blank"
        candy1.src = "./images/blank.png";
        candy2.src = "./images/blank.png";
        candy3.src = "./images/blank.png";
        candy4.src = "./images/blank.png";
        score += 40; // Increment score by 40 for four matching candies
      }
    }
  }
}

function crushFive(){
  // Check for rows with five matching candies
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 4; c++) { // Adjusted to columns - 4 for five candies
      let candy1 = board[r][c];
      let candy2 = board[r][c + 1];
      let candy3 = board[r][c + 2];
      let candy4 = board[r][c + 3];
      let candy5 = board[r][c + 4];
      if (candy1.src === candy2.src && candy2.src === candy3.src && candy3.src === candy4.src && candy4.src === candy5.src && !candy1.src.includes("blank")) {
        // If five candies in a row match, set their images to "blank"
        candy1.src = "./images/blank.png";
        candy2.src = "./images/blank.png";
        candy3.src = "./images/blank.png";
        candy4.src = "./images/blank.png";
        candy5.src = "./images/blank.png";
        score += 50; // Increment score by 50 for five matching candies
      }
    }
  }

  // Check for columns with five matching candies
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows - 4; r++) { // Adjusted to rows - 4 for five candies
      let candy1 = board[r][c];
      let candy2 = board[r + 1][c];
      let candy3 = board[r + 2][c];
      let candy4 = board[r + 3][c];
      let candy5 = board[r + 4][c];
      if (candy1.src === candy2.src && candy2.src === candy3.src && candy3.src === candy4.src && candy4.src === candy5.src && !candy1.src.includes("blank")) {
        // If five candies in a column match, set their images to "blank"
        candy1.src = "./images/blank.png";
        candy2.src = "./images/blank.png";
        candy3.src = "./images/blank.png";
        candy4.src = "./images/blank.png";
        candy5.src = "./images/blank.png";
        score += 50; // Increment score by 50 for five matching candies
      }
    }
  }
}





function checkValid(){
  // Check for rows
  for (let r = 0; r < rows; r++){
    for (let c = 0; c < columns - 2; c++){
      let candy1 = board[r][c];
      let candy2 = board[r][c+1];
      let candy3 = board[r][c+2];
      if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")){
        return true;
      }
    }
  }
  // Check for columns
  for(let c = 0; c < columns; c++){
    for (let r = 0; r < rows - 2; r++){
      let candy1 = board[r][c];
      let candy2 = board[r+1][c];
      let candy3 = board[r+2][c];
      if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")){
        return true;
      }
    }
  }
  
  return false;
}

// Function to slide the candy down
function slideCandy(){
  for(let c = 0; c < columns; c++){
    let ind = rows - 1;
    for(let r = rows - 1; r >= 0; r--){
      if(!board[r][c].src.includes("blank")){
        board[ind][c].src = board[r][c].src;
        ind -= 1;
      }
    }
    for(let r = ind; r >= 0; r--){
      board[r][c].src = "./images/blank.png";
    }
  }
}
// create new candy
function generateCandy(){
for(let c = 0; c < columns; c++){
  if(board[0][c].src.includes("blank")){
    board[0][c].src = "./images/" + randomCandy() + ".png";
  }
}
}