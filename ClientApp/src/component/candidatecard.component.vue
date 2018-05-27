<template>
    <article class="card-full">
        <div class="card-header">
            <h3>{{model.name}}</h3>
        </div>
        <div class="card-tag">
            <div v-for="(skill,index) of model.skills" :key="`skill-${index}`">{{skill}}</div>
        </div>
        <div class="card-chart">
            <radial-progress-bar :diameter="100"
                                :completed-steps="percentage"
                                :total-steps="total">
            <p>{{ percentage }} % </p>
            </radial-progress-bar>            
        </div>   
    </article>
</template>

<script lang="ts">
import CandidateCardComponent from "./candidatecard.component.ts";
export default CandidateCardComponent;
</script>