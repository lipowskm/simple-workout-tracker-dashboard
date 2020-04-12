<template>
  <v-content v-if="isLoggedIn">
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
        <v-toolbar-title class="title">
          Simple Workout Tracker
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
    <v-container fill-height>
      Welcome to dashboard
    </v-container>
  </v-content>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import { readIsLoggedIn } from '@/store/getters'
import { dispatchLogOut } from '@/store/actions'

@Component
export default class Dashboard extends Vue {
  get isLoggedIn() {
    return readIsLoggedIn(this.$store)
  }

  logOut() {
    dispatchLogOut(this.$store)
    this.$toast('Logged out successfully', { color: 'success' })
  }
}

</script>

<style scoped>

</style>
