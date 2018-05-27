<template>
    <div class="page-content container tile is-vertical article">
        <div class="tile">
            <router-link :to="{ name: 'HomePage' }"> Back to home page </router-link>
        </div>
        <div class="tile is-parent">
        </div>
    </div>
</template>

<script lang="ts">
import JobDetailPage from "./jobDetail.page.ts";
export default JobDetailPage;
</script>