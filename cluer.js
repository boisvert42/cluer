/**
* cluer.js
**/

/**
* Class for the grid
**/
class Grid {
    constructor(solution_str) {
        // make a 2-d array from the string
        var soln_arr1 = solution_str.split('\n');
        var soln_arr = [];
        for (var i=0; i<soln_arr1.length; i++) {
            soln_arr.push(soln_arr1[i].split(''));
        }
        this.solution = soln_arr;
        // width and height
        this.height = soln_arr.length;
        this.width = soln_arr[0].length;
        // Grid numbering
        this.numbers = this.gridNumbering();
    }
    isBlack(x, y) {
        return this.solution[y][x] === '.';
    }
    startAcrossWord(x, y) {
        return (x === 0 || this.isBlack(x - 1, y)) && x < this.width - 1 && !this.isBlack(x, y) && !this.isBlack(x + 1, y);
    }
    startDownWord(x, y) {
        return (y === 0 || this.isBlack(x, y - 1)) && y < this.height - 1 && !this.isBlack(x, y) && !this.isBlack(x, y + 1);
    }
    letterAt(x, y) {
        return this.solution[y][x];
    }
    gridNumbering() {
        var numbers = [];
        var thisNumber = 1;
        for (var y=0; y < this.height; y++) {
            var thisNumbers = [];
            for (var x=0; x < this.width; x++) {
                if (this.startAcrossWord(x, y) || this.startDownWord(x, y)) {
                    thisNumbers.push(thisNumber);
                    thisNumber += 1;
                }
                else {
                    thisNumbers.push(0);
                }
            }
            numbers.push(thisNumbers);
        }
        return numbers;
    }

}

function entriesFromGrid(solution) {
    /* we input a solution grid as a string */
    var entries = [];
    var thisGrid = new Grid(solution);
    var x, y, thisNum;
    var findingFirst = true;
    // Across entries
    var acrossEntries = {};
    for (y = 0; y < thisGrid.height; y++) {
        for (x = 0; x < thisGrid.width; x++) {
            if (thisGrid.startAcrossWord(x, y)) {
                thisNum = thisGrid.numbers[y][x];
            }
            if (!thisGrid.isBlack(x, y)) {
                var letter = thisGrid.letterAt(x, y);
                acrossEntries[thisNum] = (acrossEntries[thisNum] || '') + letter;
            }
        }
    }
    // Down entries
    var downEntries = {};
    for (x = 0; x < thisGrid.width; x++) {
        for (y = 0; y < thisGrid.height; y++) {
            if (thisGrid.startDownWord(x, y)) {
                thisNum = thisGrid.numbers[y][x];
            }
            if (!thisGrid.isBlack(x, y)) {
                var letter = thisGrid.letterAt(x, y);
                downEntries[thisNum] = (downEntries[thisNum] || '') + letter;
            }
        }
    }
    return Object.values(acrossEntries).concat(Object.values(downEntries));
}
