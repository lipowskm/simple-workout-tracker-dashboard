<template>
  <div id="app">
    <v-app>
      <v-content v-if="isLoggedIn===null">
        <v-container fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4 align-self-center>
              <div style="text-align: center">
                <div class="headline my-5">Loading...</div>
                <v-progress-circular size="100" indeterminate color="primary"></v-progress-circular>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
      <v-app-bar v-if="isLoggedIn" app
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
          <v-toolbar-title class="title">Simple Workout Tracker</v-toolbar-title>
        </div>
      </v-app-bar>
      <router-view></router-view>
    </v-app>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { readIsLoggedIn } from '@/store/getters'

export default Vue.extend({
  name: 'App',

  data: () => ({}),
  computed: {
    isLoggedIn() {
      return readIsLoggedIn(this.$store)
    }
  }

})
</script>
