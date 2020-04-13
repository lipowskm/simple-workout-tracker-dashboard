<template>
  <v-app-bar
    app
    color="primary"
    dark
  >
    <div class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
        transition="scale-transition"
        width="40"
      />
      <v-toolbar-title class="text-uppercase">
        <span class="font-weight-light">Simple</span>
        <span class="font-weight-bold">Workout</span>
        <span class="font-italic">Tracker </span>
      </v-toolbar-title>
    </div>
    <v-spacer />
    <v-menu
      offset-y
      bottom
    >
      <template v-slot:activator="{ on }">
        <v-btn
          icon
          v-on="on"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="logOut">
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts">

import { dispatchLogOut } from '@/store/actions'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AppBar extends Vue {
  logOut() {
    dispatchLogOut(this.$store)
    this.$toast('Logged out successfully', { color: 'success', icon: 'mdi-check-circle' })
  }
}

</script>

<style scoped>

</style>
