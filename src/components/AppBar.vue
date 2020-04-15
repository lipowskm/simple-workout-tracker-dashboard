<template>
  <v-app-bar
    app
    color="primary"
    dark
  >
    <div class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
        class="mr-2"
        contain
        :src="appLogo"
        transition="scale-transition"
        width="50"
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
      transition="slide-y-transition"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          outlined
          class="username-button"
          v-on="on"
        >
          {{ username }}
          <v-icon right>
            mdi-chevron-down
          </v-icon>
        </v-btn>
      </template>
      <v-list dense>
        <v-list-item-group>
          <v-list-item
            v-for="(item, i) in menuItems"
            :key="i"
            @click="item.action"
          >
            <v-icon
              left
              v-text="item.icon"
            />
            <v-list-item-content>
              <v-list-item-title v-text="item.text" />
            </v-list-item-content>
          </v-list-item>
          <v-divider />
          <v-list-item @click="logOut">
            <v-icon left>
              mdi-logout
            </v-icon>
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts">

import { dispatchLogOut } from '@/store/actions'
import { Component, Vue } from 'vue-property-decorator'
import { readUserProfile } from '@/store/getters'

@Component
export default class AppBar extends Vue {
  appLogo = require('@/assets/logo.png')
  menuItems = [
    {
      icon: 'mdi-account',
      text: 'Your profile',
      action: null
    },
    {
      icon: 'mdi-settings',
      text: 'Settings',
      action: null
    }
  ]

  logOut() {
    dispatchLogOut(this.$store)
    this.$toast('Logged out successfully', { color: 'success', icon: 'mdi-check-circle' })
  }

  get username() {
    return readUserProfile(this.$store)?.username
  }
}

</script>

<style scoped>
  .username-button {
    text-transform: none !important;
  }
</style>
