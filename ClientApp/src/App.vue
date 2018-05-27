<template>
    <div id="app">
        <header class="hero-head">
        </header>
        <section class="hero-body">
            <transition name="slide-fade">
                <router-view></router-view>
            </transition>
        </section>
    </div>
</template>

<script lang="ts">
import App from "./App.ts";
export default App;
</script>

<style lang="scss">
    @import './sass/base.scss'
</style>