<template>
  <div id="app">
    <v-app>
      <v-content v-if="isLoggedIn===null">
        <v-container fill-height>
          <v-layout
            align-center
            justify-center
          >
            <v-flex
              xs12
              sm8
              md4
              align-self-center
            >
              <div style="text-align: center">
                <div class="headline my-5">
                  Loading...
                </div>
                <v-progress-circular
                  size="100"
                  indeterminate
                  color="primary"
                />
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
      <v-scroll-x-transition>
        <router-view />
      </v-scroll-x-transition>
    </v-app>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { readIsLoggedIn } from '@/store/getters'
import { dispatchLogOut } from '@/store/actions'

export default Vue.extend({
  name: 'App',

  data: () => ({}),
  computed: {
    isLoggedIn() {
      return readIsLoggedIn(this.$store)
    }
  },
  methods: {
    logOut() {
      dispatchLogOut(this.$store)
    }
  }
})
</script>
