<template>
  <div class="col-md">
    <h6 @click="copyIssues(issues)" title="Clique para Copiar">
      {{ status }} ({{ issues.length }})
    </h6>
    <!-- <div class="list-group">
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
    </div> -->
    <div class="list-group">
      <a
        :href="issue.url"
        target="_blank"
        class="list-group-item list-group-item-action"
        :class="setClass(issue)"
        aria-current="true"
        v-for="issue in issues"
        :key="issue.id"
      >
        <div class="d-flex w-100 justify-content-between">
          <h6 class="mb-1">{{ issue.project.name }}</h6>
          <small style="font-size: 11px">{{ issue.id }}</small>
        </div>
        <!-- <p class="mb-1">Some placeholder content in a paragraph.</p> -->
        <small>
          {{ issue.subject }}
          {{ issue.assigned_to === undefined ? " - Quem pode pegar?" : "" }}
        </small>
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
    copyIssues(issues) {
      let text = "";

      issues.map(
        (issue, index) =>
          (text += `${index + 1} - https://redmine.codificar.com.br/issues/${
            issue.id
          } - ${issue.subject} - ${issue.project.name}\n\n`)
      );
      console.log(text);
      //   document
      navigator.clipboard.writeText(text);
    },
    setClass(issue) {
      // const { priority } = issue
      //   console.log(issue.assigned_to);
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
h6 {
  cursor: pointer;
}
</style>