'use strict';

/**
 * Othello game
 * Author(s): Nandigam
 */

/**
 * Requires "readline-sync" package for synchronous I/O
 * Package installation: npm install readline-sync
 * 		(run this command inside the project folder; requires node.js)
 * Documentation: https://www.npmjs.com/package/readline-sync
 */
const readlineSync = require('readline-sync');

class Othello {
	
	// Constructs and initializes the board of given size
	constructor(size, startPlayer, discColor) {
		// validate arguments
		if (size < 4 || size > 8 || size % 2 !== 0) {
			throw new Error("Invalid value for board size.");
		}
		if (startPlayer < 1 || startPlayer > 2) {
			throw new Error("Invalid value for player number.");
		}
		if (discColor !== Othello.WHITE && discColor !== Othello.BLACK) {
			throw new Error("Invalid value for disc.");
		}
		
		// set instance variables
		this.size = size;
		this.turn = startPlayer;
		this.disc = discColor;
		
		// set two more instance variables p1Disc and p2Disc
		if (this.turn === 1) {
			this.p1Disc = this.disc;
			this.p2Disc = this.disc === Othello.WHITE ? Othello.BLACK : Othello.WHITE;
		} else {
			this.p2Disc = this.disc;
			this.p1Disc = this.disc === Othello.WHITE ? Othello.BLACK : Othello.WHITE;
		}
		
		// create the grid (as array of arrays)
		this.board = new Array(this.size);
		for (let i = 0; i < this.board.length; i++) {
			this.board[i] = new Array(this.size);
			this.board[i].fill(0);
		}
		
		// initialize the grid
		this.initializeBoard();
	}
	
	// Getter for white disc
  static get WHITE() {
    return "W";
  }
  
  // Getter for black disc
  static get BLACK() {
    return "B";
  }

  // Getter for empty
  static get EMPTY() {
    return "-";
  }
  
  // Getter for tie
  static get TIE() {
    return "T";
  }
  
  // Initializes the board with start configuration of discs (as per project specs)
  initializeBoard() {
	  this.board[this.size/2-1][this.size/2-1] = 'B';
	  this.board[this.size/2-1][this.size/2]= 'W';
	  this.board[this.size/2][this.size/2]= "B";
	  this.board[this.size/2][this.size/2-1]= 'W';
  	
  	
  }
  
  // Returns true if placing the disc of current player at row,col is valid; else returns false
  isValidMove(row, col) {
  	return this.isValidMoveForDisc(row, col, this.disc);
  }
  
	// Returns true if placing the specified disc at row,col is valid; else returns false
	isValidMoveForDisc(row, col, disc) {
		
		let tempRow;
		let tempCol;
		let opponent ='W'
		if (this.disc == 'W')
		opponent = 'B';

		for(let i=-1; i<=1; i++){
			for(let j=-1; j<=1; j++){
				let flag=false;
				if(i==0 && j==0)
				continue;
				if(row+i>=this.size || row+i<0 || j+col>=this.size || j+col<0)
					continue;
				if(this.board[row+i][col +j] == opponent) {
					tempRow =row +i;
					tempCol = col+j;
			}
			else continue;

				while(1){
					tempRow += i;
					tempCol +=j;
					// console.log(tempRow);
					// console.log(tempCol);
					if(tempCol>=this.size || tempRow<0 || tempCol>=this.size || tempCol<0){
						break;
					}
					if(this.board[tempRow][tempCol] == this.disc)
					return true;

					if(this.board[tempRow][tempCol] == '0')
					break;



				}
			}
		}
		
		// DO NOT DELETE!!
		// return false to indicate that move is not valid, if control reaches this point
		return false;		
	}
	
	// Places the disc of current player at row,col and flips the opponent discs as needed 
	placeDiscAt(row, col) {
		if (!this.isValidMove(row, col)) {
			return;
		}
		
		// place the current player's disc at row,col
		this.board[row][col] = this.disc;
		
		let tempRow;
		let tempCol;
		let opponent ='W'
		if (this.disc == 'W')
		opponent = 'B';

		for(let i=-1; i<=1; i++){
			for(let j=-1; j<=1; j++){
				let flag=true;
				if(i==0 && j==0)
				continue;
				if(row+i>=this.size || row+i<0 || j+col>=this.size || j+col<0)
					continue;
				if(this.board[row+i][col +j] == opponent) {
					tempRow =row +i;
					tempCol = col+j;
			}
			else continue;

				while(flag){
					tempRow += i;
					tempCol +=j;
					// console.log(tempRow);
					// console.log(tempCol);
					if(tempCol>=this.size || tempRow<0 || tempCol>=this.size || tempCol<0){
						flag=0;
						break;
				}
						
					if(this.board[tempRow][tempCol] == '0')
					flag=0;

					if(this.board[tempRow][tempCol] == this.disc){
					i=-i;
					j=-j;
						while(flag){
						console.log("i=" + i);
						console.log(j);
						console.log(tempRow);
						console.log(tempCol);
					tempRow +=i;
					tempCol +=j;

					if(this.board[tempRow][tempCol] == this.disc){
					i=-i;
					j=-j;
					flag=0
				}
					this.board[tempRow][tempCol]=this.disc;
					}
					}




				}
			}
		}
		
		
		// DO NOT DELETE!!
		// Take steps to prepare for next turn if game is not over
		if (!this.isGameOver()) {		
			this.prepareNextTurn();
		}
	}
	
