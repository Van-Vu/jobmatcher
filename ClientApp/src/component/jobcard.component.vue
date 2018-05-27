<template>
    <article class="card-full">
        <router-link :to="{ name: 'jobDetail', params: { seoString: seoName, jobId: model.jobId }}">
            <div class="card-header">
                <h3>{{model.name}}</h3>
            </div>
            <div class="card-role">
                Company: {{model.company}}
            </div>
            <div class="card-tag">
                <div v-for="(skill,index) of model.skills" :key="`skill-${index}`">{{skill}}</div>
            </div>   
        </router-link>
    </article>
</template>

<script lang="ts">
import JobCardComponent from "./jobcard.component.ts";
export default JobCardComponent;
</script>