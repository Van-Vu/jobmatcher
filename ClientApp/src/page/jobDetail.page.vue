<template>
    <div class="page-content container tile is-vertical article">
        <div class="tile">
            <router-link :to="{ name: 'home' }"> Back to home page </router-link>
        </div>
        <div class="container">
            <h2>Candidates</h2>
            <ul>
                <li class="li-horizontal" v-for="candidate in model" :key="candidate.candidateId">
                    <candidatecard :model="candidate"></candidatecard>
                </li>
            </ul>            
        </div>
    </div>
</template>

<script lang="ts">
import JobDetailPage from "./jobDetail.page.ts";
export default JobDetailPage;
</script>