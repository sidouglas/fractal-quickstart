<template>
  <ul
    class="sudoku-board"
    v-bind:class="[`sudoku-board--size-${boardSize}`]"
    v-bind:style="{
      'grid-template-columns': `repeat(${boardSize}, 1fr)`,
      'grid-template-rows': `repeat(${boardSize}, 1fr)`,
    }"
  >
    <li
      class="sudoku-board__item"
      v-bind:key="index"
      v-for="(cell, index) in model"
    >
      <sudoku-cell
        min="1"
        v-bind:class="{
          'sudoku-cell--is-invalid': !cell.valid,
        }"
        v-bind:aria-disabled="cell.hasInitialValue"
        v-bind:disabled="cell.hasInitialValue"
        v-bind:max="boardSize"
        v-bind:value="cell.value"
        v-on:input="handleUpdate($event, index)"
      ></sudoku-cell>
    </li>
  </ul>
</template>

<script>
  import Sudoku from '@/models/sudoku';
  import SudokuCell from '@components/sudoku-cell';

  export default {
    components: {
      SudokuCell,
    },
    data() {
      return {
        game: {},
      };
    },
    props: {
      data: Array,
    },
    computed: {
      boardSize() {
        return this.game.boardSize;
      },
      model() {
        return this.game.model;
      },
    },
    methods: {
      handleUpdate(value, index) {
        this.game.model[index].value = this.validate(Number(value), index);
      },
      validate(value, index) {
        this.game.model[index].valid = true;

        if (value && !this.game.validateAdjacent(value, index)) {
          this.game.model[index].valid = false;
          return value;
        }
        if (value && !this.game.validateAdjacent(value, index, 'Y')) {
          this.game.model[index].valid = false;
          return value;
        }
        if (value && !this.game.validateRegion(value, index)) {
          this.game.model[index].valid = false;
          return value;
        }
        return value;
      },
    },
    created() {
      this.game = new Sudoku(this.data);
    },
  };
</script>
