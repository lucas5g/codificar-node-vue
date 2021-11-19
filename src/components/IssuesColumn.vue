<template>
    <div class="col-md">
        <h6>{{status}} ({{ issues.length }})</h6>
        <div class="list-group">
          <a
            :href="issue.url"
            target="_blank"
            class="list-group-item"
            :class="issue.assigned_to === undefined && 'bg-warning'"
            v-for="issue in issues"
            :key="issue.id"
          >
            {{ issue.subject }} - {{ issue.id }} - {{issue.assigned_to === undefined && 'Quem pode pegar?'}}
          </a>
        </div>
      </div>
</template>

<script>
export default {
    props:['issues', 'status'],
    data(){
        return{
            // status: this.issues[0].status || 'teste',
        }
    },
    created(){
        // console.log(this.issues)
        // console.log(this.issues.length)
    }
}
</script>

<style>

</style>