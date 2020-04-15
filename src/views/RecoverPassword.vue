<template>
  <v-content v-if="$store.state.isLoggedIn===false">
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
          <ValidationObserver
            ref="observer"
            v-slot="{ invalid }"
          >
            <v-card class="elevation-12">
              <div>
                <router-link :to="{ name: 'login' }">
                  <v-btn
                    x-large
                    text
                    class="custom-button"
                  >
                    <v-icon left>
                      mdi-arrow-left
                    </v-icon>
                    Go back
                  </v-btn>
                </router-link>
              </div>
              <v-card-text>
                <v-card-title>
                  <div>
                    <h4 class="font-weight-light text-wrap">
                      Enter your user account's verified email address and we will send you a password reset link.
                    </h4>
                  </div>
                </v-card-title>
                <v-form @keyup.enter="submit">
                  <ValidationProvider
                    name="Email"
                    rules="required|email"
                    mode="aggressive"
                  >
                    <v-text-field
                      v-model="email"
                      slot-scope="{ errors, valid }"
                      :error-messages="errors"
                      :success="valid"
                      prepend-icon="mdi-email"
                      name="email"
                      label="Email address"
                      type="text"
                      @keyup.enter="submit"
                    />
                  </ValidationProvider>
                </v-form>
                <v-card-actions>
                  <v-btn
                    :disabled="invalid"
                    :loading="isLoading"
                    block
                    color="primary"
                    @click="submit"
                  >
                    Send password reset email
                  </v-btn>
                </v-card-actions>
              </v-card-text>
            </v-card>
          </ValidationObserver>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'

@Component({
  components: {
    ValidationObserver,
    ValidationProvider
  }
})
export default class RecoverPassword extends Vue {
  isLoading = false
  email: string = ''

  mounted() {
    extend('required', {
      ...required,
      message: 'Required'
    })

    extend('email', {
      ...email,
      message: 'Invalid email'
    })
  }
}
</script>

<style scoped>
  .v-card__text, .v-card__title {
    word-break: normal;
  }

  >>> .custom-button .v-btn__content {
    opacity: 0.75;
  }

  .custom-button:before {
    background-color: transparent;
  }

  >>> .custom-button:hover .v-btn__content {
    opacity: 1;
  }

  >>> .custom-button .v-ripple__animation{ display: none; }

</style>
