<template>
  <v-content>
    <v-container fill-height>
      <v-layout
        row
        wrap
        justify-center
      >
        <v-flex
          xs12
          sm8
          md4
          align-self-center
        >
          <div
            v-if="!isVerified"
            style="text-align: center"
          >
            <div class="headline my-5">
              Verifying email...
            </div>
            <v-progress-circular
              size="100"
              indeterminate
              color="primary"
            />
          </div>
          <v-card
            v-if="isVerified"
            class="elevation-12"
          >
            <v-card-text>
              <v-card-title>
                <div>
                  <h4 class="font-weight-light text-wrap">
                    Account verified successfully, you can now login.
                  </h4>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn
                  block
                  color="primary"
                  @click="onClick"
                >
                  Go to login page
                </v-btn>
              </v-card-actions>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { dispatchVerifyAccount } from '@/store/actions'
import { readIsLoggedIn } from '@/store/getters'

@Component
export default class VerifyAccount extends Vue {
  isVerified: boolean = false

  mounted() {
    this.checkToken()
  }

  onClick() {
    this.$router.push('/login')
  }

  async checkToken() {
    const token = (this.$router.currentRoute.query.token as string)
    console.log(token)
    if (!token) {
      if (readIsLoggedIn(this.$store)) await this.$router.push('/dashboard')
      else await this.$router.push('/login')
    } else {
      await dispatchVerifyAccount(this.$store, { token: token }).then(result => {
        if (result.success) {
          this.isVerified = true
          this.$toast(result.message, { color: 'success', icon: 'mdi-check-circle', timeout: 3000 })
        } else {
          this.$toast(result.message, { color: 'error', icon: 'mdi-alert', timeout: 3000 })
          if (readIsLoggedIn(this.$store)) this.$router.push('/dashboard')
          else this.$router.push('/login')
        }
      })
    }
  }
}
</script>

<style scoped>
  .v-card__text, .v-card__title {
    word-break: normal;
  }
</style>
