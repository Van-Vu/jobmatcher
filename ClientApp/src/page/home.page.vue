<template>
    <div class="container">
        <h2>Job List</h2>
        <ul>
            <li class="li-horizontal" v-for="job in jobList" :key="job.JobId">
                <jobcard :model="job"></jobcard>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import HomePage from "./home.page.ts";
export default HomePage;
</script>