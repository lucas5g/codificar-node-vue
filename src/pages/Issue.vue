<template>
  <div>
    <div class="container-fluid" v-if="issues.length === 0">
      <div class="row" style="margin-top: 100px">
        <div class="col">Carregando...</div>
      </div>
    </div>
    <div
      class="container-fluid"
      v-else
      @click="
        {
          {
          }
        }
      "
    >
      <div class="row d-flex justify-content-end">
        <SelectFilter
          :options="projects"
          name="Projetos"
          :issues="issues"
          :issuesLength="issues.length"
          filterBy="project"
          v-model="projectSelected"
        />
        <SelectFilter
          :options="trackers"
          name="Tipos"
          :issues="issues"
          :issuesLength="issues.length"
          filterBy="tracker"
          v-model="trackerSelected"
        />
        <SelectFilter
          :options="assigneds"
          name="Responsáveis"
          :issues="issues"
          :issuesLength="issues.length"
          filterBy="assigned_to"
          v-model="assignedSelected"
        />
      </div>
      <div class="row">
        <IssuesColumn v-bind:issues="issuesNew" status="Novas" />
        <IssuesColumn v-bind:issues="issuesPending" status="Pendente" />
        <IssuesColumn v-bind:issues="issuesReopened" status="Reaberta" />
        <IssuesColumn v-bind:issues="issuesInprogress" status="Em andamento" />
        <IssuesColumn v-bind:issues="issuesResolved" status="Resolvida" />
        <IssuesColumn v-bind:issues="issuesHomologation" status="Homologação" />
      </div>
    </div>
    <!-- end Container-fluid -->
  </div>
</template>

<script>
import { api } from "../services/api";
import IssuesColumn from "../components/IssuesColumn.vue";
import SelectFilter from "../components/SelectFilter.vue";

export default {
  name: "Issues",
  components: {
    IssuesColumn,
    SelectFilter,
  },
  data() {
    return {
      assigneds: [],
      issuesNew: [],
      issuesPending: [],
      issuesReopened: [],
      issuesInprogress: [],
      issuesResolved: [],
      issuesHomologation: [],
      issuesFilter: [],
      assignedSelected: "",
      issues: [],
      trackers: [],
      trackerSelected: "",
      projects: [],
      projectSelected: "",
    };
  },
  created() {
    document.title = "Issues - Redmine";
    // this.getAll()
    this.getIssues();
    // this.getAssigneds();
    // this.getTrackers();

    // this.issuesFilter();
  },
  mounted() {
    //   this.filter()
  },
  methods: {
    // filter(filterByMe, option) {
    filter() {
      //   console.log(this.trackerSelected);

      // this.issuesFilter = filterByMe === undefined ? this.issues : this.issues.filter( issue => issue[filterByMe] && issue[filterByMe].name === filterByMe)
      //   this.issuesFilter = this.issues.filter(
      //     (issue) => issue[filterByMe] && issue[filterByMe].name === option
      //   );

      //   console.log({ filterByMe });
      //   console.log(this.issues[0][filterByMe]);
      //   console.log("filter", this.issuesFilter);
      this.issuesFilter =
        this.assignedSelected === ""
          ? this.issues
          : this.issues.filter(
              (issue) =>
                issue.assigned_to &&
                issue.assigned_to.name === this.assignedSelected
            );

      this.issuesFilter =
        this.trackerSelected === ""
          ? this.issuesFilter
          : this.issuesFilter.filter(
              (issue) => issue.tracker.name === this.trackerSelected
            );

      this.issuesFilter =
        this.projectSelected === ""
          ? this.issuesFilter
          : this.issuesFilter.filter(
              (issue) => issue.project.name === this.projectSelected
            );

      this.issuesNew = this.issuesFilter.filter(
        (issue) => issue.status === "Nova"
      );
      this.issuesPending = this.issuesFilter.filter(
        (issue) => issue.status === "Pendente"
      );
      this.issuesReopened = this.issuesFilter.filter(
        (issue) => issue.status === "Reaberta"
      );
      this.issuesInprogress = this.issuesFilter.filter(
        (issue) => issue.status === "Em andamento"
      );
      this.issuesResolved = this.issuesFilter.filter(
        (issue) => issue.status === "Resolvida"
      );
      this.issuesHomologation = this.issuesFilter.filter(
        (issue) => issue.status === "Homologação"
      );
    },
    async getIssues() {
      try {
        const { data } = await api.get("/issues");
        // console.log(data)
        this.issues = data.issues;
        this.assigneds = data.assigneds;
        this.trackers = data.trackers;
        this.projects = data.projects;
        this.filter();
      } catch (error) {
        console.log({ error });
        const { message } = error;
        if (message) {
          //   alert("Erro ao conectar na API de ISSUES");
        }
      }
    },
  },
};
</script>

<style scoped>
div.container-fluid {
  margin-top: 100px;
}
</style>
