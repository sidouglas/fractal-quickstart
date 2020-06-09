<template>
  <div class="sudoku-cell">
    <input
      class="sudoku-cell__input"
      ref="input"
      type="number"
      v-bind:value="renderedValue"
      v-on:click="handleClick"
      v-on:blur="handleBlur"
      v-on:input="$emit('input', $event.target.value)"
      v-bind="$attrs"
    />
  </div>
</template>

<script>
  export default {
    inheritAttrs: false,
    props: {
      value: Number,
    },
    computed: {
      renderedValue() {
        return this.value || '';
      },
    },
    methods: {
      handleClick() {
        this.$refs.input.select();
      },
      handleBlur() {
        if (!this.value) {
          this.$refs.input.value = '';
        }
      },
    },
  };
</script>
