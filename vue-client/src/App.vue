<template>
  <div id="app">
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<script>
import AppHeader from './components/header/header';

export default {
  name: 'app',
  components: {
    'app-header': AppHeader
  }
}
</script>

<style>
</style>
