<template>
  <div class="row d-flex justify-content-end">
    <div class="col-md-4">
      <select
        class="form-select"
        style="font-size: 28px; cursor: pointer"
        @change="filter"
        @input="$emit('input', $event.target.value)"
      >
        <option value="">{{ name }} ({{ issues.length }})</option>
        <option :value="option" v-for="(option, index) in options" :key="index">
          {{ option }} ({{
            issues.filter((issue) => issue[filterBy] === option).length
          }})
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectFilter",
  props: {
    options: Array,
    name: String,
    filter: Function,
    issues: Array,
    filterBy: String,
  },

  created() {
    console.log(this.selected);
  },
};
</script>

<style>
</style>