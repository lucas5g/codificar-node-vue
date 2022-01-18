<template>
  <div class="col-md">
    <h6>{{ status }} ({{ issues.length }})</h6>
    <div class="list-group">
      <a
        :href="issue.url"
        target="_blank"
        class="list-group-item"
        :class="setClass(issue)"
        v-for="issue in issues"
        :key="issue.id"
      >
        {{ issue.subject }} - {{ issue.id }}
        {{ issue.assigned_to === undefined ? " - Quem pode pegar?" : "" }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    issues: Array,
    status: String,
    assignedSelected: String,
  },
  methods: {
    setClass(issue) {
      // const { priority } = issue
      console.log(issue.assigned_to);
      if (issue.assigned_to === undefined) {
        return "bg-warning";
      }

      if (issue.priority === "Normal" || issue.priority === "Baixa") {
        return;
      }

      return "bg-danger";
    },
  },
};
</script>

<style>
</style>