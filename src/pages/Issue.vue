<template>
  <div>
    <div class="container-fluid" v-if="issues.length === 0">
      <div class="row" style="margin-top: 100px">
        <div class="col">Carregando...</div>
      </div>
    </div>
    <div class="container-fluid" v-else @click="{{}}">
      <!-- <SelectFilter :options="trackers" name="Tipos" /> -->
      <SelectFilter
        :options="assigneds"
        name="Responsáveis"
        :filter="issuesFilter"
        :issues="issues"
        filterBy="assigned_to"
        v-model="assignedSelected"


      />

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
      issuesNew: [],
      issuesPending: [],
      issuesReopened: [],
      issuesInprogress: [],
      issuesResolved: [],
      issuesHomologation: [],
      issuesAssigned: [],
      assignedSelected: "",
      assigneds: [],
      issues: [],
      trackers: [],
    };
  },
  created() {
    document.title = "Issues - Redmine";
    this.load();
    // this.issuesFilter();
  },
  methods: {
    // comboFunction() {
    //   this.load();
    //   this.issuesFilter();
    // },
    issuesFilter() {

        console.log(this.assignedSelected)
        // console.log(this.issuesAssigned)
        
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

      /**/
    },
    async load() {
      console.log("carregou");
      try {
        const { data } = await api.get("/issues");
        // console.log(data)
        this.issues = data.issues;
        (this.assigneds = data.assigneds), (this.trackers = data.trackers);

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
