<template>
  <div id="app">
    <uiHeader v-if="$route.path != '/login'"></uiHeader>
    <div
      v-if="$route.path != '/login'"
      :class="['wrap', { 'menu-open': !$store.getters.getCollapse }]"
    >
      <uiMenu v-if="$route.path != '/login'"> </uiMenu>
      <router-view></router-view>
    </div>
    <router-view v-if="$route.path === '/login'"></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import uiHeader from "./components/header.vue";
import uiMenu from "./components/menu.vue";
@Component({
  components: {
    uiHeader,
    uiMenu
  }
})
export default class App extends Vue {}
</script>

<style lang="less"></style>
