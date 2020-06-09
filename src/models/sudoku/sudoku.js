const regionDictionary = {
  2: [[0, 1]],
  4: [
    [0, 1],
    [2, 3],
    [8, 9],
    [10, 11],
  ],
  // TODO: Remove hardcoded region-to-tile association
  // I went down the rabbit hole, and I was unable to figure out the
  // math needed to link nodes to a region - I spent a great deal of
  // time in here ( hence the tests ) but couldn't figure it out.
  9: [
    [0, 1, 2, 9, 10, 11, 18, 19, 20],
    [3, 4, 5, 12, 13, 14, 21, 22, 23],
    [6, 7, 8, 15, 16, 17, 24, 25, 26],
    [27, 28, 29, 36, 37, 38, 45, 46, 47],
    [30, 31, 32, 39, 40, 41, 48, 49, 50],
    [33, 34, 35, 42, 43, 44, 51, 52, 53],
    [54, 55, 56, 63, 64, 65, 72, 73, 74],
    [57, 58, 59, 66, 67, 68, 75, 76, 77],
    [60, 61, 62, 69, 70, 71, 78, 79, 80],
  ],
};

class Sudoku {
  constructor(list = []) {
    this.model = [];
    this.boardSize = Math.sqrt(list.length);
    this.regions = [];

    if (!Number.isInteger(this.boardSize)) {
      throw new Error("not a valid model");
    }
    this.linkNodes([...list]);
    this.linkNodeRegions();
  }

  // link sudoku nodes together as a data structure
  // in order to check rows and columns easily
  linkNodes(list) {
    const boardSize = this.boardSize;
    let index = 0;
    let row = 0;

    while (list.length) {
      const node = new Node(list.shift());

      if (index === 0) {
        this.model.push(node);
        index++;
        continue;
      }

      if (index % this.boardSize) {
        this.model[index - 1].nextX = node;
      } else {
        // now beginning a new row - link the last item from previous row
        this.model[index - 1].nextX = this.model[index - boardSize];
        row++;
      }

      // point previous row of items down to the new row
      if (row) {
        this.model[index - boardSize].nextY = node;
      }

      // for the last row items link vertically to the first row items
      if (row === boardSize - 1) {
        node.nextY = this.model[index - row * boardSize];
      }

      // last item in the model
      if (list.length === 0) {
        node.nextX = this.model[index - boardSize + 1];
      }

      this.model.push(node);
      index++;
    }
  }

  linkNodeRegions() {
    regionDictionary[this.boardSize].forEach((region) => {
      this.regions.push(
        region.reduce((acc, next) => {
          const values = [this.model[next], this.model[next].nextY];
          if (region.length === 3) {
            values.push(this.model[next].nextY.nextY);
          }
          acc.push(...values);
          return acc;
        }, [])
      );
    });
  }

  getRegionByValues(key) {
    return this.regions[key].map((node) => node.value);
  }

  validateAdjacent(newValue, index, direction = "X") {
    let start = this.model[index];
    let next = start[`next${direction}`];

    while (next !== start) {
      if (next.value === newValue) {
        return false;
      }
      next = next[`next${direction}`];
    }
    return true;
  }

  validateRegion(newValue, index) {
    const regionId = regionDictionary[this.boardSize].findIndex((region) => {
      return region.some((regionIndex) => regionIndex === index);
    });

    const regionNodes = this.regions[regionId];

    for (let i = 0; i < regionNodes.length; i++) {
      if (regionNodes[i].value === newValue) {
        return false;
      }
    }
    return true;
  }
}

class Node {
  constructor(value) {
    this.hasInitialValue = Boolean(value);
    this.nextX = null;
    this.nextY = null;
    this.valid = true;
    this.value = value;
  }
}

export default Sudoku;
