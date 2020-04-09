<template>
  <router-view></router-view>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import { Route } from 'vue-router'

@Component
export default class Start extends Vue {
  beforeRouteEnter(to: Route, from: Route, next: Function) {
    next(() => {
      if (to.path === '/' || (to.path).startsWith('/main')) {
        next('/login')
      } else {
        next()
      }
    })
  }

  beforeRouteUpdate(to: Route, from: Route, next: Function) {
    next(() => {
      if (to.path === '/' || (to.path).startsWith('/main')) {
        next('/login')
      } else {
        next()
      }
    })
  }
}

</script>

<style scoped>

</style>
