<template>
  <div class="row d-flex justify-content-end">
    <div class="col-md-4">
      <select
        class="form-select"
        style="font-size: 28px; cursor: pointer"
        @input="$emit('input', $event.target.value)"
        @change="getAll"
      >
        <option value="">{{ name }} ({{ issues.length }})</option>
        <option :value="option.name" v-for="(option, index) in options" :key="index">
          {{ option.name }} ({{
            issues.filter((issue) => issue[filterBy] === option.name).length
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
    // // console.log(this.selected);
    // console.log(this.issues)
    console.log(this.filterBy)
    console.log(this.issues[0][this.filterBy])
  },
  methods:{
      getAll(){
          this.$parent.getAll()
      }
  }
};
</script>

<style>
</style>