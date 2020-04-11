<template>
  <v-content>
    <v-container fill-height>
      <v-btn @click="logOut">Logout</v-btn>
    </v-container>
  </v-content>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import { dispatchLogOut } from '@/store/actions'

@Component
export default class Dashboard extends Vue {
  logOut() {
    dispatchLogOut(this.$store)
  }
}

</script>

<style scoped>

</style>
