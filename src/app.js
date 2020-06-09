import Vue from "vue";
import "./app.scss";
import "./fractal.scss";
import "./assets/svg";

const el = document.getElementById("sudoku-board");

import SudokuBoard from "@pages/sudoku-board";

export default new Vue({
  el,
  components: {
    SudokuBoard,
  },
  data: JSON.parse(el.dataset.json),
});
