<template>
  <!-- <div class="row d-flex justify-content-end"> -->

  <div class="col-md-4">
    <!-- {{issues}} -->
    <!-- {{ options }} -->
    <select
      class="form-select"
      style="font-size: 28px; cursor: pointer"
      @input="$emit('input', $event.target.value)"
      @change="getAll($event.target.value)"
    >
      <option value="">{{ name }} ({{issues.lengt }} {{ issuesLength }})</option>
      <option
        :value="option.name"
        v-for="(option, index) in options"
        :key="index"
      >
        {{ option.name }} ({{
          issues.filter(
            (issue) => issue[filterBy] && issue[filterBy].name === option.name
          ).length
        }})
      </option>
    </select>
  </div>
  <!-- </div> -->
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
    issuesLength: Number
  },

  created() {
    // // console.log(this.selected);
    // console.log(this.options);
    // console.log(this.issues)
  },
  methods: {
    getAll(selected) {
      this.$parent.getIssues();
      this.$parent.filter()

         console.log(this.filterBy)
      console.log(this.name)
      console.log({selected})
    //   console.log('load all')
    },
  },
  updated(){
   

    //   console.log(this.options[0])

    //   this.options = this.issues.filter((issue, index) => issue  )
    // :disabled="issues.filter(issue => issue[filterBy] && issue[filterBy].name).length == 0"

  }
};
</script>

<style>
</style>