	// Sets turn and disc information for next player
	prepareNextTurn() {
		if (this.turn === 1) {
			this.turn = 2;
		} else {
			this.turn = 1;
		}		
		if (this.disc === Othello.WHITE) {
			this.disc = Othello.BLACK;
		} else {
			this.disc = Othello.WHITE;
		}		
	}
	
	// Returns true if a valid move for current player is available; else returns false
	isValidMoveAvailable() {
		return this.isValidMoveAvailableForDisc(this.disc);
	}
	
	// Returns true if a valid move for the specified disc is available; else returns false
	isValidMoveAvailableForDisc(disc) {
		
		for(let i=0; i<this.size;i++){
			for(let j=0; j<this.size; j++){
				if(this.isValidMoveForDisc(i,j,disc))
				return true;
			}
		}
		
		
		// DO NOT DELETE!!
		// return false if there is a valid move not available for disc, if control reaches this point
		return false;		
	}
	
	// Returns true if the board is fully occupied with discs; else returns false
	isBoardFull() {
		
		for(let i=0; i<this.size;i++){
			for(let j=0; j<this.size; j++){
				if(this.board[i][j] == '0')
				return false;
			}
		}
		
		
		// DO NOT DELETE!!
		return true;		
	}
	
	// Returns true if either the board is full or a valid move is not available for either disc
	isGameOver() {
		return this.isBoardFull() || 
					(!this.isValidMoveAvailableForDisc(Othello.WHITE) &&
								!this.isValidMoveAvailableForDisc(Othello.BLACK));		
	}
	
	// If there is a winner, it returns Othello.WHITE or Othello.BLACK.
	// In case of a tie, it returns Othello.TIE
	checkWinner() {
		let blackCount = 0, whiteCount = 0;

		for(let i=0; i<this.size; i++) {
			for(let j=0; j<this.size; j++) {
				if(this.board[i][j] == 'B')
					blackCount += 1;
				if(this.board[i][j] == 'W')
					whiteCount += 1;
			}
		}
		if(blackCount > whiteCount)
		return BLACK;
		if(whiteCount > blackCount)
		return WHITE;
		


		return Othello.TIE;		
	}
	
	// Returns a string representation of the board (for display purposes)
	toString() {
		let str = '\n  ';
		for (let i = 0; i < this.size; i++) {
			str += i+1 + ' ';
		}
		str += "\n";
		for (let i = 0; i < this.size; i++) {
			str += i+1 + ' ';
			str += this.board[i].join(' ') + "\n";
		}
		return str;
	}
}

// Main driver for the program
function main() {
	// info: process.argv array stores command-line arguments
	if (process.argv.length !== 5) {
		console.log("Incorrect number of arguments to the program");
		console.log("Usage: node othello.js boardsize startplayernbr disccolor");
		console.log("Example: node othello.js 6 1 B");
		process.exit(1);		
	}
	
	// extract board size, start player, and disc color from command-line arguments
	let size = parseInt(process.argv[2]);
	let player = parseInt(process.argv[3]);
	let disc = process.argv[4].toUpperCase();
	
	if (size < 4 || size > 8 || size % 2 !== 0 || player < 1 || player > 2 || (disc !== Othello.WHITE && disc !== Othello.BLACK)) {
		console.log("Invalid arguments to the program");
		process.exit(1);
	}
	
	let game = new Othello(size, player, disc);
	
	console.log("<<<<< Welcome to the game of Othello >>>>>");
	console.log("Player 1: " + game.p1Disc + "   Player 2: " + game.p2Disc);
	console.log("Player " + player + " starts the game...");

	let row, col, line, tokens;
	
	while (!game.isGameOver()) {
		console.log(game.toString());

		if (!game.isValidMoveAvailable()) {
			console.log("No valid moves available for player " + game.turn + "(" + game.disc + "). You lose your turn.");
			game.prepareNextTurn();
		} else {
			while (true) {
				line = readlineSync.question("Turn> Player " + game.turn + "(" + game.disc + ") - Enter location to place your disc (row col): ");
				tokens = line.split(' ');
				row = parseInt(tokens[0]);
				col = parseInt(tokens[1]);
				if (row < 1 || row > game.size || col < 1 || col > game.size) {
					console.log("Sorry, invalid input. Try again.");
					continue;
				}
				row--;	// adjust it for zero-indexed board
				col--;  // adjust it for zero-indexed board
				if (!game.isValidMove(row,col)) {
					console.log("Sorry, that is not a valid move. Try again.");
					continue;
				}
				break;
			}
			game.placeDiscAt(row,col);
		}
	}

	// print the final board and display winner or tie information
	console.log(game.toString());
	let winner = game.checkWinner();
	if (winner === Othello.BLACK || winner === Othello.WHITE) {
		console.log("Game is over. The winner is Player " + game.turn + "(" + game.disc + ")");
	} else {
		console.log("Game is over. No winner.");
	}
}

// Invoke the driver
main()