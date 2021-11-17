<template>
  <div>
    <div class="container-fluid" v-if="issues.length === 0">
      <div class="row" style="margin-top: 100px">
        <div class="col">Carregando...</div>
      </div>
    </div>
    <div class="container-fluid" v-else>
      <div class="row mb-3 d-flex justify-content-end">
        <div class="col-md-4">
          <!-- <h2>Issues ({{issues.length}})</h2> -->
          <select
            class="form-select"
            style="font-size: 28px; cursor: pointer"
            @change="issuesFilter"
            v-model="assignedSelected"
            name="assignedSelected"
          >
            <option value="">Todos ({{ issues.length }})</option>
            <option :value="dev" v-for="(dev, index) in devs" :key="index">
              {{ dev }} ({{
                issues.filter((issue) => issue.assigned_to === dev).length
              }})
            </option>
          </select>
        </div>
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
  </div>
</template>

<script>
import { api } from "../services/api";
import IssuesColumn from "../components/IssuesColumn.vue";

export default {
  name: "Issues",
  components: {
    IssuesColumn,
  },
  data() {
    return {
      message: "test",
      issuesNew: [],
      issuesPending: [],
      issuesReopened: [],
      issuesInprogress: [],
      issuesResolved: [],
      issuesHomologation: [],
      issuesAssigned: [],
      assignedSelected: "",
      issues: [],
      devs: [
        "Augusto Alves",
        "Gabriel Viegas",
        "Maurício  da Silva Souza",
        "Randler Ferraz Almeida",
        "Wallace Souza",
      ],
    };
  },
  created() {
    document.title = "Issues - Redmine";
    this.loadIssues();
  },
  methods: {
    issuesFilter() {
      //   console.log("carregouu");

      //   console.log("change", this.assignedSelected);
      // console.log(this.assignedSelected)

      this.issuesAssigned =
        this.assignedSelected === ""
          ? this.issues
          : this.issues.filter(
              (issue) => issue.assigned_to === this.assignedSelected
            );

      this.issuesNew = this.issuesAssigned.filter(
        (issue) => issue.status === "Nova"
      );
      this.issuesPending = this.issuesAssigned.filter(
        (issue) => issue.status === "Pendente"
      );
      this.issuesReopened = this.issuesAssigned.filter(
        (issue) => issue.status === "Reaberta"
      );
      this.issuesInprogress = this.issuesAssigned.filter(
        (issue) => issue.status === "Em andamento"
      );
      this.issuesResolved = this.issuesAssigned.filter(
        (issue) => issue.status === "Resolvida"
      );
      this.issuesHomologation = this.issuesAssigned.filter(
        (issue) => issue.status === "Homologação"
      );

      // return 'test'
    },
    async loadIssues() {
      try {
        const { data } = await api.get("/issues");
        // console.log(data)
        this.issues = data;
        this.issuesFilter();
      } catch (error) {
        console.log({ error });
        const { message } = error;
        // console.log(err.message)
        if (message) {
          alert("Erro ao conectar na API de ISSUES");
          // window.location.reload()
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
