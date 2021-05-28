const BOARD_SIZE = 9

class Sudoku {
    constructor(){
        this.board = []
        for (let i = 0; i <= BOARD_SIZE; i++)
            this.board.push(Array(BOARD_SIZE).fill(null))
    }
    
    /**
     * Gets the state of the board
     * @returns 2d-array representing the board's state
     */
    getBoard(){
        return this.board
    }

    /**
     * Adds a value at given location of board
     * @param {number} row row of sudoku board
     * @param {number} col column of sudoku board
     * @param {*} value value to insert into board
     */
    addValue(row, col, value){
        // check if value is valid
        assert(value >= 1 && value <= BOARD_SIZE)

        // check if location is within bounds
        assert(this.checkBounds(row))
        assert(this.checkBounds(col))

        if (value === null){
            // check that position was filled
            if (this.board[row][col] === null)
                throw "already empty"
        }
        this.board[row][col] = value


        // check if value is already filled
        assert(this.board[row][col] === null)
    }

    /**
     * Checks if there are repeated elements in the array
     * @param {Array} arr array to check
     */
    checkNoDuplicates(arr){
        arr.length === new Set(arr).size
    }

    /**
     * Checks if index valud fits within bounds of the board size
     * @param {number} val index
     */
    checkBounds(val){
        assert(val >= 0 && val < BOARD_SIZE)
    }
    /**
     * Checks if row is valid
     * @param {number} rowIndex index of row to check
     * @returns {boolean} whether the row is valid
     */
    isRowValid(rowIndex){
        this.checkBounds(rowIndex)
        const row = this.board[rowIndex]
        return this.checkNoDuplicates(row) 
    }

    /**
     * Checks if column is valid
     * @param {number} colIndex index of column to check
     * @returns {boolean} whether the column is valid
     */
    isColValid(colIndex){
        this.checkBounds(colIndex)
        const col = this.board.map(row => row[colIndex])
        return this.checkNoDuplicates(col)
    }

    /**
     * Checks if block is valid
     * @param {number} blockNum 
     * @returns {boolean} whether 3x3 block is valid
     */
    isBlockValid(blockNum){
        this.checkBounds(blockNum)
        let c = (blockNum % 3) * 3
        let r = Math.floor(blockNum / 3)
        
        let temp = []
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                temp.push(this.board[r+i][c+j])
            }
        }
        return this.checkNoDuplicates(temp)
    }

    isGameValid(){
        for(let i = 0;i < BOARD_SIZE; i++){
            if(!this.isColValid(i) || !this.isBlockValid(i) || !this.isRowValid(i))
                return false
                
        }
    }
}

module.exports = Sudoku