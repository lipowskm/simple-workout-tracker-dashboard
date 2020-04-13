<template>
  <v-content v-if="isLoggedIn">
    <AppBar />
    <v-container fill-height>
      Welcome to dashboard
    </v-container>
  </v-content>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import { readIsLoggedIn } from '@/store/getters'
import AppBar from '@/components/AppBar.vue'
@Component({
  components: { AppBar }
})
export default class Dashboard extends Vue {
  get isLoggedIn() {
    return readIsLoggedIn(this.$store)
  }
}

</script>

<style scoped>

</style>
