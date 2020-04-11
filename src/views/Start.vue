<template>
  <router-view></router-view>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import { Route } from 'vue-router'
import { dispatchCheckLoggedIn } from '@/store/actions'
import { readIsLoggedIn } from '@/store/getters'
import store from '@/store'

const startRouteGuard = async (to: Route, from: Route, next: Function) => {
  await dispatchCheckLoggedIn(store)
  if (readIsLoggedIn(store)) {
    if (to.path === '/login' || to.path === '/') {
      next('/dashboard')
    } else {
      next()
    }
  } else if (readIsLoggedIn(store) === false) {
    if (to.path === '/' || (to.path as string).startsWith('/dashboard')) {
      next('/login')
    } else {
      next()
    }
  }
}

@Component
export default class Start extends Vue {
  beforeRouteEnter(to: Route, from: Route, next: Function) {
    next(() => {
      startRouteGuard(to, from, next)
    })
  }

  beforeRouteUpdate(to: Route, from: Route, next: Function) {
    next(() => {
      startRouteGuard(to, from, next)
    })
  }
}

</script>

<style scoped>

</style>
